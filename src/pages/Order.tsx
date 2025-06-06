import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import OrderForm from '../components/order/OrderForm';
import CakeBuilder from '../components/order/CakeBuilder';
import { formatPrice } from '../lib/utils';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: string[];
}

const orderTypes = [
  {
    id: 'pickup',
    name: 'Pickup',
    description: 'Pick up your order at our bakery',
    icon: MapPin,
  },
  {
    id: 'delivery',
    name: 'Delivery',
    description: 'We\'ll deliver to your location',
    icon: ShoppingCart,
  },
];

export default function Order() {
  const [orderType, setOrderType] = useState('pickup');
  const [currentStep, setCurrentStep] = useState(1);
  const [showCakeBuilder, setShowCakeBuilder] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Artisan Sourdough Loaf',
      price: 8.50,
      quantity: 2,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: '2',
      name: 'Pain au Chocolat',
      price: 3.75,
      quantity: 4,
      image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=200',
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const deliveryFee = orderType === 'delivery' ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;

  const steps = [
    { number: 1, title: 'Review Cart', description: 'Check your items' },
    { number: 2, title: 'Order Details', description: 'Pickup/delivery info' },
    { number: 3, title: 'Payment', description: 'Complete your order' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold text-center mb-8"
          >
            Complete Your Order
          </motion.h1>

          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        currentStep >= step.number
                          ? 'bg-accent-500 text-white'
                          : 'bg-primary-600 text-primary-200'
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className="text-sm font-medium">{step.title}</div>
                      <div className="text-xs text-primary-200">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-px bg-primary-600 ml-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Your Cart
                      </h2>
                      <button
                        onClick={() => setShowCakeBuilder(true)}
                        className="btn-secondary text-sm"
                      >
                        + Custom Cake
                      </button>
                    </div>

                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {cartItems.length === 0 && (
                      <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Your cart is empty
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Add some delicious items to get started
                        </p>
                        <button className="btn-primary">
                          Browse Menu
                        </button>
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="btn-primary"
                      >
                        Continue to Order Details
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <OrderForm
                    orderType={orderType}
                    setOrderType={setOrderType}
                    onNext={() => setCurrentStep(3)}
                    onBack={() => setCurrentStep(1)}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Payment Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="btn-outline flex-1"
                      >
                        Back
                      </button>
                      <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Complete Order
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Ready in 30-45 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Order by 6 PM for same-day pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cake Builder Modal */}
      {showCakeBuilder && (
        <CakeBuilder onClose={() => setShowCakeBuilder(false)} />
      )}
    </div>
  );
}