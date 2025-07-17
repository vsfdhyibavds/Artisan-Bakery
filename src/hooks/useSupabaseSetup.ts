import { useState, useEffect } from 'react';
import { getSupabaseStatus, configureSupabase } from '../lib/supabase';

export const useSupabaseSetup = () => {
  const [status, setStatus] = useState(getSupabaseStatus());
  const [isSetupOpen, setIsSetupOpen] = useState(false);

  useEffect(() => {
    // Check status periodically
    const interval = setInterval(() => {
      setStatus(getSupabaseStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const openSetup = () => setIsSetupOpen(true);
  const closeSetup = () => setIsSetupOpen(false);

  const configure = async (url: string, anonKey: string) => {
    try {
      configureSupabase(url, anonKey);
      setStatus(getSupabaseStatus());
      return true;
    } catch (error) {
      throw error;
    }
  };

  return {
    status,
    isSetupOpen,
    openSetup,
    closeSetup,
    configure
  };
};