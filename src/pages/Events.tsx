import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Star, ChefHat, Gift, Heart } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  instructor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Workshop' | 'Class' | 'Special Event';
  image: string;
  includes: string[];
  requirements?: string[];
}

const events: Event[] = [
  {
    id: '1',
    title: 'Sourdough Bread Making Workshop',
    description: 'Learn the ancient art of sourdough bread making from our master baker. You\'ll create your own starter and take home fresh bread.',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '4 hours',
    location: 'Main Bakery Kitchen',
    price: 85,
    maxParticipants: 12,
    currentParticipants: 8,
    instructor: 'Marie Dubois',
    difficulty: 'Beginner',
    category: 'Workshop',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    includes: ['All ingredients', 'Recipe booklet', 'Sourdough starter', 'Fresh bread to take home', 'Light lunch'],
    requirements: ['Apron (provided)', 'Comfortable shoes']
  },
  {
    id: '2',
    title: 'French Pastry Masterclass',
    description: 'Master the delicate techniques of French pastry making including croissants, éclairs, and macarons.',
    date: '2024-02-18',
    time: '9:00 AM',
    duration: '6 hours',
    location: 'Professional Kitchen',
    price: 150,
    maxParticipants: 8,
    currentParticipants: 6,
    instructor: 'James Wilson',
    difficulty: 'Advanced',
    category: 'Class',
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800',
    includes: ['Premium ingredients', 'Professional techniques guide', 'Pastries to take home', 'Certificate of completion', 'Gourmet lunch'],
    requirements: ['Basic baking knowledge', 'Comfortable clothing']
  },
  {
    id: '3',
    title: 'Valentine\'s Day Cake Decorating',
    description: 'Create beautiful Valentine\'s themed cakes with professional decorating techniques and romantic designs.',
    date: '2024-02-12',
    time: '2:00 PM',
    duration: '3 hours',
    location: 'Decorating Studio',
    price: 65,
    maxParticipants: 15,
    currentParticipants: 12,
    instructor: 'Sofia Rodriguez',
    difficulty: 'Intermediate',
    category: 'Special Event',
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800',
    includes: ['Pre-baked cake', 'All decorating supplies', 'Design templates', 'Decorated cake to take home', 'Refreshments'],
    requirements: ['No experience necessary']
  },
  {
    id: '4',
    title: 'Kids Baking Adventure',
    description: 'A fun-filled baking session designed for children aged 8-14. Learn to make cookies, cupcakes, and simple breads.',
    date: '2024-02-20',
    time: '11:00 AM',
    duration: '2.5 hours',
    location: 'Kids Kitchen',
    price: 45,
    maxParticipants: 16,
    currentParticipants: 10,
    instructor: 'David Chen',
    difficulty: 'Beginner',
    category: 'Workshop',
    image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800',
    includes: ['All ingredients', 'Kid-friendly tools', 'Recipe cards', 'Baked goods to take home', 'Fun activities'],
    requirements: ['Adult supervision for children under 10', 'Closed-toe shoes']
  },
  {
    id: '5',
    title: 'Gluten-Free Baking Essentials',
    description: 'Discover the secrets of successful gluten-free baking with alternative flours and binding techniques.',
    date: '2024-02-25',
    time: '1:00 PM',
    duration: '3.5 hours',
    location: 'Specialty Kitchen',
    price: 75,
    maxParticipants: 10,
    currentParticipants: 4,
    instructor: 'Marie Dubois',
    difficulty: 'Intermediate',
    category: 'Class',
    image: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800',
    includes: ['Gluten-free ingredients', 'Flour blend recipes', 'Multiple baked items', 'Nutritional guide', 'Light refreshments'],
    requirements: ['Basic baking knowledge helpful']
  },
  {
    id: '6',
    title: 'Artisan Pizza & Bread Workshop',
    description: 'Learn to make authentic artisan pizza dough and rustic breads using traditional techniques and wood-fired ovens.',
    date: '2024-03-02',
    time: '3:00 PM',
    duration: '4 hours',
    location: 'Outdoor Kitchen & Wood Oven',
    price: 95,
    maxParticipants: 14,
    currentParticipants: 7,
    instructor: 'David Chen',
    difficulty: 'Beginner',
    category: 'Workshop',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    includes: ['All ingredients', 'Wood-fired oven experience', 'Pizza and bread to take home', 'Recipe collection', 'Italian-style dinner'],
    requirements: ['Weather-appropriate clothing', 'Comfortable shoes']
  }
];

const categories = ['All', 'Workshop', 'Class', 'Special Event'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || event.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Workshop': return ChefHat;
      case 'Class': return Star;
      case 'Special Event': return Gift;
      default: return Calendar;
    }
  };

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Event Detail Header */}
        <section className="relative py-20 bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${selectedEvent.image})` }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <button
              onClick={() => setSelectedEvent(null)}
              className="mb-6 text-gray-300 hover:text-white transition-colors"
            >
              ← Back to Events
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-display font-bold mb-6"
                >
                  {selectedEvent.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-200 mb-8"
                >
                  {selectedEvent.description}
                </motion.p>
                <div className="flex flex-wrap gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{selectedEvent.time} ({selectedEvent.duration})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{selectedEvent.currentParticipants}/{selectedEvent.maxParticipants} participants</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">${selectedEvent.price}</div>
                  <div className="text-gray-300 mb-4">per person</div>
                  <button className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-semibold transition-colors mb-4">
                    Book Now
                  </button>
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between mb-2">
                      <span>Instructor:</span>
                      <span className="font-medium">{selectedEvent.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(selectedEvent.difficulty)}`}>
                        {selectedEvent.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {selectedEvent.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedEvent.requirements && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {selectedEvent.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            Baking Events & Classes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 max-w-3xl mx-auto"
          >
            Join our expert bakers for hands-on workshops, masterclasses, and special events. 
            Learn new skills and create delicious memories.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="flex gap-2">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <div className="flex gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => {
              const CategoryIcon = getCategoryIcon(event.category);
              const spotsLeft = event.maxParticipants - event.currentParticipants;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <CategoryIcon className="w-4 h-4" />
                        {event.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(event.difficulty)}`}>
                        {event.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ${event.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Instructor: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{event.instructor}</span>
                      </div>
                      <div className={`text-sm font-medium ${
                        spotsLeft <= 3 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Fully booked'}
                      </div>
                    </div>

                    <button 
                      className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                        spotsLeft > 0 
                          ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={spotsLeft === 0}
                    >
                      {spotsLeft > 0 ? 'Book Now' : 'Fully Booked'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-4"
          >
            Private Group Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto"
          >
            Looking for a unique team building experience or private celebration? 
            We offer custom baking workshops for groups of 8 or more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Plan Private Event
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}