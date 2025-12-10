import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Leaf, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/menu/ProductCard';

const categories = [
  { id: 'all', name: 'All Items', icon: null },
  { id: 'bread', name: 'Breads', icon: null },
  { id: 'pastry', name: 'Pastries', icon: null },
  { id: 'cake', name: 'Cakes', icon: null },
  { id: 'cookie', name: 'Cookies', icon: null },
  { id: 'gluten-free', name: 'Gluten-Free', icon: Leaf },
];

const sortOptions = [
  { id: 'name', name: 'Name (A-Z)' },
  { id: 'price-low', name: 'Price (Low to High)' },
  { id: 'price-high', name: 'Price (High to Low)' },
  { id: 'popular', name: 'Most Popular' },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  // Auto-scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.isSpecial ? 1 : 0) - (a.isSpecial ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCustomOrder = () => {
    navigate('/contact');
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
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
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 max-w-3xl mx-auto"
          >
            Discover our full range of artisanal breads, pastries, cakes, and more.
            All made fresh daily with the finest ingredients.
          </motion.p>
        </div>
      </section>

      {/* Quick Navigation Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
        {/* Scroll to Sections */}
        <div className="flex flex-col gap-2">
          <motion.button
            onClick={() => scrollToSection('bread')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Go to Breads"
          >
            <motion.span className="text-sm font-semibold" whileHover={{ y: -2 }}>
              🍞
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('pastry')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Go to Pastries"
          >
            <motion.span className="text-sm font-semibold" whileHover={{ y: -2 }}>
              🥐
            </motion.span>
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('cake')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Go to Cakes"
          >
            <motion.span className="text-sm font-semibold" whileHover={{ y: -2 }}>
              🎂
            </motion.span>
          </motion.button>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Filters and Search */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      if (category.id !== 'all') {
                        scrollToSection(category.id);
                      }
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {category.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Sort and Filter Toggle */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredAndSortedProducts.length} of {products.length} products
              {selectedCategory !== 'all' && (
                <span className="ml-2 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <AnimatePresence>
            {filteredAndSortedProducts.length > 0 ? (
              <>
                {/* Breads Section */}
                {(selectedCategory === 'all' || selectedCategory === 'bread') && (
                  <div id="bread" className="mb-12">
                    <h2 className="text-3xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                      Fresh Breads
                    </h2>
                    <motion.div
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {filteredAndSortedProducts
                        .filter(p => p.category === 'bread')
                        .map((product, index) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                          />
                        ))}
                    </motion.div>
                  </div>
                )}

                {/* Pastries Section */}
                {(selectedCategory === 'all' || selectedCategory === 'pastry') && (
                  <div id="pastry" className="mb-12">
                    <h2 className="text-3xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                      Delicate Pastries
                    </h2>
                    <motion.div
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {filteredAndSortedProducts
                        .filter(p => p.category === 'pastry')
                        .map((product, index) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                          />
                        ))}
                    </motion.div>
                  </div>
                )}

                {/* Cakes Section */}
                {(selectedCategory === 'all' || selectedCategory === 'cake') && (
                  <div id="cake" className="mb-12">
                    <h2 className="text-3xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                      Custom Cakes
                    </h2>
                    <motion.div
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {filteredAndSortedProducts
                        .filter(p => p.category === 'cake')
                        .map((product, index) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                          />
                        ))}
                    </motion.div>
                  </div>
                )}

                {/* Other Categories */}
                {(selectedCategory === 'all' || selectedCategory === 'cookie' || selectedCategory === 'gluten-free') && (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredAndSortedProducts
                      .filter(p => !['bread', 'pastry', 'cake'].includes(p.category))
                      .map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index}
                        />
                      ))}
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We offer custom orders for special occasions and dietary requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCustomOrder}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Place Custom Order
            </button>
            <button
              onClick={handleContactUs}
              className="btn-outline"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}