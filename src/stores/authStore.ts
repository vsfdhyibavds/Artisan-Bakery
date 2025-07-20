import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { auth, db, getSupabaseStatus } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip_code?: string;
}

interface AuthState {
  user: User | null;
  customer: Customer | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (userData: any) => Promise<boolean>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  customer: null,
  loading: true,

  signUp: async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await auth.signUp(email, password, userData);
      
      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Create customer profile
        const customerData = {
          id: data.user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: email,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          zip_code: userData.zipCode,
        };

        const { error: customerError } = await db.createCustomer(customerData);
        
        if (customerError) {
          console.error('Error creating customer profile:', customerError);
        }

        set({ user: data.user });
        toast.success('Account created successfully!');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to create account');
      return false;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Fetch customer profile
        const { data: customer } = await db.getCustomer(data.user.id);
        
        set({ 
          user: data.user,
          customer: customer || null
        });
        
        toast.success('Welcome back!');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in');
      return false;
    }
  },

  signOut: async () => {
    try {
      const { error } = await auth.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }

      set({ user: null, customer: null });
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  },

  updateProfile: async (userData: any) => {
    try {
      const { user } = get();
      if (!user) return false;

      const { data, error } = await db.updateCustomer(user.id, userData);
      
      if (error) {
        toast.error('Failed to update profile');
        return false;
      }

      set({ customer: data });
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
      return false;
    }
  },

  initialize: async () => {
    try {
      set({ loading: true });
      
      // For demo mode, automatically set up a demo user
      const supabaseStatus = getSupabaseStatus();
      if (!supabaseStatus.isConfigured) {
        // Set up demo user automatically
        const demoUser = {
          id: 'demo-user-id',
          email: 'demo@artisanbakery.com',
          created_at: new Date().toISOString(),
          user_metadata: {
            firstName: 'Demo',
            lastName: 'User',
            phone: '(555) 123-4567'
          }
        };
        
        const demoCustomer = {
          id: 'demo-user-id',
          first_name: 'Demo',
          last_name: 'User',
          email: 'demo@artisanbakery.com',
          phone: '(555) 123-4567',
          address: '123 Demo Street',
          city: 'Demo City',
          zip_code: '12345',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        set({ 
          user: demoUser as any,
          customer: demoCustomer,
          loading: false
        });
        return;
      }
      
      const { user } = await auth.getCurrentUser();
      
      if (user) {
        // Try to get customer data, but don't fail if it doesn't exist
        const { data: customer, error } = await db.getCustomer(user.id);
        
        // If no customer profile exists, create a basic one from user data
        if (!customer && !error) {
          const userData = user.user_metadata || {};
          const basicCustomer = {
            id: user.id,
            first_name: userData.firstName || userData.first_name || user.email?.split('@')[0] || 'User',
            last_name: userData.lastName || userData.last_name || '',
            email: user.email || '',
            phone: userData.phone || '',
            address: userData.address || null,
            city: userData.city || null,
            zip_code: userData.zipCode || null,
          };
          
          // Try to create customer profile
          const { data: newCustomer } = await db.createCustomer(basicCustomer);
          
          set({ 
            user,
            customer: newCustomer || basicCustomer,
            loading: false
          });
        } else {
          set({ 
            user,
            customer: customer || {
              id: user.id,
              first_name: user.email?.split('@')[0] || 'User',
              last_name: '',
              email: user.email || '',
              phone: '',
              address: null,
              city: null,
              zip_code: null,
            },
            loading: false
          });
        }
      } else {
        set({ 
          user: null,
          customer: null,
          loading: false
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // In case of error, still try to show something useful
      set({ 
        user: null,
        customer: null,
        loading: false 
      });
    }
  },
}));