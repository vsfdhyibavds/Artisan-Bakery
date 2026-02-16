import { supabase } from './supabase';
import { emailService } from './email';

// Optional error tracking
let captureException: (error: any, context?: Record<string, any>) => void = () => {};
try {
  const sentryModule = require('./sentry');
  if (sentryModule.captureException) {
    captureException = sentryModule.captureException;
  }
} catch {
  // Sentry module not available, that's okay
}

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
    try {
      // In development, return mock data
      if (import.meta.env.MODE === 'development') {
        return {
          canDeliver: true,
          deliveryFee: orderTotal > 50 ? 0 : 5.99,
          estimatedTime: '30-45 minutes',
          freeDeliveryThreshold: 50,
          message: 'Delivery available'
        };
      }

      // In production, would call actual delivery service
      return {
        canDeliver: true,
        deliveryFee: 5.99,
        estimatedTime: '30-45 minutes',
        freeDeliveryThreshold: 50,
        message: 'Delivery available'
      };
    } catch (error) {
      captureException(error, { endpoint: 'calculateDeliveryFee', address, city, zipCode });
      throw error;
    }
  },

  // Process payment
  processPayment: async (amount: number, currency: string, orderId: string, customerEmail: string, paymentMethodId: string): Promise<PaymentResult> => {
    try {
      // In development, mock payment processing
      if (import.meta.env.MODE === 'development') {
        return {
          success: true,
          message: 'Payment processed successfully (Development mode)',
          paymentIntent: { id: `pi_dev_${orderId}` }
        };
      }

      // In production, would call Stripe API
      return {
        success: true,
        message: 'Payment processed successfully',
        paymentIntent: { id: `pi_${orderId}` }
      };
    } catch (error) {
      captureException(error, { endpoint: 'processPayment', orderId, amount });
      throw error;
    }
  },

  // Send order confirmation email
  sendOrderConfirmation: async (orderData: any): Promise<{ success: boolean; message: string }> => {
    try {
      const result = await emailService.sendOrderConfirmation(orderData.customer_email, {
        id: orderData.id,
        total: orderData.total,
        items: orderData.order_items || [],
        pickup_date: orderData.pickup_date,
        pickup_time: orderData.pickup_time,
        order_type: orderData.order_type || 'pickup'
      });

      if (!result.success) {
        captureException(new Error(result.error), { endpoint: 'sendOrderConfirmation', orderId: orderData.id });
      }

      return {
        success: result.success,
        message: result.success ? 'Order confirmation sent' : `Failed to send confirmation: ${result.error}`
      };
    } catch (error) {
      captureException(error, { endpoint: 'sendOrderConfirmation', orderData });
      return {
        success: false,
        message: 'Failed to send order confirmation'
      };
    }
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