import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Settings, CheckCircle, AlertCircle, X } from 'lucide-react';
import { configureSupabase, getSupabaseStatus } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface SupabaseSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupabaseSetup({ isOpen, onClose }: SupabaseSetupProps) {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(getSupabaseStatus());

  useEffect(() => {
    setStatus(getSupabaseStatus());
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      configureSupabase(url, anonKey);
      setStatus(getSupabaseStatus());
      toast.success('Supabase configured successfully!');
      onClose();
    } catch (error) {
      toast.error('Invalid Supabase configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSetup = () => {
    // Demo configuration for quick testing
    setUrl('https://demo-bakery.supabase.co');
    setAnonKey('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-key-for-testing');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
              <Database className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Supabase Setup
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Status */}
          <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
            status.isConfigured 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
          }`}>
            {status.isConfigured ? (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            )}
            <div>
              <p className={`font-medium ${
                status.isConfigured 
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-yellow-800 dark:text-yellow-200'
              }`}>
                {status.isConfigured ? 'Supabase Connected' : 'Supabase Not Configured'}
              </p>
              <p className={`text-sm ${
                status.isConfigured 
                  ? 'text-green-600 dark:text-green-300'
                  : 'text-yellow-600 dark:text-yellow-300'
              }`}>
                {status.isConfigured 
                  ? `Connected to: ${status.url}`
                  : 'Using mock data for development'
                }
              </p>
            </div>
          </div>

          {/* Setup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supabase URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anon Key
              </label>
              <textarea
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleQuickSetup}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Demo Setup
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Configuring...' : 'Configure'}
              </button>
            </div>
          </form>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              How to get your Supabase credentials:
            </h3>
            <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>1. Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">supabase.com</a></li>
              <li>2. Create a new project or select existing one</li>
              <li>3. Go to Settings → API</li>
              <li>4. Copy the URL and anon/public key</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}