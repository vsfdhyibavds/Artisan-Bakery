import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const inquiryTypes = [
  'General Question',
  'Custom Order',
  'Catering Inquiry',
  'Event Booking',
  'Press/Media',
  'Feedback',
  'Other'
];

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      'Community Road',
      'Syokimau',
      'Nairobi, Kenya'
    ]
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      'Main: (+254) 7879438878-BAKE',
      'Catering: (+254) 7879438878-CAKE',
      'Events: (+254) 7879438878-EVENT'
    ]
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'hello@artisanbakery.com',
      'orders@artisanbakery.com',
      'events@artisanbakery.com'
    ]
  },
  {
    icon: Clock,
    title: 'Store Hours',
    details: [
      'Mon-Fri: 7:00 AM - 7:00 PM',
      'Saturday: 8:00 AM - 8:00 PM',
      'Sunday: 8:00 AM - 6:00 PM'
    ]
  }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Contact form submitted:', data);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.');

      reset();

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-200 max-w-3xl mx-auto"
          >
            We'd love to hear from you! Get in touch for orders, questions, or just to say hello.
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 dark:text-gray-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                  Send us a Message
                </h2>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-start gap-3"
                  role="status"
                >
                  <div className="text-2xl">✓</div>
                  <div>
                    <p className="font-semibold">Message Sent!</p>
                    <p className="text-sm">{submitMessage}</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3"
                  role="alert"
                >
                  <div className="text-2xl">✕</div>
                  <div>
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{submitMessage}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    id="name"
                    type="text"
                    aria-label="Full Name"
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      id="email"
                      type="email"
                      aria-label="Email Address"
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      id="phone"
                      type="tel"
                      aria-label="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="(+254) 712345678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    {...register('inquiryType', { required: 'Please select an inquiry type' })}
                    id="inquiryType"
                    aria-label="Type of Inquiry"
                    aria-required="true"
                    aria-describedby={errors.inquiryType ? 'inquiryType-error' : undefined}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.inquiryType && (
                    <p id="inquiryType-error" className="text-red-500 text-sm mt-1" role="alert">{errors.inquiryType.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    id="subject"
                    type="text"
                    aria-label="Message Subject"
                    aria-required="true"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Brief subject line"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={5}
                    aria-label="Your Message"
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Submit contact form"
                  aria-busy={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <iframe
                    title="Artisan Bakery Location"
                    src="https://www.google.com/maps?q=Community+Road,+Syokimau,+Kenya&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '16rem', borderRadius: '0.75rem' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Visit Our Bakery
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Located in the heart of Syokimau, we're easy to find and always happy to welcome visitors.
                  </p>
                  <button
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    onClick={() =>
                      window.open(
                        'https://www.google.com/maps/dir/?api=1&destination=Community+Road,+Syokimau,+Kenya',
                        '_blank'
                      )
                    }
                  >
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => window.open('https://calendly.com/your-bakery/consultation', '_blank')}
                  >
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-900 dark:text-white">Schedule a Consultation</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => window.open('tel:+254787943878')}
                  >
                    <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-900 dark:text-white">Request a Call Back</span>
                  </button>
                  <button
                    className="w-full flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => window.open('mailto:hello@artisanbakery.com?subject=Quote%20Request')}
                  >
                    <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-900 dark:text-white">Email Quote Request</span>
                  </button>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Response Time
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We typically respond to all inquiries within 24 hours during business days.
                  For urgent matters, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}