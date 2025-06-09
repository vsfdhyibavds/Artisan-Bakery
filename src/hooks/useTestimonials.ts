import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/supabase';

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await db.getApprovedTestimonials();
      if (error) throw error;
      return data || [];
    },
  });
};