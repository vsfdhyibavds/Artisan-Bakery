/**
 * Stripe Payment Integration
 * Handles payment processing for orders
 * Optional: @stripe/stripe-js is not required - graceful fallback to mock payments
 */

let stripePromise: Promise<any> | null = null;

export const getStripe = async () => {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn('Stripe not configured. Using mock payment processing.');
    return null;
  }

  if (!stripePromise) {
    try {
      const { loadStripe } = await import('@stripe/stripe-js');
      stripePromise = loadStripe(publishableKey);
    } catch (error) {
      console.warn('Failed to load Stripe:', error);
      return null;
    }
  }

  return stripePromise;
};

export interface PaymentIntentResponse {
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}

/**
 * Create payment intent on backend
 * This calls your backend API to create a payment intent
 */
export const createPaymentIntent = async (amount: number, email: string, orderId: string): Promise<PaymentIntentResponse> => {
  try {
    // In development, return mock response
    if (import.meta.env.MODE === 'development') {
      return {
        clientSecret: `pi_test_${orderId}_secret_${Date.now()}`,
        amount,
        currency: 'usd'
      };
    }

    // In production, call your backend API
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, email, orderId })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create payment intent';
    console.error('Create payment intent error:', errorMsg);
    throw new Error(errorMsg);
  }
};

/**
 * Process payment with Stripe
 */
export const processPayment = async (
  stripe: any,
  elements: any,
  clientSecret: string,
  email: string
): Promise<PaymentResult> => {
  try {
    if (!stripe || !elements) {
      throw new Error('Stripe not initialized');
    }

    const cardElement = elements.getElement('card');
    if (!cardElement) {
      throw new Error('Card element not found');
    }

    // Confirm payment with card element
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email
        }
      }
    });

    if (result.error) {
      return {
        success: false,
        error: result.error.message
      };
    }

    if (result.paymentIntent?.status === 'succeeded') {
      return {
        success: true,
        paymentIntentId: result.paymentIntent.id
      };
    }

    return {
      success: false,
      error: 'Payment processing failed'
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Payment processing error';
    return {
      success: false,
      error: errorMsg
    };
  }
};

/**
 * Format amount for Stripe (cents)
 */
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

/**
 * Format amount for display (dollars)
 */
export const formatAmountForDisplay = (amount: number): string => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return numberFormat.format(amount);
};
