import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Package, Truck, MapPin } from 'lucide-react';
import { api } from '../../lib/api';

interface OrderTrackingProps {
  orderId: string;
  currentStatus: string;
}

const orderStatuses = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { id: 'preparing', label: 'Preparing', icon: Package },
  { id: 'ready', label: 'Ready for Pickup', icon: Clock },
  { id: 'completed', label: 'Completed', icon: CheckCircle }
];

const deliveryStatuses = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { id: 'preparing', label: 'Preparing', icon: Package },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: MapPin }
];

export default function OrderTracking({ orderId, currentStatus }: OrderTrackingProps) {
  const [status, setStatus] = useState(currentStatus);
  const [estimatedTime, setEstimatedTime] = useState('30-45 minutes');

  useEffect(() => {
    // Subscribe to real-time order updates
    const subscription = api.subscribeToOrderUpdates(orderId, (newStatus) => {
      setStatus(newStatus);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId]);

  const statuses = status === 'delivered' ? deliveryStatuses : orderStatuses;
  const currentIndex = statuses.findIndex(s => s.id === status);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Order Tracking
      </h3>

      {/* Estimated Time */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <div>
            <p className="font-medium text-primary-800 dark:text-primary-200">
              Estimated Time
            </p>
            <p className="text-sm text-primary-600 dark:text-primary-300">
              {estimatedTime}
            </p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="space-y-4">
        {statuses.map((statusItem, index) => {
          const Icon = statusItem.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={statusItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                isCompleted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  isCompleted 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {statusItem.label}
                </p>
                {isCurrent && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    In progress...
                  </p>
                )}
              </div>

              {index < statuses.length - 1 && (
                <div className={`absolute left-5 top-10 w-0.5 h-8 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Live Updates */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Live Updates:</strong> You'll receive real-time notifications as your order progresses.
        </p>
      </div>
    </div>
  );
}