import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(initialMode);
  const { signIn, signUp } = useAuthStore();
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  const signInForm = useForm<SignInFormData>();
  const signUpForm = useForm<SignUpFormData>();
  const resetForm = useForm<{ email: string }>();

  const handleSignIn = async (data: SignInFormData) => {
    const success = await signIn(data.email, data.password);
    if (success) {
      onClose();
      signInForm.reset();
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      signUpForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    const success = await signUp(data.email, data.password, {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      city: data.city,
      zipCode: data.zipCode,
    });

    if (success) {
      onClose();
      signUpForm.reset();
    }
  };

  if (!isOpen) return null;

  const handlePasswordReset = async (data: { email: string }) => {
    setResetLoading(true);
    setResetError(null);
    try {
      // Supabase password reset
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) {
        setResetError(error.message);
      } else {
        setResetEmailSent(true);
      }
    } catch (err: any) {
      setResetError('Failed to send reset email.');
    }
    setResetLoading(false);
  }

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
        className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {mode === 'signin' && (
              <motion.form
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={signInForm.handleSubmit(handleSignIn)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...signInForm.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{signInForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...signInForm.register('password', { required: 'Password is required' })}
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your password"
                    />
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{signInForm.formState.errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Sign In
                </button>

                <div className="flex flex-col items-center gap-2 mt-2">
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </motion.form>
            )}
            {mode === 'signup' && (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...signUpForm.register('firstName', { required: 'First name is required' })}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="First name"
                      />
                    </div>
                    {signUpForm.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      {...signUpForm.register('lastName', { required: 'Last name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Last name"
                    />
                    {signUpForm.formState.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...signUpForm.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...signUpForm.register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {signUpForm.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...signUpForm.register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        type="password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Password"
                      />
                    </div>
                    {signUpForm.formState.errors.password && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      {...signUpForm.register('confirmPassword', { required: 'Please confirm your password' })}
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Confirm password"
                    />
                    {signUpForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{signUpForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}
            {mode === 'reset' && (
              <motion.form
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={resetForm.handleSubmit(handlePasswordReset)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter your email to reset password
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...resetForm.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your email"
                      disabled={resetLoading || resetEmailSent}
                    />
                  </div>
                  {resetForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{resetForm.formState.errors.email.message}</p>
                  )}
                </div>
                {resetError && (
                  <p className="text-red-500 text-sm mt-1">{resetError}</p>
                )}
                {resetEmailSent ? (
                  <p className="text-green-600 text-sm mt-2">Password reset email sent! Check your inbox.</p>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    disabled={resetLoading}
                  >
                    {resetLoading ? 'Sending...' : 'Send Reset Email'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="w-full mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Back to Sign In
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}