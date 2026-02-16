/**
 * Runtime validation schemas using Zod
 * Validates data before submitting to database
 */

export const validationSchemas = {
  // Order validation
  order: {
    create: {
      customer_id: 'UUID',
      order_type: ['pickup', 'delivery'],
      pickup_date: 'future-date',
      pickup_time: 'time-format',
      total: 'positive-number',
      status: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
      payment_status: ['pending', 'paid', 'failed'],
      special_instructions: 'optional-string'
    }
  },

  // Customer validation
  customer: {
    create: {
      email: 'valid-email',
      firstName: 'string-min-1',
      lastName: 'string-min-1',
      phone: 'valid-phone',
      address: 'optional-string',
      city: 'optional-string',
      zipCode: 'optional-string'
    }
  },

  // Blog post validation
  blogPost: {
    create: {
      title: 'string-min-5',
      excerpt: 'string-min-10',
      content: 'string-min-50',
      category: 'string-min-1',
      author: 'string-min-1',
      image: 'valid-url',
      is_published: 'boolean'
    }
  },

  // Event validation
  event: {
    create: {
      title: 'string-min-3',
      description: 'string-min-10',
      event_date: 'future-date',
      event_time: 'time-format',
      location: 'string-min-1',
      price: 'positive-number',
      max_participants: 'positive-integer',
      instructor: 'string-min-1'
    }
  },

  // Newsletter subscription
  newsletter: {
    subscribe: {
      email: 'valid-email'
    }
  },

  // Password change
  passwordChange: {
    oldPassword: 'string-min-1',
    newPassword: 'string-min-6'
  }
};

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateDate = (date: string): boolean => {
  try {
    const dateObj = new Date(date);
    return dateObj > new Date() && !isNaN(dateObj.getTime());
  } catch {
    return false;
  }
};

export const validateTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const validatePositiveNumber = (num: any): boolean => {
  const parsed = parseFloat(num);
  return !isNaN(parsed) && parsed > 0;
};

export const validateOrderData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.order_type || !['pickup', 'delivery'].includes(data.order_type)) {
    errors.push('Invalid order type');
  }

  if (!data.pickup_date || !validateDate(data.pickup_date)) {
    errors.push('Pickup date must be in the future');
  }

  if (!data.pickup_time || !validateTime(data.pickup_time)) {
    errors.push('Invalid pickup time format');
  }

  if (!validatePositiveNumber(data.total)) {
    errors.push('Order total must be a positive number');
  }

  if (!data.customer_id || typeof data.customer_id !== 'string') {
    errors.push('Valid customer ID required');
  }

  return { valid: errors.length === 0, errors };
};

export const validateCustomerData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email address required');
  }

  if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length === 0) {
    errors.push('First name is required');
  }

  if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length === 0) {
    errors.push('Last name is required');
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Invalid phone number format');
  }

  if (data.zipCode && !/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
    errors.push('Invalid ZIP code format');
  }

  return { valid: errors.length === 0, errors };
};

export const validateBlogPostData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.length < 5) {
    errors.push('Title must be at least 5 characters');
  }

  if (!data.excerpt || data.excerpt.length < 10) {
    errors.push('Excerpt must be at least 10 characters');
  }

  if (!data.content || data.content.length < 50) {
    errors.push('Content must be at least 50 characters');
  }

  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (!data.author || typeof data.author !== 'string' || data.author.trim().length === 0) {
    errors.push('Author is required');
  }

  return { valid: errors.length === 0, errors };
};

export const validateEventData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!data.description || data.description.length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (!data.event_date || !validateDate(data.event_date)) {
    errors.push('Event date must be in the future');
  }

  if (!data.event_time || !validateTime(data.event_time)) {
    errors.push('Invalid event time format');
  }

  if (!data.location || typeof data.location !== 'string' || data.location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (!validatePositiveNumber(data.price)) {
    errors.push('Price must be a positive number');
  }

  if (!Number.isInteger(data.max_participants) || data.max_participants < 1) {
    errors.push('Max participants must be a positive integer');
  }

  return { valid: errors.length === 0, errors };
};

export const validatePasswordChange = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.oldPassword || typeof data.oldPassword !== 'string' || data.oldPassword.length === 0) {
    errors.push('Current password is required');
  }

  if (!data.newPassword || typeof data.newPassword !== 'string' || data.newPassword.length < 6) {
    errors.push('New password must be at least 6 characters');
  }

  if (data.oldPassword === data.newPassword) {
    errors.push('New password must be different from current password');
  }

  return { valid: errors.length === 0, errors };
};

export const validateNewsletterEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || !validateEmail(email)) {
    return { valid: false, error: 'Valid email address required' };
  }
  return { valid: true };
};
