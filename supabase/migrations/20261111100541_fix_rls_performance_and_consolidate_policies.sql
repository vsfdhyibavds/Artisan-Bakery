-- =====================================================
-- Performance: Fix RLS auth.uid() initplan, FK indexes,
-- and consolidate duplicate permissive policies
-- =====================================================

-- 1. Add missing foreign key indexes
CREATE INDEX IF NOT EXISTS idx_custom_cakes_order_item_id ON custom_cakes(order_item_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_customer_id ON event_registrations(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_customer_id ON testimonials(customer_id);

-- 2. Replace auth.uid() with (select auth.uid()) in all RLS policies
--    This caches the value once per statement instead of per-row.

-- customers
ALTER POLICY "Users can view own customer data" ON customers
  USING ((select auth.uid()) = id);

ALTER POLICY "Users can update own customer data" ON customers
  USING ((select auth.uid()) = id);

ALTER POLICY "Users can insert own customer data" ON customers
  WITH CHECK ((select auth.uid()) = id);

-- orders
ALTER POLICY "Users can view own orders" ON orders
  USING (customer_id = (select auth.uid()));

ALTER POLICY "Users can create own orders" ON orders
  WITH CHECK (customer_id = (select auth.uid()));

ALTER POLICY "Users can update own orders" ON orders
  USING (customer_id = (select auth.uid()));

-- order_items
ALTER POLICY "Users can view own order items" ON order_items
  USING (order_id IN (
    SELECT orders.id FROM orders
    WHERE orders.customer_id = (select auth.uid())
  ));

ALTER POLICY "Users can create own order items" ON order_items
  WITH CHECK (order_id IN (
    SELECT orders.id FROM orders
    WHERE orders.customer_id = (select auth.uid())
  ));

-- custom_cakes
ALTER POLICY "Users can view own custom cakes" ON custom_cakes
  USING (order_item_id IN (
    SELECT oi.id FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.customer_id = (select auth.uid())
  ));

ALTER POLICY "Users can create own custom cakes" ON custom_cakes
  WITH CHECK (order_item_id IN (
    SELECT oi.id FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE o.customer_id = (select auth.uid())
  ));

-- testimonials
ALTER POLICY "Users can create own testimonials" ON testimonials
  WITH CHECK (customer_id = (select auth.uid()));

-- event_registrations
ALTER POLICY "Users can view own event registrations" ON event_registrations
  USING (customer_id = (select auth.uid()));

ALTER POLICY "Users can create own event registrations" ON event_registrations
  WITH CHECK (customer_id = (select auth.uid()));

-- product_reviews
ALTER POLICY "Anyone can read approved reviews" ON product_reviews
  USING (is_approved = true OR auth.uid() = customer_id);

ALTER POLICY "Customers can create reviews" ON product_reviews
  WITH CHECK ((select auth.uid()) = customer_id);

ALTER POLICY "Customers can update own reviews" ON product_reviews
  USING ((select auth.uid()) = customer_id)
  WITH CHECK ((select auth.uid()) = customer_id);

ALTER POLICY "Customers can delete own reviews" ON product_reviews
  USING ((select auth.uid()) = customer_id);

-- 3. Consolidate duplicate permissive UPDATE policies on orders
--    Merge "Admins can update orders" and "Users can update own orders" into one
DROP POLICY "Admins can update orders" ON orders;
DROP POLICY "Users can update own orders" ON orders;
CREATE POLICY "Users or admins can update orders" ON orders
  FOR UPDATE TO authenticated
  USING (customer_id = (select auth.uid()) OR public.is_admin())
  WITH CHECK (customer_id = (select auth.uid()) OR public.is_admin());

-- 4. Consolidate duplicate permissive DELETE policies on product_reviews
--    Merge "Admins can delete any review" and "Customers can delete own reviews" into one
DROP POLICY "Admins can delete any review" ON product_reviews;
DROP POLICY "Customers can delete own reviews" ON product_reviews;
CREATE POLICY "Users or admins can delete reviews" ON product_reviews
  FOR DELETE TO authenticated
  USING ((select auth.uid()) = customer_id OR public.is_admin());