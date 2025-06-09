import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await db.getActiveEvents();
      if (error) throw error;
      return data || [];
    },
  });
};

export const useEventRegistration = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (eventId: string) => {
      if (!user) throw new Error('Must be logged in to register');
      
      const registrationData = {
        event_id: eventId,
        customer_id: user.id,
        payment_status: 'pending'
      };

      const { data, error } = await db.registerForEvent(registrationData);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['user-registrations'] });
      toast.success('Successfully registered for event!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to register for event');
    },
  });
};

export const useUserEventRegistrations = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['user-registrations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await db.getUserEventRegistrations(user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
};