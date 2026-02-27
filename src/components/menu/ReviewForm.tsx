import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface ReviewFormProps {
  productId: string;
  onSubmitSuccess: () => void;
}

export default function ReviewForm({ productId, onSubmitSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('Please sign in to leave a review');
      return;
    }

    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a review title');
      return;
    }

    if (!content.trim()) {
      setError('Please enter your review');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          rating,
          title,
          content,
          is_verified_purchase: false, // Will be set via order history check
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setSuccess(true);
      setRating(0);
      setTitle('');
      setContent('');

      setTimeout(() => {
        setSuccess(false);
        onSubmitSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
        <p className="text-blue-900 dark:text-blue-200">
          <AlertCircle className="inline w-4 h-4 mr-2" />
          Sign in to leave a review
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Share Your Experience
      </h3>

      {/* Rating */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Best sourdough I've tried!"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-primary-500"
          maxLength={100}
        />
      </div>

      {/* Content */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Review
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share what you loved (or didn't) about this product..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:border-primary-500 resize-none h-28"
          maxLength={500}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {content.length}/500 characters
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 rounded-lg text-sm flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-200 rounded-lg text-sm"
        >
          ✓ Review submitted! Thank you for sharing your feedback.
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
