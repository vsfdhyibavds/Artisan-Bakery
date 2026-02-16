/**
 * Sentry Error Tracking Configuration
 * Captures and reports errors in production
 * Optional: Only active if Sentry package is installed and DSN is configured
 */

let Sentry: any = null;

// Try to load Sentry if available
try {
  Sentry = require('@sentry/react');
} catch {
  // Sentry not installed, that's okay - error tracking will be disabled
}

export const initializeSentry = () => {
  if (!Sentry) {
    console.log('Sentry not installed. Error tracking disabled. Run: npm install @sentry/react @sentry/tracing');
    return;
  }

  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDsn) {
    console.warn('Sentry DSN not configured in VITE_SENTRY_DSN. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    beforeSend(event: any, hint: any) {
      // Filter out certain errors
      if (event.exception) {
        const error = hint.originalException;
        // Don't send network errors in development
        if (import.meta.env.MODE === 'development' && error instanceof Error && error.message.includes('fetch')) {
          return null;
        }
      }
      return event;
    },
  });

  console.log('✅ Sentry initialized for error tracking');
};

export const captureException = (error: any, context?: Record<string, any>) => {
  if (!Sentry) return;
  if (context) {
    Sentry.captureException(error, { extra: context });
  } else {
    Sentry.captureException(error);
  }
};

export const captureMessage = (message: string, level: 'fatal' | 'error' | 'warning' | 'info' = 'error') => {
  if (!Sentry) return;
  Sentry.captureMessage(message, level);
};

export const setUserContext = (userId: string, email?: string, username?: string) => {
  if (!Sentry) return;
  Sentry.setUser({
    id: userId,
    email,
    username,
  });
};

export const clearUserContext = () => {
  if (!Sentry) return;
  Sentry.setUser(null);
};

export default Sentry;
