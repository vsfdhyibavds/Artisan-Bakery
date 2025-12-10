import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  ChevronUp
} from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  products: [
    { name: 'Fresh Breads', href: '/menu#breads' },
    { name: 'Pastries', href: '/menu#pastries' },
    { name: 'Custom Cakes', href: '/menu#cakes' },
    { name: 'Catering', href: '/catering' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

export default function Footer() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Auto-scroll to top on mount
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-navigate with smooth scroll
  const handleNavigation = (href: string) => {
    const hash = href.split('#')[1];
    navigate(href.split('#')[0]);

    if (hash) {
      // Wait for navigation to complete, then scroll to element
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      scrollToTop();
    }

    setActiveSection(hash || null);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Stay Fresh with Our Newsletter
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new products, special offers, and baking tips
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" onClick={() => scrollToTop()} className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 p-2 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">Artisan Bakery</h2>
                <p className="text-sm text-gray-400">Fresh Baked Daily</p>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 max-w-md">
              Serving the community with fresh, artisanal baked goods since 1985.
              Made with love, traditional techniques, and the finest ingredients.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent-400" />
                <span className="text-gray-300">Community Road, Syokimau</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-400" />
                <span className="text-gray-300">(+254) 787943878</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-400" />
                <span className="text-gray-300">franklyours10@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-400" />
                <span className="text-gray-300">Mon-Fri: 7AM-7PM, Weekends: 8AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleNavigation(link.href)}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                    className={`text-gray-400 hover:text-white transition-colors text-left ${
                      activeSection && link.href.includes(activeSection) ? 'text-white' : ''
                    }`}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleNavigation(link.href)}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                    className={`text-gray-400 hover:text-white transition-colors text-left ${
                      activeSection && link.href.includes(activeSection) ? 'text-white' : ''
                    }`}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleNavigation(link.href)}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                    className={`text-gray-400 hover:text-white transition-colors text-left ${
                      activeSection && link.href.includes(activeSection) ? 'text-white' : ''
                    }`}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Scroll to Top */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}

              {/* Scroll to Top Button */}
              {showScrollTop && (
                <motion.button
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-white transition-colors ml-4 pl-4 border-l border-gray-700"
                  aria-label="Scroll to top"
                  title="Back to top"
                >
                  <ChevronUp className="w-6 h-6" />
                </motion.button>
              )}
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              <span>© 2025 Artisan Bakery. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}