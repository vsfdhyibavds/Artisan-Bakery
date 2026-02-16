import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import CartIcon from './CartIcon';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'About', href: '/about' },
  { name: 'Order', href: '/order' },
  { name: 'Blog', href: '/blog' },
  { name: 'Events', href: '/events' },
];

interface HeaderProps {
  onAuthClick: (mode: 'signin' | 'signup') => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, customer, signOut } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const handleOrderNowClick = () => {
    navigate('/order');
  };

  const handleCartClick = () => {
    navigate('/order');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-800 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <a href="tel:+254787943878" className="hover:text-accent-300 transition-colors">
                (+254) 787943878
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <Link to="/contact" className="hover:text-accent-300 transition-colors">
                Community Road, Syokimau
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-accent-300">
              Fresh baked daily since 1985
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img
                src="/logo.svg"
                alt="Artisan Bakery Logo"
                className="h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    location.pathname === item.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <CartIcon onClick={handleCartClick} />

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {customer?.first_name || user?.user_metadata?.firstName || user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Account'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          My Orders
                        </Link>
                        {customer?.is_admin && (
                          <>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 font-medium"
                            >
                              📊 Admin Dashboard
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAuthClick('signin')}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onAuthClick('signup')}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={handleOrderNowClick}
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Order Now
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block text-base font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                      location.pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {user ? (
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Welcome, {customer?.first_name || 'User'}!
                    </p>
                    <Link
                      to="/profile"
                      className="block text-sm text-gray-700 dark:text-gray-300"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block text-sm text-gray-700 dark:text-gray-300"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => onAuthClick('signin')}
                      className="block w-full text-left text-sm text-gray-700 dark:text-gray-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => onAuthClick('signup')}
                      className="block w-full text-left text-sm text-gray-700 dark:text-gray-300"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                <button
                  onClick={handleOrderNowClick}
                  className="block w-full bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}