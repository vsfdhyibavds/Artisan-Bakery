import { useState } from 'react';
import { supabaseManager } from '../../lib/supabase-config';

export default function SupabaseConfigPanel() {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [status, setStatus] = useState(supabaseManager.getConfigurationStatus());
  const [message, setMessage] = useState('');

  const handleConfigure = () => {
    try {
      supabaseManager.configureSupabase(url, anonKey);
      setStatus(supabaseManager.getConfigurationStatus());
      setMessage('✅ Supabase configured successfully!');
    } catch (err: any) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Supabase Manual Configuration</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Supabase URL</label>
        <input
          className="border p-2 w-full rounded"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://xyzcompany.supabase.co"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Anon Public Key</label>
        <input
          className="border p-2 w-full rounded"
          type="text"
          value={anonKey}
          onChange={e => setAnonKey(e.target.value)}
          placeholder="paste your anon key here"
        />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        onClick={handleConfigure}
      >
        Save & Configure
      </button>
      {message && <div className="mt-4 text-sm">{message}</div>}
      <div className="mt-6 text-xs text-gray-500">
        <strong>Status:</strong> {status.isConfigured ? 'Configured' : 'Demo/Mock'}<br />
        <strong>Source:</strong> {status.source}<br />
        <strong>URL:</strong> {status.url}
      </div>
    </div>
  );
}
