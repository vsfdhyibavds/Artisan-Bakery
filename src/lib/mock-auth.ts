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

// Store sessions in sessionStorage
const MOCK_SESSION_KEY = 'mock_auth_session';

// Mock users stored locally (you can add more)
const MOCK_USERS: MockUser[] = [
  {
    id: 'user-1',
    email: 'eugenco578@gmail.com',
    password: 'password123', // Simple password for demo
    created_at: new Date().toISOString(),
    user_metadata: {
      firstName: 'Eugene',
      lastName: 'Wekesa'
    }
  },
  {
    id: 'user-2',
    email: 'charlie@gmail.com',
    password: 'password123',
    created_at: new Date().toISOString(),
    user_metadata: {
      firstName: 'Charlie',
      lastName: 'Harper'
    }
  },
  {
    id: 'user-3',
    email: 'walden@gmail.com',
    password: 'password123',
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
    const session = { user: newUser, token: `mock-token-${newUser.id}` };
    sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));

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
    const session = { user, token: `mock-token-${user.id}` };
    sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));

    return {
      data: { user, session },
      error: null
    };
  },

  signOut: async () => {
    sessionStorage.removeItem(MOCK_SESSION_KEY);
    return { error: null };
  },

  getCurrentUser: async () => {
    const sessionData = sessionStorage.getItem(MOCK_SESSION_KEY);
    if (!sessionData) {
      return { data: { user: null }, error: null };
    }

    const { user } = JSON.parse(sessionData);
    return { data: { user }, error: null };
  },

  getSession: async () => {
    const sessionData = sessionStorage.getItem(MOCK_SESSION_KEY);
    if (!sessionData) {
      return { data: { session: null }, error: null };
    }

    const session = JSON.parse(sessionData);
    return { data: { session }, error: null };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Check session on load
    const sessionData = sessionStorage.getItem(MOCK_SESSION_KEY);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      callback('SIGNED_IN', session);
    }

    // Return unsubscribe function
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    };
  }
};
