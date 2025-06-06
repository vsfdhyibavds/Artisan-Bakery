import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, Search, ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Sourdough: A Beginner\'s Guide',
    excerpt: 'Learn the ancient art of sourdough baking with our step-by-step guide to creating your own starter and baking perfect loaves.',
    content: 'Full blog post content would go here...',
    author: 'Marie Dubois',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Baking Tips',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['sourdough', 'bread', 'beginner', 'starter']
  },
  {
    id: '2',
    title: 'Seasonal Ingredients: Winter Baking Favorites',
    excerpt: 'Discover how to incorporate seasonal winter ingredients into your baking for flavors that capture the essence of the season.',
    content: 'Full blog post content would go here...',
    author: 'James Wilson',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Seasonal',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['seasonal', 'winter', 'ingredients', 'flavors']
  },
  {
    id: '3',
    title: 'Decorating Techniques for Professional-Looking Cakes',
    excerpt: 'Master the art of cake decoration with these professional techniques that will make your homemade cakes look bakery-perfect.',
    content: 'Full blog post content would go here...',
    author: 'Sofia Rodriguez',
    date: '2024-01-08',
    readTime: '12 min read',
    category: 'Cake Decorating',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['cakes', 'decorating', 'techniques', 'professional']
  },
  {
    id: '4',
    title: 'The Science Behind Perfect Pastry',
    excerpt: 'Understanding the science behind pastry making will help you achieve consistent, flaky, and delicious results every time.',
    content: 'Full blog post content would go here...',
    author: 'David Chen',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Baking Science',
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['pastry', 'science', 'technique', 'baking']
  },
  {
    id: '5',
    title: 'Gluten-Free Baking: Tips and Tricks',
    excerpt: 'Navigate the world of gluten-free baking with confidence using our tested tips and favorite flour blends.',
    content: 'Full blog post content would go here...',
    author: 'Marie Dubois',
    date: '2024-01-03',
    readTime: '7 min read',
    category: 'Dietary',
    image: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['gluten-free', 'dietary', 'tips', 'flour']
  },
  {
    id: '6',
    title: 'Building a Home Bakery: Essential Equipment',
    excerpt: 'Everything you need to know about setting up your home kitchen for serious baking, from basic tools to professional equipment.',
    content: 'Full blog post content would go here...',
    author: 'James Wilson',
    date: '2023-12-28',
    readTime: '9 min read',
    category: 'Equipment',
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['equipment', 'home-baking', 'tools', 'setup']
  }
];

const categories = ['All', 'Baking Tips', 'Seasonal', 'Cake Decorating', 'Baking Science', 'Dietary', 'Equipment'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Article Header */}
        <section className="relative py-20 bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${selectedPost.image})` }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-6 text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Blog
            </button>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              {selectedPost.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(selectedPost.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{selectedPost.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {selectedPost.excerpt}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This is where the full blog post content would be displayed. In a real application, 
                this would contain the complete article with proper formatting, images, and rich content.
              </p>
              {/* Add more content sections as needed */}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
            Baking Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 max-w-3xl mx-auto"
          >
            Tips, techniques, and stories from our master bakers. Learn the secrets 
            behind perfect pastries, breads, and cakes.
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
                placeholder="Search articles..."
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

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{post.tags.length - 2} more
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
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

      {/* Newsletter CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-4"
          >
            Never Miss a Recipe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter for the latest baking tips, recipes, and behind-the-scenes stories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm: flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}