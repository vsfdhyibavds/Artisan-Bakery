import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthModal from './components/auth/AuthModal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Order from './pages/Order';
import Blog from './pages/Blog';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Catering from './pages/Catering';
import FAQ from './pages/FAQ';
import Press from './pages/Press';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminDashboard from './components/admin/AdminDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header onAuthClick={openAuthModal} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/order" element={<Order />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/press" element={<Press />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/shipping" element={<Shipping />} />
              {/* Admin Dashboard - requires authentication */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />

          {/* Auth Modal */}
          {authModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={closeAuthModal}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  onClick={closeAuthModal}
                  aria-label="Close"
                >
                  ×
                </button>
                <AuthModal />
              </div>
            </div>
          )}
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;