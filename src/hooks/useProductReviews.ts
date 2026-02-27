const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://eugenco578_db_user:NF3kDFxFp08v0WUV@cluster0.n3i7urj.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);import { useState, useEffect } from 'react';
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
        const avgRating = data.reduce((sum: number, review: any) => sum + review.rating, 0) / data.length;
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
