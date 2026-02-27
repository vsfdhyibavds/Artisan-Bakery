import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, User, Calendar } from 'lucide-react';
import { ProductReview } from '../../lib/types';
import { formatDate } from '../../lib/utils';

interface ReviewListProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
  loading: boolean;
}

export default function ReviewList({
  reviews,
  averageRating,
  totalReviews,
  loading,
}: ReviewListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (totalReviews === 0) {
    return (
      <div className="text-center py-12">
        <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">
          No reviews yet. Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {averageRating}
            </div>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((ratingLevel) => {
              const count = reviews.filter((r) => r.rating === ratingLevel).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={ratingLevel} className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-5">
                    {ratingLevel}★
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                    {review.customer_name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {review.customer_name || 'Anonymous'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {formatDate(new Date(review.created_at))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {review.title}
                </h4>
                {review.is_verified_purchase && (
                  <span className="inline-block text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded mb-2">
                    ✓ Verified Purchase
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
              {review.content}
            </p>

            {/* Helpful */}
            <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              Helpful ({review.helpful_count})
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
