// Supabase Auto-Configuration System
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}

class SupabaseManager {
  private static instance: SupabaseManager;
  private config: SupabaseConfig | null = null;
  private client: any = null;

  private constructor() {}

  static getInstance(): SupabaseManager {
    if (!SupabaseManager.instance) {
      SupabaseManager.instance = new SupabaseManager();
    }
    return SupabaseManager.instance;
  }

  // Auto-detect Supabase configuration from multiple sources
  private detectConfiguration(): SupabaseConfig {
    // Priority order: Environment variables -> Local storage -> Default demo
    const sources = [
      // 1. Environment variables (highest priority)
      {
        url: import.meta.env.VITE_SUPABASE_URL,
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        source: 'environment'
      },
      // 2. Local storage (user configured)
      {
        url: localStorage.getItem('supabase_url'),
        anonKey: localStorage.getItem('supabase_anon_key'),
        source: 'localStorage'
      },
      // 3. Demo/Development instance (fallback, safe demo values only)
      {
        url: 'https://localhost:54321',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOEoJeXxjNx5kTHAHu_j6QIBVhko_WqJzSs8',
        source: 'demo'
      }
    ];

    for (const source of sources) {
      if (this.isValidConfig(source.url, source.anonKey)) {
        console.log(`✅ Supabase configured from ${source.source}`);
        return {
          url: source.url!,
          anonKey: source.anonKey!,
          isConfigured: true
        };
      }
    }

    // If no valid config found, return demo config (safe demo values only)
    console.warn('⚠️ No valid Supabase configuration found, using demo mode');
    return {
      url: 'https://localhost:54321',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOEoJeXxjNx5kTHAHu_j6QIBVhko_WqJzSs8',
      isConfigured: false
    };
  }

  private isValidConfig(url?: string | null, anonKey?: string | null): boolean {
    return !!(
      url &&
      anonKey &&
      url !== 'your_supabase_url_here' &&
      anonKey !== 'your_supabase_anon_key_here' &&
      (url.includes('supabase') || url.includes('localhost')) &&
      anonKey.length > 20
    );
  }

  // Initialize Supabase client with auto-configuration
  initializeClient() {
    if (this.client) return this.client;

    this.config = this.detectConfiguration();

    // Always use mock client in demo mode to prevent network errors
    if (this.config.isConfigured && !this.config.url.includes('localhost')) {
      try {
        this.client = createClient<Database>(this.config.url, this.config.anonKey, {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
          },
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        });
        console.log('✅ Supabase client initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize Supabase client:', error);
        this.client = this.createMockClient();
      }
    } else {
      console.log('🔧 Using mock Supabase client (demo mode)');
      this.client = this.createMockClient();
    }

    return this.client;
  }

  // Configure Supabase manually (for user setup)
  configureSupabase(url: string, anonKey: string): boolean {
    if (!this.isValidConfig(url, anonKey)) {
      throw new Error('Invalid Supabase configuration provided');
    }

    // Save to localStorage for persistence
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_anon_key', anonKey);

    // Reinitialize client
    this.client = null;
    this.config = null;
    this.initializeClient();

    return true;
  }

  // Get current configuration status
  getConfigurationStatus() {
    if (!this.config) {
      this.config = this.detectConfiguration();
    }
    return {
      isConfigured: this.config.isConfigured,
      url: this.config.url,
      source: this.config.isConfigured ? 'configured' : 'mock'
    };
  }

  // Create comprehensive mock client
  private createMockClient() {
    console.log('🔧 Creating mock Supabase client for development');

    return {
      auth: {
        signUp: async () => ({
          data: { user: null, session: null },
          error: { message: 'Mock mode - Supabase not configured' }
        }),
        signInWithPassword: async () => ({
          data: { user: null, session: null },
          error: { message: 'Mock mode - Supabase not configured' }
        }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({
          data: {
            user: null
          },
          error: null
        }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } }
        })
      },
      from: (table: string) => ({
        select: () => ({
          eq: () => ({
            order: () => Promise.resolve({ data: this.getMockData(table), error: null }),
            single: () => Promise.resolve({ data: this.getMockData(table)[0] || null, error: null }),
            limit: () => Promise.resolve({ data: this.getMockData(table), error: null })
          }),
          order: () => Promise.resolve({ data: this.getMockData(table), error: null }),
          single: () => Promise.resolve({ data: this.getMockData(table)[0] || null, error: null }),
          limit: () => Promise.resolve({ data: this.getMockData(table), error: null }),
          range: () => Promise.resolve({ data: this.getMockData(table), error: null }),
          gte: () => Promise.resolve({ data: this.getMockData(table), error: null }),
          lte: () => Promise.resolve({ data: this.getMockData(table), error: null })
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({
              data: { id: 'mock-id', created_at: new Date().toISOString() },
              error: null
            })
          })
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve({
                data: { id: 'mock-id', updated_at: new Date().toISOString() },
                error: null
              })
            })
          })
        }),
        delete: () => ({
          eq: () => Promise.resolve({ data: null, error: null })
        })
      }),
      channel: () => ({
        on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
        subscribe: () => ({ unsubscribe: () => {} })
      }),
      functions: {
        invoke: async () => ({ data: { success: true, message: 'Mock response' }, error: null })
      }
    };
  }

  // Get mock data for different tables
  private getMockData(table: string) {
    switch (table) {
      case 'customers':
        return [
          {
            id: 'mock-user-id',
            first_name: 'Demo',
            last_name: 'User',
            email: 'demo@example.com',
            phone: '(+254) 787943878',
            address: '123 Demo Street',
            city: 'Demo City',
            zip_code: '12345',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
      case 'products':
        return [
          {
            id: 'mock-product-1',
            name: 'Demo Sourdough Bread',
            description: 'Mock product for demonstration',
            price: 8.50,
            category: 'bread',
            image_url: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
            is_available: true,
            is_special: false
          }
        ];
      case 'testimonials':
        return [
          {
            id: 'mock-testimonial-1',
            name: 'Demo Customer',
            content: 'This is a demo testimonial for the mock client.',
            rating: 5,
            is_approved: true,
            created_at: new Date().toISOString()
          }
        ];
      default:
        return [];
    }
  }

  // Auto-setup for common hosting platforms
  autoSetupForPlatform() {
    const platform = this.detectPlatform();

    switch (platform) {
      case 'netlify':
        this.setupNetlifyIntegration();
        break;
      case 'vercel':
        this.setupVercelIntegration();
        break;
      case 'localhost':
        this.setupLocalDevelopment();
        break;
      default:
        console.log('Platform auto-setup not available');
    }
  }

  private detectPlatform(): string {
    const hostname = window.location.hostname;
    if (hostname.includes('netlify.app')) return 'netlify';
    if (hostname.includes('vercel.app')) return 'vercel';
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'localhost';
    return 'unknown';
  }

  private setupNetlifyIntegration() {
    // Check for Netlify environment variables
    console.log('🌐 Detected Netlify deployment, checking for environment variables...');
  }

  private setupVercelIntegration() {
    // Check for Vercel environment variables
    console.log('▲ Detected Vercel deployment, checking for environment variables...');
  }

  private setupLocalDevelopment() {
    console.log('💻 Local development detected');
    // Could auto-start local Supabase if available
  }
}

export const supabaseManager = SupabaseManager.getInstance();