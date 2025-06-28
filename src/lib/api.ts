import { supabase } from './supabase';

export interface DeliveryCalculation {
  canDeliver: boolean;
  deliveryFee: number;
  estimatedTime: string;
  freeDeliveryThreshold: number;
  message: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
  message: string;
}

export const api = {
  // Calculate delivery fee and availability
  calculateDeliveryFee: async (address: string, city: string, zipCode: string, orderTotal: number): Promise<DeliveryCalculation> => {
    const { data, error } = await supabase.functions.invoke('calculate-delivery-fee', {
      body: { address, city, zipCode, orderTotal }
    });

    if (error) throw error;
    return data;
  },

  // Process payment
  processPayment: async (amount: number, currency: string, orderId: string, customerEmail: string, paymentMethodId: string): Promise<PaymentResult> => {
    const { data, error } = await supabase.functions.invoke('process-payment', {
      body: { amount, currency, orderId, customerEmail, paymentMethodId }
    });

    if (error) throw error;
    return data;
  },

  // Send order confirmation email
  sendOrderConfirmation: async (orderData: any): Promise<{ success: boolean; message: string }> => {
    const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
      body: orderData
    });

    if (error) throw error;
    return data;
  },

  // Get real-time order status
  subscribeToOrderUpdates: (orderId: string, callback: (status: string) => void) => {
    return supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      }, (payload) => {
        callback(payload.new.status);
      })
      .subscribe();
  },

  // Analytics and reporting
  getOrderAnalytics: async (startDate: string, endDate: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        total,
        status,
        order_type,
        created_at,
        order_items (
          quantity,
          total_price,
          products (name, category)
        )
      `)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;
    return data;
  }
};