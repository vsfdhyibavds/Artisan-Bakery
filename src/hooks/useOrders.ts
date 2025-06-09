import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import toast from 'react-hot-toast';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { clearCart } = useCartStore();

  return useMutation({
    mutationFn: async (orderData: any) => {
      if (!user) throw new Error('Must be logged in to place order');

      // Create the order
      const { data: order, error: orderError } = await db.createOrder({
        ...orderData,
        customer_id: user.id,
      });

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        customizations: item.customizations,
      }));

      const { error: itemsError } = await db.createOrderItems(orderItems);
      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      clearCart();
      toast.success('Order placed successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to place order');
    },
  });
};

export const useUserOrders = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await db.getUserOrders(user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
};