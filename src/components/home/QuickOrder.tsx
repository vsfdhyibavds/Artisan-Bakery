import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, Star, Zap } from 'lucide-react';

const quickOrderItems = [
  {
    id: 'morning-box',
    name: 'Morning Box',
    description: '4 croissants + 2 muffins + coffee',
    price: 18.99,
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=400',
    icon: Clock,
    popular: true
  },
  {
    id: 'family-bread',
    name: 'Family Bread Bundle',
    description: '2 sourdough + 1 whole wheat + baguette',
    price: 24.50,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: ShoppingBag,
    popular: false
  },
  {
    id: 'sweet-treats',
    name: 'Sweet Treats Box',
    description: '6 cookies + 2 danish + 1 cake slice',
    price: 16.75,
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Star,
    popular: true
  },
  {
    id: 'party-platter',
    name: 'Party Platter',
    description: 'Assorted pastries for 8-10 people',
    price: 45.00,
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Zap,
    popular: false
  }
];

export default function QuickOrder() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4"
          >
            Quick Order
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Popular combinations ready to order with one click
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickOrderItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                {item.popular && (
                  <div className="absolute top-3 right-3 z-10 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}

                <div className="relative h-32 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      ${item.price.toFixed(2)}
                    </span>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            View Full Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}