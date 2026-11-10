import { supabase } from './supabase';
import { captureException } from './sentry';

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
  calculateDeliveryFee: async (address: string, city: string, zipCode: string, orderTotal: number): Promise<DeliveryCalculation> => {
    try {
      const { data, error } = await supabase.functions.invoke('calculate-delivery-fee', {
        body: { address, city, zipCode, orderTotal },
      });

      if (error) throw error;

      return data as DeliveryCalculation;
    } catch (error) {
      captureException(error, { endpoint: 'calculateDeliveryFee', address, city, zipCode });
      throw error;
    }
  },

  processPayment: async (amount: number, currency: string, orderId: string, customerEmail: string, paymentMethodId: string): Promise<PaymentResult> => {
    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: { amount, currency, orderId, customerEmail, paymentMethodId },
      });

      if (error) throw error;

      return data as PaymentResult;
    } catch (error) {
      captureException(error, { endpoint: 'processPayment', orderId, amount });
      throw error;
    }
  },

  sendOrderConfirmation: async (orderData: {
    orderId: string;
    customerEmail: string;
    customerName: string;
    orderItems: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    pickupDate: string;
    pickupTime: string;
    orderType: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
        body: orderData,
      });

      if (error) throw error;

      return { success: data.success, message: data.message || 'Order confirmation sent' };
    } catch (error) {
      captureException(error, { endpoint: 'sendOrderConfirmation', orderId: orderData.orderId });
      return { success: false, message: 'Failed to send order confirmation' };
    }
  },

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
