/**
 * Mock Authentication for Local Development
 * Uses data from local Postgres database
 * In production, use real Supabase
 */

interface MockUser {
  id: string;
  email: string;
  password: string;
  created_at: string;
  user_metadata?: {
    firstName?: string;
    lastName?: string;
  };
}

interface MockAuthResponse {
  data: {
    user: MockUser | null;
    session: any;
  };
  error: null | {
    message: string;
  };
}

// Session storage keys
const MOCK_SESSION_KEY = 'mock_auth_session';
const MOCK_SESSION_PERSIST_KEY = 'mock_auth_session_persist';

// Session encryption helpers
const encryptSession = (session: any): string => {
  try {
    return btoa(JSON.stringify(session));
  } catch {return '';
  }
};

const decryptSession = (encrypted: string): any => {
  try {
    return JSON.parse(atob(encrypted));
  } catch {
    return null;
  }
};

// Dev password from environment or fallback
const DEV_PASSWORD = import.meta.env.VITE_MOCK_AUTH_PASSWORD || 'dev-password-2024';

// Mock users stored locally (you can add more)
const MOCK_USERS: MockUser[] = [
  {
    id: 'user-1',
    email: 'eugenco578@gmail.com',
    password: DEV_PASSWORD,
    created_at: new Date().toISOString(),
    user_metadata: {
      firstName: 'Eugene',
      lastName: 'Wekesa'
    }
  },
  {
    id: 'user-2',
    email: 'charlie@gmail.com',
    password: DEV_PASSWORD,
    created_at: new Date().toISOString(),
    user_metadata: {
      firstName: 'Charlie',
      lastName: 'Harper'
    }
  },
  {
    id: 'user-3',
    email: 'walden@gmail.com',
    password: DEV_PASSWORD,
    created_at: new Date().toISOString(),
    user_metadata: {
      firstName: 'Walden',
      lastName: 'Schmidt'
    }
  }
];

export const mockAuth = {
  signUp: async (email: string, password: string, userData?: any): Promise<MockAuthResponse> => {
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      return {
        data: { user: null, session: null },
        error: { message: 'User already exists' }
      };
    }

    // Create new user
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      created_at: new Date().toISOString(),
      user_metadata: {
        firstName: userData?.firstName,
        lastName: userData?.lastName
      }
    };

    MOCK_USERS.push(newUser);

    // Auto sign in after signup
    const session = { user: newUser, token: `mock-token-${newUser.id}`, timestamp: Date.now() };
    const encrypted = encryptSession(session);
    sessionStorage.setItem(MOCK_SESSION_KEY, encrypted);
    localStorage.setItem(MOCK_SESSION_PERSIST_KEY, encrypted);

    return {
      data: { user: newUser, session },
      error: null
    };
  },

  signIn: async (email: string, password: string): Promise<MockAuthResponse> => {
    // Find user by email
    const user = MOCK_USERS.find(u => u.email === email);

    if (!user) {
      return {
        data: { user: null, session: null },
        error: { message: 'User not found' }
      };
    }

    // Verify password (simple check for demo)
    if (user.password !== password) {
      return {
        data: { user: null, session: null },
        error: { message: 'Invalid password' }
      };
    }

    // Create session
    const session = { user, token: `mock-token-${user.id}`, timestamp: Date.now() };
    const encrypted = encryptSession(session);
    sessionStorage.setItem(MOCK_SESSION_KEY, encrypted);
    localStorage.setItem(MOCK_SESSION_PERSIST_KEY, encrypted);

    return {
      data: { user, session },
      error: null
    };
  },

  signOut: async () => {
    sessionStorage.removeItem(MOCK_SESSION_KEY);
    localStorage.removeItem(MOCK_SESSION_PERSIST_KEY);
    return { error: null };
  },

  getCurrentUser: async () => {
    // Check sessionStorage first, fallback to localStorage
    let sessionData = sessionStorage.getItem(MOCK_SESSION_KEY) || localStorage.getItem(MOCK_SESSION_PERSIST_KEY);
    if (!sessionData) {
      return { data: { user: null }, error: null };
    }

    try {
      const parsed = decryptSession(sessionData);
      if (!parsed) return { data: { user: null }, error: null };

      // Restore to sessionStorage if missing
      if (!sessionStorage.getItem(MOCK_SESSION_KEY)) {
        sessionStorage.setItem(MOCK_SESSION_KEY, sessionData);
      }

      return { data: { user: parsed.user }, error: null };
    } catch {
      return { data: { user: null }, error: null };
    }
  },

  getSession: async () => {
    let sessionData = sessionStorage.getItem(MOCK_SESSION_KEY) || localStorage.getItem(MOCK_SESSION_PERSIST_KEY);
    if (!sessionData) {
      return { data: { session: null }, error: null };
    }

    try {
      const session = decryptSession(sessionData);
      if (!sessionStorage.getItem(MOCK_SESSION_KEY)) {
        sessionStorage.setItem(MOCK_SESSION_KEY, sessionData);
      }
      return { data: { session }, error: null };
    } catch {
      return { data: { session: null }, error: null };
    }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Check both storage locations
    let sessionData = sessionStorage.getItem(MOCK_SESSION_KEY) || localStorage.getItem(MOCK_SESSION_PERSIST_KEY);
    if (sessionData) {
      try {
        const session = decryptSession(sessionData);
        if (session && !sessionStorage.getItem(MOCK_SESSION_KEY)) {
          sessionStorage.setItem(MOCK_SESSION_KEY, sessionData);
        }
        callback('SIGNED_IN', session);
      } catch {}
    }

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === MOCK_SESSION_KEY || e.key === MOCK_SESSION_PERSIST_KEY) && e.newValue) {
        try {
          const session = decryptSession(e.newValue);
          callback('SIGNED_IN', session);
        } catch {}
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }

    // Return unsubscribe function
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            if (typeof window !== 'undefined') {
              window.removeEventListener('storage', handleStorageChange);
            }
          }
        }
      }
    };
  }
};
