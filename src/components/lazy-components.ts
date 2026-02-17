/**
 * Dynamic Imports and Code Splitting Setup
 * This module demonstrates how to use lazy loading and code splitting
 * to reduce the initial bundle size below 500KB
 */

import { lazy } from 'react';

// Lazy load heavy pages that aren't needed on initial load
export const AdminDashboard = lazy(() =>
  import('./admin/AdminDashboard').then(m => ({ default: m.default }))
);

export const Blog = lazy(() =>
  import('../pages/Blog').then(m => ({ default: m.default }))
);

export const Events = lazy(() =>
  import('../pages/Events').then(m => ({ default: m.default }))
);

export const Catering = lazy(() =>
  import('../pages/Catering').then(m => ({ default: m.default }))
);

export const Contact = lazy(() =>
  import('../pages/Contact').then(m => ({ default: m.default }))
);

export const Careers = lazy(() =>
  import('../pages/Careers').then(m => ({ default: m.default }))
);

export const Press = lazy(() =>
  import('../pages/Press').then(m => ({ default: m.default }))
);

export const FAQ = lazy(() =>
  import('../pages/FAQ').then(m => ({ default: m.default }))
);

export const Returns = lazy(() =>
  import('../pages/Returns').then(m => ({ default: m.default }))
);

export const Shipping = lazy(() =>
  import('../pages/Shipping').then(m => ({ default: m.default }))
);

// Lazy load heavy admin components
export const ProductManagement = lazy(() =>
  import('./admin/ProductManagement').then(m => ({ default: m.default }))
);

export const CategoryManagement = lazy(() =>
  import('./admin/CategoryManagement').then(m => ({ default: m.default }))
);

export const InventoryManagement = lazy(() =>
  import('./admin/InventoryManagement').then(m => ({ default: m.default }))
);

export const AnalyticsDashboard = lazy(() =>
  import('./admin/AnalyticsDashboard').then(m => ({ default: m.default }))
);

export const BlogManagement = lazy(() =>
  import('./admin/BlogManagement').then(m => ({ default: m.default }))
);

export const EventManagement = lazy(() =>
  import('./admin/EventManagement').then(m => ({ default: m.default }))
);

export const NewsletterManagement = lazy(() =>
  import('./admin/NewsletterManagement').then(m => ({ default: m.default }))
);

// Lazy load heavy order components
export const CakeBuilder = lazy(() =>
  import('./order/CakeBuilder').then(m => ({ default: m.default }))
);

export const PaymentForm = lazy(() =>
  import('./order/PaymentForm').then(m => ({ default: m.default }))
);

export const OrderTracking = lazy(() =>
  import('./order/OrderTracking').then(m => ({ default: m.default }))
);

/**
 * Dynamic import helper for components that aren't immediately critical
 * Usage: This is already used via the lazy exports above
 */
export const useDynamicImport = (
  importFn: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const Component = lazy(importFn);
  return Component;
};

export default {
  AdminDashboard,
  Blog,
  Events,
  Catering,
  Contact,
  Careers,
  Press,
  FAQ,
  Returns,
  Shipping,
  ProductManagement,
  CategoryManagement,
  InventoryManagement,
  AnalyticsDashboard,
  BlogManagement,
  EventManagement,
  NewsletterManagement,
  CakeBuilder,
  PaymentForm,
  OrderTracking
};
