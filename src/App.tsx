import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Order from './pages/Order';
import Blog from './pages/Blog';
import Events from './pages/Events';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/order" element={<Order />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;