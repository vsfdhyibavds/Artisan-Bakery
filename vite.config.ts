import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',  // Use esbuild instead of terser (no external dependency)
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Code splitting strategy to reduce main bundle
        manualChunks: {
          // Vendor chunks
          'vendor-core': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          'vendor-ui': [
            'framer-motion',
            'react-hot-toast',
            'lucide-react',
          ],
          'vendor-forms': [
            'react-hook-form',
            '@tanstack/react-query',
          ],
          'vendor-state': [
            'zustand',
            'clsx',
            'tailwind-merge',
          ],
          'vendor-utils': [
            'date-fns',
          ],
          // Feature chunks
          'admin-pages': [
            './src/components/admin/AdminDashboard.tsx',
            './src/components/admin/ProductManagement.tsx',
            './src/components/admin/CategoryManagement.tsx',
            './src/components/admin/InventoryManagement.tsx',
            './src/components/admin/AnalyticsDashboard.tsx',
            './src/components/admin/BlogManagement.tsx',
            './src/components/admin/EventManagement.tsx',
            './src/components/admin/NewsletterManagement.tsx',
          ],
          'blog-events': [
            './src/pages/Blog.tsx',
            './src/pages/Events.tsx',
          ],
          'info-pages': [
            './src/pages/Careers.tsx',
            './src/pages/Catering.tsx',
            './src/pages/FAQ.tsx',
            './src/pages/Press.tsx',
            './src/pages/Returns.tsx',
            './src/pages/Shipping.tsx',
          ],
          'order-pages': [
            './src/pages/Order.tsx',
            './src/pages/Orders.tsx',
            './src/components/order/CakeBuilder.tsx',
            './src/components/order/PaymentForm.tsx',
            './src/components/order/OrderTracking.tsx',
          ],
          'user-pages': [
            './src/pages/Profile.tsx',
            './src/pages/Contact.tsx',
          ],
        },
        // Optimize chunk file names
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'react-hook-form',
      'react-hot-toast',
      'zustand',
      'date-fns',
      'clsx',
      'tailwind-merge',
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env,
  },
});