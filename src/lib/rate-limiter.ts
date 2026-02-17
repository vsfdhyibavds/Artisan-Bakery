/**
 * Rate Limiting Utility
 * Prevents API abuse and spam
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RateLimitStore {
  timestamp: number;
  count: number;
}

const DEFAULT_CONFIGS: Record<string, RateLimitConfig> = {
  api: { windowMs: 60000, maxRequests: 30 }, // 30 requests per minute
  subscribe: { windowMs: 3600000, maxRequests: 1 }, // 1 subscription per hour
  order: { windowMs: 5000, maxRequests: 1 }, // 1 order per 5 seconds
  contact: { windowMs: 60000, maxRequests: 3 }, // 3 contact forms per minute
  reset: { windowMs: 3600000, maxRequests: 3 }, // 3 password resets per hour
  login: { windowMs: 900000, maxRequests: 10 }, // 10 login attempts per 15 min
};

/**
 * Client-side rate limiter using localStorage
 * Server-side rate limiting should be implemented for production
 */
export class RateLimiter {
  private key: string;
  private config: RateLimitConfig;

  constructor(limitName: string, config?: RateLimitConfig) {
    this.key = `rateLimit_${limitName}`;
    this.config = config || DEFAULT_CONFIGS[limitName] || DEFAULT_CONFIGS.api;
  }

  /**
   * Check if request should be allowed
   */
  public isAllowed(): boolean {
    try {
      const store = this.getStore();
      const now = Date.now();

      // Window expired - reset
      if (now - store.timestamp > this.config.windowMs) {
        this.reset();
        return true;
      }

      // Within window - check count
      if (store.count < this.config.maxRequests) {
        this.increment();
        return true;
      }

      return false;
    } catch (error) {
      console.warn('Rate limiter error:', error);
      return true; // Allow request if rate limiter fails
    }
  }

  /**
   * Get remaining requests
   */
  public getRemaining(): number {
    try {
      const store = this.getStore();
      const now = Date.now();

      // Window expired
      if (now - store.timestamp > this.config.windowMs) {
        return this.config.maxRequests;
      }

      return Math.max(0, this.config.maxRequests - store.count);
    } catch (error) {
      console.warn('Rate limiter error:', error);
      return 0;
    }
  }

  /**
   * Get time until reset (milliseconds)
   */
  public getResetTime(): number {
    try {
      const store = this.getStore();
      const now = Date.now();
      const elapsed = now - store.timestamp;

      if (elapsed > this.config.windowMs) {
        return 0;
      }

      return this.config.windowMs - elapsed;
    } catch (error) {
      console.warn('Rate limiter error:', error);
      return 0;
    }
  }

  /**
   * Get reset time as seconds (useful for user display)
   */
  public getResetTimeSeconds(): number {
    return Math.ceil(this.getResetTime() / 1000);
  }

  /**
   * Reset the rate limiter
   */
  public reset(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.warn('Cannot reset rate limiter:', error);
    }
  }

  /**
   * Private: Get or initialize store
   */
  private getStore(): RateLimitStore {
    try {
      const stored = localStorage.getItem(this.key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Cannot read rate limit store:', error);
    }

    return {
      timestamp: Date.now(),
      count: 0
    };
  }

  /**
   * Private: Increment request count
   */
  private increment(): void {
    try {
      const store = this.getStore();
      store.count++;
      localStorage.setItem(this.key, JSON.stringify(store));
    } catch (error) {
      console.warn('Cannot increment rate limiter:', error);
    }
  }
}

/**
 * Hook-friendly rate limiter
 */
export const useRateLimit = (limitName: string, config?: RateLimitConfig) => {
  const limiter = new RateLimiter(limitName, config);

  return {
    isAllowed: () => limiter.isAllowed(),
    getRemaining: () => limiter.getRemaining(),
    getResetTime: () => limiter.getResetTimeSeconds(),
    reset: () => limiter.reset(),
    config: limiter['config']
  };
};

/**
 * Throttle async function with rate limiting
 */
export const withRateLimit = (fn: Function, limitName: string) => {
  const limiter = new RateLimiter(limitName);

  return async (...args: any[]) => {
    if (!limiter.isAllowed()) {
      const resetSecs = limiter.getResetTimeSeconds();
      throw new Error(
        `Too many requests. Please try again in ${resetSecs} second${resetSecs !== 1 ? 's' : ''}.`
      );
    }

    return fn(...args);
  };
};

export default RateLimiter;
