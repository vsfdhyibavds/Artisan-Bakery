/**
 * Enhanced validation utilities with accessibility support
 */

export interface FormValidationResult {
  isValid: boolean;
  error?: string;
  ariaDescribedBy?: string;
}

export function validateContactForm(data: any): FormValidationResult {
  if (!data.name?.trim()) {
    return { isValid: false, error: 'Name is required', ariaDescribedBy: 'name-error' };
  }
  if (data.name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters', ariaDescribedBy: 'name-error' };
  }

  if (!data.email?.trim()) {
    return { isValid: false, error: 'Email is required', ariaDescribedBy: 'email-error' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Please enter a valid email address', ariaDescribedBy: 'email-error' };
  }

  if (!data.message?.trim()) {
    return { isValid: false, error: 'Message is required', ariaDescribedBy: 'message-error' };
  }
  if (data.message.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters', ariaDescribedBy: 'message-error' };
  }

  return { isValid: true };
}

export function validatePhoneNumber(phone: string): FormValidationResult {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number', ariaDescribedBy: 'phone-error' };
  }
  return { isValid: true };
}

export function validateCateringForm(data: any): FormValidationResult {
  const contactValidation = validateContactForm({ name: data.name, email: data.email, message: data.eventType });
  if (!contactValidation.isValid) return contactValidation;

  if (!data.eventDate) {
    return { isValid: false, error: 'Event date is required', ariaDescribedBy: 'date-error' };
  }

  const eventDate = new Date(data.eventDate);
  const today = new Date();
  if (eventDate < today) {
    return { isValid: false, error: 'Event date must be in the future', ariaDescribedBy: 'date-error' };
  }

  if (!data.guestCount) {
    return { isValid: false, error: 'Guest count is required', ariaDescribedBy: 'guests-error' };
  }

  return { isValid: true };
}
