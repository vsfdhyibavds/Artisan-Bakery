import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const hours = [
  { day: 'Monday', hours: '7:00 AM - 7:00 PM' },
  { day: 'Tuesday', hours: '7:00 AM - 7:00 PM' },
  { day: 'Wednesday', hours: '7:00 AM - 7:00 PM' },
  { day: 'Thursday', hours: '7:00 AM - 7:00 PM' },
  { day: 'Friday', hours: '7:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '8:00 AM - 8:00 PM' },
  { day: 'Sunday', hours: '8:00 AM - 6:00 PM' }
];

export default function LocationHours() {
  return (
    <section className="py-16 bg-primary-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Visit Our Bakery
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Located in the heart of downtown, our bakery has been serving the community 
                with fresh, artisanal baked goods since 1985.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-600 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Baker Street<br />
                    Downtown District<br />
                    City, State 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-600 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">(555) 123-BAKE</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-600 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">hello@artisanbakery.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent-500 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Store Hours
              </h3>
            </div>

            <div className="space-y-4">
              {hours.map((schedule, index) => {
                const isToday = new Date().getDay() === (index + 1) % 7;
                return (
                  <div
                    key={schedule.day}
                    className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
                      isToday 
                        ? 'bg-accent-100 dark:bg-accent-900/20 border-l-4 border-accent-500' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className={`font-medium ${
                      isToday 
                        ? 'text-accent-700 dark:text-accent-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {schedule.day}
                    </span>
                    <span className={`${
                      isToday 
                        ? 'text-accent-600 dark:text-accent-400 font-semibold' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Fresh Daily:</strong> All our breads and pastries are baked fresh every morning. 
                Come early for the best selection!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}