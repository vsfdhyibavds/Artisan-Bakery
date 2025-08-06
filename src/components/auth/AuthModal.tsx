import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SignIn() {
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: window.location.origin + '/reset-password',
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password reset email sent. Check your inbox!');
    }
  };

  return (
    <>
      {/* ...your existing sign-in form... */}

      <p className="mt-2 text-sm">
        <button
          type="button"
          className="text-primary-600 hover:underline"
          onClick={() => setShowReset((v) => !v)}
        >
          Forgot Password?
        </button>
      </p>

      {showReset && (
        <form onSubmit={handleReset} className="mt-4 space-y-2">
          <label htmlFor="resetEmail" className="block text-sm font-medium">Enter your email address</label>
          <input
            id="resetEmail"
            type="email"
            required
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
          <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">Send Reset Link</button>
          {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
        </form>
      )}
    </>
  );
}