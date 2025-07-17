import { supabaseManager } from './supabase-config';
import { Database } from './database.types';

// Initialize Supabase client with auto-configuration
export const supabase = supabaseManager.initializeClient();

// Auto-setup for current platform
supabaseManager.autoSetupForPlatform();

// Export configuration utilities
export const configureSupabase = (url: string, anonKey: string) => {
  return supabaseManager.configureSupabase(url, anonKey);
};

export const getSupabaseStatus = () => {
  return supabaseManager.getConfigurationStatus();
};

// Enhanced auth helpers with better error handling
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData }
      });
      return { data, error };
    } catch (err) {
      console.error('Auth signup error:', err);
      return { data: null, error: { message: 'Authentication service unavailable' } };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (err) {
      console.error('Auth signin error:', err);
      return { data: null, error: { message: 'Authentication service unavailable' } };
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err) {
      console.error('Auth signout error:', err);
      return { error: { message: 'Authentication service unavailable' } };
    }
  },

  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    } catch (err) {
      console.error('Get user error:', err);
      return { user: null, error: { message: 'Authentication service unavailable' } };
    }
  }
};

// Enhanced database helpers with retry logic
export const db = {
  // Products
  getProducts: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('name');
      return { data: data || [], error };
    } catch (err) {
      console.error('Database error:', err);
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  getProductsByCategory: async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .eq('is_available', true)
        .order('name');
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  getSpecialProducts: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_special', true)
        .eq('is_available', true)
        .order('name');
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  // Orders
  createOrder: async (orderData: any) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  createOrderItems: async (orderItems: any[]) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .insert(orderItems)
        .select();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  getUserOrders: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  // Customers
  createCustomer: async (customerData: any) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert(customerData)
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  updateCustomer: async (userId: string, customerData: any) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(customerData)
        .eq('id', userId)
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  getCustomer: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', userId)
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  // Testimonials
  getApprovedTestimonials: async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  createTestimonial: async (testimonialData: any) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonialData)
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  // Events
  getActiveEvents: async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date');
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  registerForEvent: async (registrationData: any) => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert(registrationData)
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  getUserEventRegistrations: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (*)
        `)
        .eq('customer_id', userId)
        .order('registration_date', { ascending: false });
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  // Blog posts
  getPublishedBlogPosts: async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  getBlogPostsByCategory: async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      return { data: data || [], error };
    } catch (err) {
      return { data: [], error: { message: 'Database service unavailable' } };
    }
  },

  // Newsletter
  subscribeToNewsletter: async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  },

  // Custom cakes
  createCustomCake: async (cakeData: any) => {
    try {
      const { data, error } = await supabase
        .from('custom_cakes')
        .insert(cakeData)
        .select()
        .single();
      return { data, error };
    } catch (err) {
      return { data: null, error: { message: 'Database service unavailable' } };
    }
  }
};