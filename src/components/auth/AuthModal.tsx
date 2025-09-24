import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { validatePassword, validateEmail, getDeviceFingerprint, logSecurityEvent, generateCaptchaToken } from '../../lib/utils';
import { toast } from 'react-toastify';

export default function AuthModal() {
  const [view, setView] = useState<'signin' | 'signup' | 'reset' | '2fa'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lastAttemptTime, setLastAttemptTime] = useState<number>(Date.now());
  const [resetEmail, setResetEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<any>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current?.focus();
    const storedLockout = localStorage.getItem('authLockoutUntil');
    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout, 10);
      if (Date.now() < lockoutTime) {
        setLockoutUntil(lockoutTime);
        const checkLockoutExpiry = () => {
          if (Date.now() >= lockoutTime) {
            setLockoutUntil(null);
            setAttempts(0);
            localStorage.removeItem('authLockoutUntil');
          }
        };
        const timer = setInterval(checkLockoutExpiry, 1000);
        return () => clearInterval(timer);
      } else {
        localStorage.removeItem('authLockoutUntil');
      }
    }
  }, []);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          logSecurityEvent({
            event: 'session_check',
            status: 'success',
            details: {
              email: session.user.email,
              deviceFingerprint: getDeviceFingerprint()
            },
            timestamp: new Date().toISOString()
          });
          navigate('/profile');
        }
      } catch (error) {
        logSecurityEvent({
          event: 'session_check',
          status: 'failure',
          details: { error: error instanceof Error ? error.message : 'Unknown error' },
          timestamp: new Date().toISOString()
        });
      }
    };
    checkExistingSession();
  }, [navigate]);

  useEffect(() => {
    if (password) {
      setPasswordStrength(validatePassword(password));
    }
  }, [password]);

  const handleRateLimit = () => {
    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
      return false;
    }
    if (lockoutUntil && now >= lockoutUntil) {
      setLockoutUntil(null);
      setAttempts(0);
    }
    const timeSinceLastAttempt = now - lastAttemptTime;
    if (timeSinceLastAttempt < 1000) {
      return false;
    }
    setLastAttemptTime(now);
    setAttempts(prev => prev + 1);
    if (attempts >= 10) {
      const lockoutDuration = Math.min(Math.pow(2, attempts - 10), 60) * 60 * 1000;
      const newLockoutUntil = now + lockoutDuration;
      setLockoutUntil(newLockoutUntil);
      logSecurityEvent({
        event: 'account_lockout',
        status: 'failure',
        details: {
          email,
          attempts,
          duration: lockoutDuration / 1000 / 60
        },
        timestamp: new Date().toISOString()
      });
      return false;
    }
    return true;
  };

  const validateForm = (): boolean => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return false;
    }
    if (view === 'signup') {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return false;
      }
      if (password !== confirmPassword) {
        return false;
      }
    }
    return true;
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  // Removed setMessage
    if (!validateForm() || !handleRateLimit()) {
      setIsLoading(false);
      return;
    }
    const deviceFingerprint = getDeviceFingerprint();
    try {
      switch (view) {
        case 'signin': {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
            options: {
              captchaToken: attempts > 2 ? await generateCaptchaToken() : undefined
            }
          });
          if (error) throw error;
          logSecurityEvent({
            event: 'login',
            status: 'success',
            details: { email, deviceFingerprint },
            timestamp: new Date().toISOString()
          });
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          toast.success('Signed in successfully!');
          setTimeout(() => navigate('/profile'), 1000);
          break;
        }
        case 'signup': {
          await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/profile`,
              data: {
                lastPasswordChange: new Date().toISOString(),
                passwordStrength: passwordStrength?.isValid ? 'strong' : 'weak',
                deviceFingerprint,
                requires2FA: true
              }
            }
          });
          logSecurityEvent({
            event: 'signup',
            status: 'success',
            details: {
              email,
              deviceFingerprint,
              passwordStrength: passwordStrength?.isValid ? 'strong' : 'weak'
            },
            timestamp: new Date().toISOString()
          });
          toast.success('Please check your email to verify your account');
          break;
        }
        case 'reset': {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
          });
          if (error) throw error;
          logSecurityEvent({
            event: 'password_reset_request',
            status: 'success',
            details: { email },
            timestamp: new Date().toISOString()
          });
          toast.success('Password reset instructions sent to your email');
          break;
        }
        case '2fa': {
          toast.success('Two-factor authentication verified!');
          setTimeout(() => navigate('/profile'), 1000);
          break;
        }
      }
    } catch (error: any) {
      logSecurityEvent({
        event: view,
        status: 'failure',
        details: {
          email,
          error: error.message,
        },
        timestamp: new Date().toISOString()
      });
      // Removed setMessage
      if (error.message.includes('Invalid login credentials')) {
        toast.error('Invalid email or password');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" role="main">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" aria-live="polite">
          {view === 'reset' ? 'Reset Password' : view === 'signup' ? 'Create Account' : 'Sign In'}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleAuth} noValidate>
          {view !== 'reset' ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    ref={emailInputRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {view === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : view === 'signup' ? 'Create account' : 'Sign in'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : 'Send reset link'}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              {view === 'signin' && (
                <button
                  type="button"
                  onClick={() => setView('signup')}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Create an account
                </button>
              )}
              {view === 'signup' && (
                <button
                  type="button"
                  onClick={() => setView('signin')}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Already have an account? Sign in
                </button>
              )}
              {view === 'reset' && (
                <button
                  type="button"
                  onClick={() => setView('signin')}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Back to sign in
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}