export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bread' | 'pastry' | 'cake' | 'cookie' | 'gluten-free';
  image: string;
  ingredients: string[];
  allergens: string[];
  isSpecial?: boolean;
  specialPrice?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SecurityLog {
  timestamp: number;
  event: string;
  status: 'success' | 'failure';
  details: Record<string, any>;
}

export interface TwoFactorResponse {
  success: boolean;
  error?: string;
  qr?: string;
}

export type AuthView = 'signin' | 'signup' | 'reset' | '2fa';

export interface AuthState {
  user: any;
  session: any;
  lastActivity: number;
  deviceFingerprint: string | null;
  isAuthenticated: boolean;
  requires2FA: boolean;
  loginAttempts: number;
  lockoutUntil: number | null;
  view: AuthView;
}

export const AUTH_CONFIG = {
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    inactivityTimeout: 30 * 60 * 1000 // 30 minutes
  },
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    minPasswordLength: 8
  }
} as const;