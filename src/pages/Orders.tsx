import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Truck, MapPin } from 'lucide-react';
import { useUserOrders } from '../hooks/useOrders';
import { useAuthStore } from '../stores/authStore';
import { formatPrice, formatDate } from '../lib/utils';

export default function Orders() {
  const { user } = useAuthStore();
  const { data: orders = [], isLoading, error } = useUserOrders();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be signed in to view your orders.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'preparing': return Package;
      case 'ready': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      case 'ready': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold text-center"
          >
            My Orders
          </motion.h1>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <button className="btn-primary">
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center gap-4 mb-4 lg:mb-0">
                        <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                          <StatusIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(order.total)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {order.order_type === 'pickup' ? 'Pickup' : 'Delivery'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Order Items
                        </h4>
                        <div className="space-y-2">
                          {order.order_items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-300">
                                {item.quantity}x {item.products?.name || 'Product'}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formatPrice(item.total_price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          {order.order_type === 'pickup' ? 'Pickup' : 'Delivery'} Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {order.pickup_date} at {order.pickup_time}
                            </span>
                          </div>
                          {order.order_type === 'delivery' && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-300">
                                Delivery Address
                              </span>
                            </div>
                          )}
                          {order.special_instructions && (
                            <div className="mt-2">
                              <p className="text-gray-600 dark:text-gray-300">
                                <strong>Instructions:</strong> {order.special_instructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="btn-outline text-sm">
                        View Details
                      </button>
                      {order.status === 'pending' && (
                        <button className="btn-secondary text-sm">
                          Cancel Order
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <button className="btn-primary text-sm">
                          Reorder
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}