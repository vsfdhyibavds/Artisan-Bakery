import { useQuery } from '@tanstack/react-query';
import { db } from '../lib/supabase';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await db.getProducts();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      if (category === 'all') {
        const { data, error } = await db.getProducts();
        if (error) throw error;
        return data || [];
      } else {
        const { data, error } = await db.getProductsByCategory(category);
        if (error) throw error;
        return data || [];
      }
    },
  });
};

export const useSpecialProducts = () => {
  return useQuery({
    queryKey: ['products', 'specials'],
    queryFn: async () => {
      const { data, error } = await db.getSpecialProducts();
      if (error) throw error;
      return data || [];
    },
  });
};