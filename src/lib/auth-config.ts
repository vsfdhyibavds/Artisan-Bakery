export const AUTH_CONFIG = {
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    inactivityTimeout: 30 * 60 * 1000, // 30 minutes
  },
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    minPasswordLength: 8,
  },
  twoFactor: {
    issuer: "Artisan Bakery",
    algorithm: "SHA1",
    digits: 6,
    period: 30
  }
} as const;
