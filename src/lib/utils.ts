import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface PasswordValidation {
  isValid: boolean;
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  message: string;
}

export function validatePassword(password: string): PasswordValidation {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= minLength;

  const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  let message = isValid ? 'Password meets all requirements' : 'Password must have:';
  if (!hasMinLength) message += '\n- At least 8 characters';
  if (!hasUpperCase) message += '\n- At least one uppercase letter';
  if (!hasLowerCase) message += '\n- At least one lowercase letter';
  if (!hasNumber) message += '\n- At least one number';
  if (!hasSpecialChar) message += '\n- At least one special character';

  return {
    isValid,
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
    message
  };
}

export interface EmailValidation {
  isValid: boolean;
  message: string;
}

export function validateEmail(email: string): EmailValidation {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    message: isValid ? 'Valid email address' : 'Please enter a valid email address'
  };
}

// Generate a fake captcha token for demonstration
// In production, this would integrate with a real CAPTCHA service
export async function generateCaptchaToken(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = Math.random().toString(36).substring(2);
      resolve(token);
    }, 500);
  });
}

export interface SecurityLog {
  timestamp: string;
  event: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  status: 'success' | 'failure';
  details?: Record<string, any>;
}

export function logSecurityEvent(log: SecurityLog): void {
  const logEntry = {
    ...log,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  // In production, send to your logging service
  console.log('Security Event:', logEntry);

  // Also store in localStorage for demo purposes
  const logs = JSON.parse(localStorage.getItem('securityLogs') || '[]');
  logs.push(logEntry);
  localStorage.setItem('securityLogs', JSON.stringify(logs));
}

export function isPasswordExpired(lastPasswordChange: string, expiryDays: number = 90): boolean {
  const lastChange = new Date(lastPasswordChange).getTime();
  const now = new Date().getTime();
  const daysSinceChange = (now - lastChange) / (1000 * 60 * 60 * 24);
  return daysSinceChange > expiryDays;
}

export function getDeviceFingerprint(): string {
  const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const languages = navigator.languages.join(',');
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
  const gpu = gl && debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';

  const components = [
    navigator.userAgent,
    screenInfo,
    timeZone,
    languages,
    gpu
  ].join('|');

  return btoa(components).replace(/[/+=]/g, '');
}export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}