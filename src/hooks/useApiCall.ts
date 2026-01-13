import { useState } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function useApiCall<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  onSuccess?: (data: T) => void,
  onError?: (error: string) => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const execute = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await apiFunction();
      if (result.success && result.data) {
        setSuccess(true);
        onSuccess?.(result.data);
        return result.data;
      } else {
        const errorMsg = result.error || 'An error occurred';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { loading, error, success, execute, reset };
}
