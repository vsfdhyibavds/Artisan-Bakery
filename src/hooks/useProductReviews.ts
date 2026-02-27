import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ProductReview } from '../lib/types';

export const useProductReviews = (productId: string) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setReviews(data || []);
      setTotalReviews(data?.length || 0);

      if (data && data.length > 0) {
        const avgRating = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        setAverageRating(Math.round(avgRating * 10) / 10);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (review: {
    rating: number;
    title: string;
    content: string;
    isVerifiedPurchase: boolean;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to leave a review');

      const { error: insertError } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          customer_id: user.id,
          rating: review.rating,
          title: review.title,
          content: review.content,
          is_verified_purchase: review.isVerifiedPurchase,
          is_approved: false, // Reviews need moderation
        });

      if (insertError) throw insertError;

      // Refresh reviews
      await fetchReviews();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit review';
      return { success: false, error: message };
    }
  };

  return {
    reviews,
    loading,
    error,
    averageRating,
    totalReviews,
    addReview,
    refetch: fetchReviews,
  };
};
