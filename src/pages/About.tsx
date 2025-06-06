import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Heart, Clock, Leaf, Star } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '39', icon: Clock },
  { label: 'Happy Customers', value: '50K+', icon: Heart },
  { label: 'Awards Won', value: '15', icon: Award },
  { label: 'Daily Fresh Items', value: '200+', icon: Star },
];

const team = [
  {
    name: 'Marie Dubois',
    role: 'Head Baker & Founder',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'With over 30 years of experience, Marie brings authentic French baking techniques to every creation.',
  },
  {
    name: 'James Wilson',
    role: 'Pastry Chef',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'James specializes in delicate pastries and has trained in the finest patisseries of Paris.',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Cake Designer',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Sofia creates stunning custom cakes that are as beautiful as they are delicious.',
  },
  {
    name: 'David Chen',
    role: 'Bread Specialist',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'David is our sourdough expert, maintaining our century-old starter with dedication.',
  },
];

const values = [
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description: 'We source ingredients locally and use eco-friendly packaging to minimize our environmental impact.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'Supporting local farmers and giving back to our community through various charitable initiatives.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'Every product meets our highest standards, using traditional techniques and premium ingredients.',
  },
  {
    icon: Users,
    title: 'Family Tradition',
    description: 'Three generations of baking expertise, passed down through our family recipes and techniques.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Since 1985, Artisan Bakery has been a cornerstone of our community, 
                bringing families together through the love of fresh-baked goods. 
                What started as a small family business has grown into a beloved local institution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  Visit Our Bakery
                </button>
                <button className="btn-outline">
                  View Our Menu
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our bakery interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">39</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              These core principles guide everything we do, from sourcing ingredients 
              to serving our community.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="bg-accent-100 dark:bg-accent-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              The passionate artisans behind every delicious creation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4"
            >
              Our Journey
            </motion.h2>
          </div>

          <div className="space-y-8">
            {[
              {
                year: '1985',
                title: 'The Beginning',
                description: 'Marie Dubois opens the first Artisan Bakery with just a small oven and big dreams.',
              },
              {
                year: '1995',
                title: 'Expansion',
                description: 'Added custom cake services and expanded to include French pastries.',
              },
              {
                year: '2005',
                title: 'Community Recognition',
                description: 'Received the "Best Local Bakery" award for five consecutive years.',
              },
              {
                year: '2015',
                title: 'Next Generation',
                description: 'Marie\'s children join the business, bringing fresh ideas while preserving traditions.',
              },
              {
                year: '2024',
                title: 'Today',
                description: 'Continuing to serve the community with the same passion and quality that started it all.',
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-accent-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-6"
          >
            Become Part of Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto"
          >
            Visit us today and experience the passion, quality, and tradition that has made 
            us a beloved part of the community for nearly four decades.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Visit Our Bakery
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Order Online
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}