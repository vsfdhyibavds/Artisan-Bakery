import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Clock, ShoppingCart, Calendar } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Orders & Delivery
  {
    id: '1',
    question: 'How far in advance should I place my order?',
    answer: 'For regular items, we recommend ordering at least 24 hours in advance. For custom cakes and large orders, please give us 3-5 days notice. During busy seasons (holidays, graduation, etc.), we recommend ordering 1-2 weeks ahead.',
    category: 'Orders & Delivery'
  },
  {
    id: '2',
    question: 'Do you offer delivery?',
    answer: 'Yes! We offer delivery within a 10-mile radius of our bakery for a $5.99 fee. Delivery is available Tuesday through Sunday. Orders must be placed by 2 PM for same-day delivery.',
    category: 'Orders & Delivery'
  },
  {
    id: '3',
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or cancelled up to 24 hours before the pickup/delivery time. For custom cakes, we require 48 hours notice for changes. Please call us as soon as possible if you need to make changes.',
    category: 'Orders & Delivery'
  },
  {
    id: '4',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and contactless payments including Apple Pay and Google Pay. For large orders, we also accept checks.',
    category: 'Orders & Delivery'
  },

  // Products & Ingredients
  {
    id: '5',
    question: 'Do you have gluten-free options?',
    answer: 'Yes! We have a dedicated gluten-free line including breads, muffins, cookies, and cakes. All gluten-free items are prepared in a separate area to prevent cross-contamination. Please note that our facility does process gluten-containing ingredients.',
    category: 'Products & Ingredients'
  },
  {
    id: '6',
    question: 'What allergens are present in your bakery?',
    answer: 'Our bakery works with wheat, eggs, dairy, nuts (including tree nuts and peanuts), and soy. We take allergen concerns seriously and can provide detailed ingredient lists for any product. Please inform us of any allergies when ordering.',
    category: 'Products & Ingredients'
  },
  {
    id: '7',
    question: 'Are your products made fresh daily?',
    answer: 'Absolutely! We bake fresh every morning starting at 4 AM. Our breads, pastries, and other items are made daily using traditional techniques and the finest ingredients. Items not sold by closing are donated to local food banks.',
    category: 'Products & Ingredients'
  },
  {
    id: '8',
    question: 'Do you use organic ingredients?',
    answer: 'We use organic ingredients whenever possible, including organic flour for our sourdough and whole wheat breads. While not all our products are 100% organic, we prioritize high-quality, locally-sourced ingredients.',
    category: 'Products & Ingredients'
  },

  // Custom Orders
  {
    id: '9',
    question: 'Can you make custom cakes?',
    answer: 'Yes! We specialize in custom cakes for all occasions. We can accommodate most design requests, dietary restrictions, and size requirements. Please schedule a consultation at least one week before your event to discuss your vision.',
    category: 'Custom Orders'
  },
  {
    id: '10',
    question: 'Do you offer catering services?',
    answer: 'We offer catering for events of all sizes, from small office meetings to large weddings. Our catering menu includes pastry platters, sandwich trays, and dessert selections. Contact us at least one week in advance for catering orders.',
    category: 'Custom Orders'
  },
  {
    id: '11',
    question: 'What\'s the largest cake you can make?',
    answer: 'We can create cakes to serve up to 200 people. For very large events, we often recommend multiple smaller cakes or a combination of cake and sheet cakes. Our team can help you determine the best option for your event.',
    category: 'Custom Orders'
  },

  // Store Information
  {
    id: '12',
    question: 'What are your store hours?',
    answer: 'We\'re open Monday-Friday 7:00 AM - 7:00 PM, Saturday 8:00 AM - 8:00 PM, and Sunday 8:00 AM - 6:00 PM. Holiday hours may vary - please check our website or call ahead during holiday periods.',
    category: 'Store Information'
  },
  {
    id: '13',
    question: 'Do you offer baking classes?',
    answer: 'Yes! We offer regular baking workshops and classes for all skill levels. Topics include bread making, pastry techniques, cake decorating, and seasonal specialties. Check our events page for upcoming classes and registration information.',
    category: 'Store Information'
  },
  {
    id: '14',
    question: 'Is parking available?',
    answer: 'We have a small parking lot behind our building with 8 spaces. Street parking is also available on Baker Street and surrounding streets. The downtown parking garage is just two blocks away.',
    category: 'Store Information'
  }
];

const categories = ['All', 'Orders & Delivery', 'Products & Ingredients', 'Custom Orders', 'Store Information'];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Orders & Delivery': return ShoppingCart;
      case 'Products & Ingredients': return HelpCircle;
      case 'Custom Orders': return Calendar;
      case 'Store Information': return Clock;
      default: return HelpCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 max-w-3xl mx-auto"
          >
            Find answers to common questions about our products, services, and policies.
          </motion.p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openItems.includes(faq.id);
                const CategoryIcon = getCategoryIcon(faq.category);
                
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg flex-shrink-0">
                            <CategoryIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {faq.question}
                            </h3>
                            <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                        <ChevronDown 
                          className={`w-6 h-6 text-gray-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-16">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-4"
          >
            Still Have Questions?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
          >
            Can't find what you're looking for? Our friendly team is here to help!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Contact Us
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Call (555) 123-BAKE
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}