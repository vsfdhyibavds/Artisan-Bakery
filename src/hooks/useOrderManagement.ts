import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { db, supabase } from '../lib/supabase';
import { api } from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export const useOrderManagement = () => {
  const queryClient = useQueryClient();
  const { user, customer } = useAuthStore();
  const { items: cartItems, clearCart, getSubtotal, getTax } = useCartStore();

  // Create complete order with payment processing
  const createOrder = useMutation({
    mutationFn: async (orderData: {
      orderType: string;
      pickupDate: string;
      pickupTime: string;
      specialInstructions?: string;
      deliveryAddress?: {
        address: string;
        city: string;
        zipCode: string;
      };
      paymentMethodId: string;
    }) => {
      if (!user || !customer) throw new Error('Must be logged in');
      if (cartItems.length === 0) throw new Error('Cart is empty');

      // Calculate totals
      const subtotal = getSubtotal();
      const tax = getTax();
      let deliveryFee = 0;

      // Calculate delivery fee if needed
      if (orderData.orderType === 'delivery' && orderData.deliveryAddress) {
        const deliveryCalc = await api.calculateDeliveryFee(
          orderData.deliveryAddress.address,
          orderData.deliveryAddress.city,
          orderData.deliveryAddress.zipCode,
          subtotal
        );

        if (!deliveryCalc.canDeliver) {
          throw new Error('Delivery not available to this area');
        }

        deliveryFee = deliveryCalc.deliveryFee;
      }

      const total = subtotal + tax + deliveryFee;

      // Create order in database
      const { data: order, error: orderError } = await db.createOrder({
        customer_id: user.id,
        order_type: orderData.orderType,
        status: 'pending',
        pickup_date: orderData.pickupDate,
        pickup_time: orderData.pickupTime,
        special_instructions: orderData.specialInstructions,
        subtotal,
        tax,
        delivery_fee: deliveryFee,
        total,
        payment_status: 'pending'
      });

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        customizations: item.customizations
      }));

      const { error: itemsError } = await db.createOrderItems(orderItems);
      if (itemsError) throw itemsError;

      // Process payment
      const paymentResult = await api.processPayment(
        total,
        'usd',
        order.id,
        customer.email,
        orderData.paymentMethodId
      );

      if (!paymentResult.success) {
        // Update order status to failed
        await db.updateOrder(order.id, {
          payment_status: 'failed',
          status: 'cancelled'
        });
        throw new Error(paymentResult.error || 'Payment failed');
      }

      // Update order status to paid
      await db.updateOrder(order.id, {
        payment_status: 'paid',
        status: 'confirmed'
      });

      // Send confirmation email
      await api.sendOrderConfirmation({
        orderId: order.id,
        customerEmail: customer.email,
        customerName: `${customer.first_name} ${customer.last_name}`,
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        pickupDate: orderData.pickupDate,
        pickupTime: orderData.pickupTime,
        orderType: orderData.orderType
      });

      return order;
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      clearCart();
      toast.success(`Order #${order.id.slice(0, 8)} placed successfully!`);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to place order');
    }
  });

  // Get user orders with real-time updates
  const userOrders = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
    refetchInterval: 30000 // Refetch every 30 seconds for status updates
  });

  // Cancel order
  const cancelOrder = useMutation({
    mutationFn: async (orderId: string) => {
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('customer_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      toast.success('Order cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel order');
    }
  });

  return {
    createOrder,
    userOrders,
    cancelOrder,
    isCreatingOrder: createOrder.isPending
  };
};