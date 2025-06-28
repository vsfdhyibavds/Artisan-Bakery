import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const useInventoryManagement = () => {
  const queryClient = useQueryClient();

  // Get low stock alerts
  const lowStockAlerts = useQuery({
    queryKey: ['low-stock-alerts'],
    queryFn: async () => {
      // This would be implemented with proper inventory tracking
      // For now, return mock data
      return [
        { id: '1', name: 'Sourdough Bread', currentStock: 3, minStock: 5 },
        { id: '2', name: 'Chocolate Croissants', currentStock: 2, minStock: 10 }
      ];
    }
  });

  // Update product availability
  const updateProductAvailability = useMutation({
    mutationFn: async ({ productId, isAvailable }: { productId: string; isAvailable: boolean }) => {
      const { error } = await supabase
        .from('products')
        .update({ is_available: isAvailable })
        .eq('id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product availability updated');
    }
  });

  return {
    lowStockAlerts,
    updateProductAvailability
  };
};