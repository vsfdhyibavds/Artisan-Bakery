import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};

// Database helpers
export const db = {
  // Products
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_available', true)
      .order('name');
    return { data, error };
  },

  getProductsByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_available', true)
      .order('name');
    return { data, error };
  },

  getSpecialProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_special', true)
      .eq('is_available', true)
      .order('name');
    return { data, error };
  },

  // Orders
  createOrder: async (orderData: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    return { data, error };
  },

  createOrderItems: async (orderItems: any[]) => {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();
    return { data, error };
  },

  getUserOrders: async (userId: string) => {
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
    return { data, error };
  },

  // Customers
  createCustomer: async (customerData: any) => {
    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();
    return { data, error };
  },

  updateCustomer: async (userId: string, customerData: any) => {
    const { data, error } = await supabase
      .from('customers')
      .update(customerData)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  getCustomer: async (userId: string) => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Testimonials
  getApprovedTestimonials: async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createTestimonial: async (testimonialData: any) => {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonialData)
      .select()
      .single();
    return { data, error };
  },

  // Events
  getActiveEvents: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date');
    return { data, error };
  },

  registerForEvent: async (registrationData: any) => {
    const { data, error } = await supabase
      .from('event_registrations')
      .insert(registrationData)
      .select()
      .single();
    return { data, error };
  },

  getUserEventRegistrations: async (userId: string) => {
    const { data, error } = await supabase
      .from('event_registrations')
      .select(`
        *,
        events (*)
      `)
      .eq('customer_id', userId)
      .order('registration_date', { ascending: false });
    return { data, error };
  },

  // Blog posts
  getPublishedBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getBlogPostsByCategory: async (category: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Newsletter
  subscribeToNewsletter: async (email: string) => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
      .select()
      .single();
    return { data, error };
  },

  // Custom cakes
  createCustomCake: async (cakeData: any) => {
    const { data, error } = await supabase
      .from('custom_cakes')
      .insert(cakeData)
      .select()
      .single();
    return { data, error };
  }
};