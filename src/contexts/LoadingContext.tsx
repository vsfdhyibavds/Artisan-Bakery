/**
 * Global Loading State Context
 * Manages loading states for different operations across the app
 */

import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface LoadingContextType {
  addLoading: (key: string) => void;
  removeLoading: (key: string) => void;
  isLoading: (key: string) => boolean;
  isAnyLoading: () => boolean;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());

  const addLoading = useCallback((key: string) => {
    setLoadingKeys(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const removeLoading = useCallback((key: string) => {
    setLoadingKeys(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingKeys.has(key);
  }, [loadingKeys]);

  const isAnyLoading = useCallback(() => {
    return loadingKeys.size > 0;
  }, [loadingKeys]);

  const value: LoadingContextType = { addLoading, removeLoading, isLoading, isAnyLoading };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * Hook to use loading context
 * Usage: const { addLoading, removeLoading, isLoading } = useLoading();
 */
export function useLoading() {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

/**
 * Hook to track a specific loading operation
 * Usage: const { isLoading, setLoading } = useLoadingState('operation-name');
 */
export function useLoadingState(key: string) {
  const { addLoading, removeLoading, isLoading } = useLoading();

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      addLoading(key);
    } else {
      removeLoading(key);
    }
  }, [key, addLoading, removeLoading]);

  return {
    isLoading: isLoading(key),
    setLoading,
    start: () => addLoading(key),
    stop: () => removeLoading(key)
  };
}
