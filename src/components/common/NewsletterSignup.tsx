import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { db } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface NewsletterSignupProps {
  className?: string;
}

export default function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await db.subscribeToNewsletter(email);
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('You are already subscribed to our newsletter');
        } else {
          toast.error('Failed to subscribe. Please try again.');
        }
      } else {
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
          disabled={loading}
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-accent-500 hover:bg-accent-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </motion.button>
    </form>
  );
}