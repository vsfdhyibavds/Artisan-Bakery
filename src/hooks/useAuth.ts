import { useState, useCallback, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import * as OTPAuth from 'otpauth';
import { toast } from 'react-toastify';
import { supabase } from '../lib/supabase';
import { getDeviceFingerprint } from '../lib/utils';
import { AUTH_CONFIG } from '../lib/auth-config';

interface SecurityEvent {
  event: string;
  status: 'success' | 'failure';
  timestamp: number;
  details: Record<string, any>;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  lastActivity: number;
  deviceFingerprint: string | null;
  isAuthenticated: boolean;
  requires2FA: boolean;
  loginAttempts: number;
  lockoutUntil: number | null;
  view: 'signin' | 'signup' | 'reset' | '2fa';
}

interface TwoFactorResponse {
  success: boolean;
  qr?: string;
  error?: string;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    lastActivity: Date.now(),
    deviceFingerprint: getDeviceFingerprint(),
    isAuthenticated: false,
    requires2FA: false,
    loginAttempts: 0,
    lockoutUntil: null,
    view: 'signin'
  });
  const [loading, setLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout>();

  const logSecurityEvent = useCallback((
    event: string,
    status: 'success' | 'failure',
    details: Record<string, any>
  ): SecurityEvent => ({
    timestamp: Date.now(),
    event,
    status,
    details: { ...details, deviceFingerprint: state.deviceFingerprint }
  }), [state.deviceFingerprint]);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(undefined);
    }
  }, [inactivityTimer]);

  const startInactivityTimer = useCallback(() => {
    clearInactivityTimer();

    const timer = setTimeout(async () => {
      if (state.isAuthenticated) {
        logSecurityEvent('session_inactivity', 'failure', {
          userId: state.user?.id,
          lastActivity: state.lastActivity
        });
        await supabase.auth.signOut();
        setState(prev => ({
          ...prev,
          user: null,
          session: null,
          isAuthenticated: false
        }));
      }
    }, AUTH_CONFIG.session.inactivityTimeout);

    setInactivityTimer(timer);
  }, [state, clearInactivityTimer, logSecurityEvent]);

  const updateActivity = useCallback(() => {
    if (state.isAuthenticated) {
      setState(prev => ({
        ...prev,
        lastActivity: Date.now()
      }));
      startInactivityTimer();
    }
  }, [state.isAuthenticated, startInactivityTimer]);

  const checkSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const deviceFingerprint = getDeviceFingerprint();
        const storedFingerprint = localStorage.getItem('deviceFingerprint');

        if (storedFingerprint && storedFingerprint !== deviceFingerprint) {
          logSecurityEvent('device_change', 'failure', {
            userId: session.user.id,
            email: session.user.email,
            newDevice: deviceFingerprint,
            previousDevice: storedFingerprint
          });
          await supabase.auth.signOut();
          toast.error('Security alert: Unusual device activity detected');
          throw new Error('Suspicious device change detected');
        }

        const sessionStart = new Date(session.created_at).getTime();
        if (Date.now() - sessionStart > AUTH_CONFIG.session.maxAge) {
          logSecurityEvent('session_timeout', 'success', {
            userId: session.user.id,
            sessionDuration: Date.now() - sessionStart
          });
          await supabase.auth.signOut();
          toast.info('Session expired. Please sign in again.');
          throw new Error('Session expired');
        }

        localStorage.setItem('deviceFingerprint', deviceFingerprint);
        setState(prev => ({
          ...prev,
          user: session.user,
          session,
          lastActivity: Date.now(),
          deviceFingerprint,
          isAuthenticated: true
        }));
        startInactivityTimer();
      }
    } catch (error) {
      logSecurityEvent('session_check', 'failure', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      setState(prev => ({
        ...prev,
        user: null,
        session: null,
        isAuthenticated: false
      }));
    } finally {
      setLoading(false);
    }
  }, [startInactivityTimer, logSecurityEvent]);

  const handleAuthChange = useCallback(async (event: string, session: Session | null) => {
    if (session?.user) {
      const deviceFingerprint = getDeviceFingerprint();
      setState(prev => ({
        ...prev,
        user: session.user,
        session,
        deviceFingerprint,
        isAuthenticated: true,
        lastActivity: Date.now()
      }));
      startInactivityTimer();

      logSecurityEvent('auth_state_change', 'success', {
        event,
        userId: session.user.id,
        deviceFingerprint
      });
    } else {
      setState(prev => ({
        ...prev,
        user: null,
        session: null,
        isAuthenticated: false,
        deviceFingerprint: null
      }));
      clearInactivityTimer();
    }
    setLoading(false);
  }, [startInactivityTimer, clearInactivityTimer, logSecurityEvent]);

  const initiateTwoFactor = useCallback(async (email: string): Promise<TwoFactorResponse> => {
    try {
      const totp = new OTPAuth.TOTP({
        issuer: "Artisan Bakery",
        label: email,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: new OTPAuth.Secret({ size: 20 })
      });

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          totpSecret: totp.secret.base32,
          requires2FA: true
        }
      });

      if (updateError) throw updateError;

      logSecurityEvent('2fa_setup', 'success', { email });
      return { success: true, qr: totp.toString() };
    } catch (error) {
      logSecurityEvent('2fa_setup', 'failure', {
        email,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return { success: false, error: 'Failed to setup 2FA' };
    }
  }, [logSecurityEvent]);

  const verifyTwoFactor = useCallback(async (token: string): Promise<TwoFactorResponse> => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const totpSecret = user?.user_metadata?.totpSecret;
      if (!totpSecret) throw new Error('2FA not set up');

      const totp = new OTPAuth.TOTP({
        issuer: "Artisan Bakery",
        label: user.email!,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: totpSecret
      });

      const isValid = totp.validate({ token, window: 1 }) !== null;

      if (!isValid) {
        logSecurityEvent('2fa_verification', 'failure', {
          userId: user.id,
          email: user.email
        });
        return { success: false, error: 'Invalid 2FA token' };
      }

      logSecurityEvent('2fa_verification', 'success', {
        userId: user.id,
        email: user.email
      });
      return { success: true };
    } catch (error) {
      logSecurityEvent('2fa_verification', 'failure', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return { success: false, error: 'Failed to verify 2FA token' };
    }
  }, [logSecurityEvent]);

  useEffect(() => {
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      subscription.unsubscribe();
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearInactivityTimer();
    };
  }, [handleAuthChange, updateActivity, clearInactivityTimer, checkSession]);

  return {
    user: state.user,
    session: state.session,
    isAuthenticated: state.isAuthenticated,
    requires2FA: state.requires2FA,
    view: state.view,
    loading,
    setView: (view: AuthState['view']) => setState(prev => ({ ...prev, view })),
    updateActivity,
    initiateTwoFactor,
    verifyTwoFactor
  };
}
