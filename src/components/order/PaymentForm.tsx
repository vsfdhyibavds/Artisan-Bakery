import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useOrderManagement } from '../../hooks/useOrderManagement';
import { formatPrice } from '../../lib/utils';

interface PaymentFormProps {
  orderData: {
    orderType: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions?: string;
    deliveryAddress?: {
      address: string;
      city: string;
      zipCode: string;
    };
  };
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  billingCity: string;
  billingZip: string;
}

export default function PaymentForm({ orderData, total, onSuccess, onBack }: PaymentFormProps) {
  const [processing, setProcessing] = useState(false);
  const { createOrder } = useOrderManagement();
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>();

  const onSubmit = async (data: PaymentFormData) => {
    setProcessing(true);
    
    try {
      // In a real implementation, you would tokenize the card with Stripe
      // and get a payment method ID. For demo purposes, we'll use a mock ID.
      const mockPaymentMethodId = `pm_${Math.random().toString(36).substr(2, 9)}`;
      
      await createOrder.mutateAsync({
        ...orderData,
        paymentMethodId: mockPaymentMethodId
      });
      
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
          <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Secure Payment
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Summary</h3>
        <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Card Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Number *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('cardNumber', { 
                    required: 'Card number is required',
                    pattern: {
                      value: /^[0-9\s]{13,19}$/,
                      message: 'Invalid card number'
                    }
                  })}
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiry Date *
                </label>
                <input
                  {...register('expiryDate', { 
                    required: 'Expiry date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: 'Format: MM/YY'
                    }
                  })}
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV *
                </label>
                <input
                  {...register('cvv', { 
                    required: 'CVV is required',
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: 'Invalid CVV'
                    }
                  })}
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cardholder Name *
              </label>
              <input
                {...register('cardholderName', { required: 'Cardholder name is required' })}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm mt-1">{errors.cardholderName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Billing Address
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <input
                {...register('billingAddress', { required: 'Billing address is required' })}
                type="text"
                placeholder="123 Main Street"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.billingAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.billingAddress.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  {...register('billingCity', { required: 'City is required' })}
                  type="text"
                  placeholder="New York"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.billingCity && (
                  <p className="text-red-500 text-sm mt-1">{errors.billingCity.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ZIP Code *
                </label>
                <input
                  {...register('billingZip', { required: 'ZIP code is required' })}
                  type="text"
                  placeholder="10001"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.billingZip && (
                  <p className="text-red-500 text-sm mt-1">{errors.billingZip.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Secure Payment Processing
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Your payment is processed securely using industry-standard encryption. 
                We never store your card information.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={processing}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Complete Order
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}