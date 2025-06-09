import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/supabase';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await db.getPublishedBlogPosts();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useBlogPostsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['blog-posts', category],
    queryFn: async () => {
      if (category === 'All') {
        const { data, error } = await db.getPublishedBlogPosts();
        if (error) throw error;
        return data || [];
      } else {
        const { data, error } = await db.getBlogPostsByCategory(category);
        if (error) throw error;
        return data || [];
      }
    },
  });
};