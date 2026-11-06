/**
 * Sentry Error Tracking Configuration
 * Captures and reports errors in production.
 * Sentry is optional: these functions are no-ops until @sentry/react is installed
 * and VITE_SENTRY_DSN is configured. This keeps the build working without the package.
 */

let Sentry: typeof import('@sentry/react') | null = null;

export async function loadSentry(): Promise<typeof import('@sentry/react') | null> {
  if (Sentry) return Sentry;
  try {
    const moduleName = '@sentry/react';
    Sentry = await import(/* @vite-ignore */ moduleName);
    return Sentry;
  } catch {
    return null;
  }
}

export const initializeSentry = async () => {
  const sentry = await loadSentry();
  if (!sentry) {
    console.log('Sentry not installed. Error tracking disabled. Run: npm install @sentry/react');
    return;
  }

  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDsn) {
    console.warn('Sentry DSN not configured in VITE_SENTRY_DSN. Error tracking disabled.');
    return;
  }

  sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
    beforeSend(event: any, hint: any) {
      if (event.exception) {
        const error = hint.originalException;
        if (import.meta.env.MODE === 'development' && error instanceof Error && error.message.includes('fetch')) {
          return null;
        }
      }
      return event;
    },
  });

  console.log('Sentry initialized for error tracking');
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
  Sentry.setUser({ id: userId, email, username });
};

export const clearUserContext = () => {
  if (!Sentry) return;
  Sentry.setUser(null);
};

export default Sentry;
