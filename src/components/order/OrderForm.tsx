import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Clock, Calendar, Truck } from 'lucide-react';

interface OrderFormProps {
  orderType: string;
  setOrderType: (type: string) => void;
  onNext: () => void;
  onBack: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zipCode?: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
}

const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM'
];

export default function OrderForm({ orderType, setOrderType, onNext, onBack }: OrderFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Order form data:', data);
    onNext();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Order Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Order Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Order Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                orderType === 'pickup'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Pickup</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Pick up at our bakery
                  </div>
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                orderType === 'delivery'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Delivery</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Delivered to your location (+$5.99)
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name *
              </label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        {orderType === 'delivery' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Delivery Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Street Address *
                </label>
                <input
                  {...register('address', { required: orderType === 'delivery' ? 'Address is required' : false })}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    {...register('city', { required: orderType === 'delivery' ? 'City is required' : false })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    {...register('zipCode', { required: orderType === 'delivery' ? 'ZIP code is required' : false })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pickup/Delivery Time */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {orderType === 'pickup' ? 'Pickup' : 'Delivery'} Time
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                {...register('pickupDate', { required: 'Date is required' })}
                type="date"
                min={minDate}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time *
              </label>
              <select
                {...register('pickupTime', { required: 'Time is required' })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.pickupTime && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupTime.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            {...register('specialInstructions')}
            rows={3}
            placeholder="Any special requests or instructions..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="btn-outline flex-1"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </motion.div>
  );
}