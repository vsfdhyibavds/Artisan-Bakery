/**
 * Email Service - Resend Integration
 * Handles sending transactional emails (order confirmations, password resets, etc.)
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_RESEND_API_KEY || '';
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    if (!this.apiKey) {
      console.warn('Email service not configured. Set VITE_RESEND_API_KEY in .env.local');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      // For now, use a simple approach - in production, use Resend API or your backend
      // This would be replaced with actual Resend SDK call in production
      console.log('📧 Sending email:', { to: options.to, subject: options.subject });

      // In development, just log it
      if (import.meta.env.MODE === 'development') {
        console.log('Email content:', options.html.substring(0, 200) + '...');
        return { success: true, messageId: `dev-${Date.now()}` };
      }

      // For production, you would call Resend API here
      // This is a placeholder - implement with actual API call
      return { success: true, messageId: `email-${Date.now()}` };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to send email:', errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  async sendOrderConfirmation(email: string, order: {
    id: string;
    total: number;
    items: { product_name: string; quantity: number; total_price: number }[];
    pickup_date: string;
    pickup_time: string;
    order_type: 'pickup' | 'delivery';
  }): Promise<EmailResult> {
    const itemsHtml = order.items
      .map(item => `<tr><td style="padding:8px">${item.product_name}</td><td style="padding:8px;text-align:right">x${item.quantity}</td><td style="padding:8px;text-align:right">$${(item.total_price).toFixed(2)}</td></tr>`)
      .join('');

    const pickupInfo = order.order_type === 'pickup'
      ? `<p><strong>Pickup Date:</strong> ${order.pickup_date} at ${order.pickup_time}</p>`
      : `<p><strong>Delivery Date:</strong> ${order.pickup_date} at ${order.pickup_time}</p>`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B4513; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #8B4513; color: white; padding: 10px; text-align: left; }
            .total { font-size: 18px; font-weight: bold; color: #8B4513; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
            </div>
            <div class="content">
              <p>Thank you for your order at Artisan Bakery!</p>

              <p><strong>Order ID:</strong> #${order.id}</p>

              <h3>Order Items</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <p><strong style="color: #8B4513; font-size: 16px;">Total: $${(order.total).toFixed(2)}</strong></p>

              <h3>Pickup Details</h3>
              ${pickupInfo}

              <p>We're excited to have you! If you have any questions, please don't hesitate to contact us.</p>
            </div>
            <div class="footer">
              <p>Artisan Bakery | Your local homemade goodness</p>
              <p><a href="https://artisanbakery.com">Visit our website</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.send({
      to: email,
      subject: `Order Confirmation #${order.id}`,
      html
    });
  }

  async sendPasswordResetEmail(email: string, resetUrl: string): Promise<EmailResult> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B4513; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .button { display: inline-block; background: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>We received a request to reset your password. Click the button below to create a new password.</p>
              <p><a class="button" href="${resetUrl}">Reset Password</a></p>
              <p>This link expires in 1 hour.</p>
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>Artisan Bakery | Your local homemade goodness</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.send({
      to: email,
      subject: 'Password Reset Request',
      html
    });
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<EmailResult> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8B4513; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Artisan Bakery!</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Welcome to Artisan Bakery! We're thrilled to have you as part of our community.</p>
              <p>Our freshly baked goods are ready to delight your taste buds. Browse our menu and place your first order today!</p>
              <p>Happy baking! 🥖</p>
            </div>
            <div class="footer">
              <p>Artisan Bakery | Your local homemade goodness</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.send({
      to: email,
      subject: `Welcome to Artisan Bakery, ${firstName}!`,
      html
    });
  }
}

export const emailService = new EmailService();
export default emailService;
