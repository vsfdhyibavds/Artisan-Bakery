export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = import.meta.env.PROD && !!import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (!this.isEnabled) return;

    if (typeof gtag !== 'undefined') {
      gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
        page_path: path,
        page_title: title
      });
    }
  }

  // Track custom events
  trackEvent(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    if (typeof gtag !== 'undefined') {
      gtag('event', event, properties);
    }

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', event, properties);
    }
  }

  // E-commerce tracking
  trackPurchase(orderId: string, value: number, items: any[]) {
    this.trackEvent('purchase', {
      transaction_id: orderId,
      value: value,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price
      }))
    });
  }

  // Track product views
  trackProductView(productId: string, productName: string, category: string, price: number) {
    this.trackEvent('view_item', {
      currency: 'USD',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        category: category,
        price: price
      }]
    });
  }

  // Track cart actions
  trackAddToCart(item: any) {
    this.trackEvent('add_to_cart', {
      currency: 'USD',
      value: item.price * item.quantity,
      items: [{
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price
      }]
    });
  }

  trackRemoveFromCart(item: any) {
    this.trackEvent('remove_from_cart', {
      currency: 'USD',
      value: item.price * item.quantity,
      items: [{
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price
      }]
    });
  }

  // Track user engagement
  trackSignUp(method: string) {
    this.trackEvent('sign_up', { method });
  }

  trackLogin(method: string) {
    this.trackEvent('login', { method });
  }

  trackSearch(searchTerm: string) {
    this.trackEvent('search', { search_term: searchTerm });
  }

  // Track business metrics
  trackNewsletterSignup() {
    this.trackEvent('newsletter_signup');
  }

  trackEventRegistration(eventId: string, eventName: string) {
    this.trackEvent('event_registration', {
      event_id: eventId,
      event_name: eventName
    });
  }

  trackContactForm(formType: string) {
    this.trackEvent('contact_form_submit', { form_type: formType });
  }
}

export const analytics = new Analytics();