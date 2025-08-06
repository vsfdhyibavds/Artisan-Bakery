import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(error.message);
    else setMessage('Password updated! You may now sign in.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSetPassword} className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Set New Password</h2>
        <input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">Update Password</button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}