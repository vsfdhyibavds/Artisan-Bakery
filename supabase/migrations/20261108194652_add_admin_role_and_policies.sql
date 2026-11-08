/*
# Add admin role and admin-scoped write policies

## Overview
Adds an is_admin boolean column to the customers table so the app can
distinguish admin users. Creates a SECURITY DEFINER helper function that
checks the admin flag server-side, and uses it in RLS policies to gate
all admin write operations (INSERT/UPDATE/DELETE) on products, events,
blog_posts, testimonials, orders, order_items, and newsletter_subscribers.

## Schema changes
1. customers table: new column is_admin boolean NOT NULL DEFAULT false.
   Existing rows default to false (no data loss).

## New functions
2. is_admin() — SECURITY DEFINER, returns true if auth.uid() matches a
   customer row with is_admin = true. Used by all admin policies.
   Execution revoked from PUBLIC/anon, granted to authenticated only.

## Policy changes
### products (previously: SELECT-only to public)
- Keep existing SELECT (public read).
- Add INSERT/UPDATE/DELETE scoped to admins via is_admin().

### events (previously: SELECT-only to public)
- Keep existing SELECT (public read).
- Add INSERT/UPDATE/DELETE scoped to admins via is_admin().

### blog_posts (previously: SELECT-only to public)
- Keep existing SELECT (public read for published posts).
- Add INSERT/UPDATE/DELETE scoped to admins via is_admin().

### newsletter_subscribers (previously: INSERT-only to public)
- Keep existing INSERT (anyone can subscribe).
- Add SELECT/DELETE scoped to admins via is_admin().

### testimonials
- Keep existing SELECT (approved) and INSERT (own customer).
- Add UPDATE/DELETE scoped to admins via is_admin().

### orders / order_items
- Keep existing user-scoped policies.
- Add UPDATE/DELETE scoped to admins via is_admin().

## Security notes
- is_admin() runs as SECURITY DEFINER (owner privileges) so it can read
  the customers table regardless of caller RLS. It only reads, never writes.
- The admin flag itself can only be set by a database operator — no policy
  allows users to update their own is_admin column.
- All admin write policies check is_admin() in both USING and WITH CHECK.
*/

-- 1. Add is_admin column to customers
ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

-- 2. Create is_admin() helper function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM customers
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 3. Admin write policies for products
DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products"
  ON products FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products"
  ON products FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products"
  ON products FOR DELETE TO authenticated
  USING (public.is_admin());

-- 4. Admin write policies for events
DROP POLICY IF EXISTS "Admins can insert events" ON events;
CREATE POLICY "Admins can insert events"
  ON events FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update events" ON events;
CREATE POLICY "Admins can update events"
  ON events FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete events" ON events;
CREATE POLICY "Admins can delete events"
  ON events FOR DELETE TO authenticated
  USING (public.is_admin());

-- 5. Admin write policies for blog_posts
DROP POLICY IF EXISTS "Admins can insert blog posts" ON blog_posts;
CREATE POLICY "Admins can insert blog posts"
  ON blog_posts FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update blog posts" ON blog_posts;
CREATE POLICY "Admins can update blog posts"
  ON blog_posts FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete blog posts" ON blog_posts;
CREATE POLICY "Admins can delete blog posts"
  ON blog_posts FOR DELETE TO authenticated
  USING (public.is_admin());

-- 6. Admin write policies for testimonials
DROP POLICY IF EXISTS "Admins can update testimonials" ON testimonials;
CREATE POLICY "Admins can update testimonials"
  ON testimonials FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete testimonials" ON testimonials;
CREATE POLICY "Admins can delete testimonials"
  ON testimonials FOR DELETE TO authenticated
  USING (public.is_admin());

-- 7. Admin read/delete for newsletter_subscribers
DROP POLICY IF EXISTS "Admins can view newsletter subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins can view newsletter subscribers"
  ON newsletter_subscribers FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete newsletter subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins can delete newsletter subscribers"
  ON newsletter_subscribers FOR DELETE TO authenticated
  USING (public.is_admin());

-- 8. Admin update/delete for orders and order_items
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete orders" ON orders;
CREATE POLICY "Admins can delete orders"
  ON orders FOR DELETE TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update order items" ON order_items;
CREATE POLICY "Admins can update order items"
  ON order_items FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete order items" ON order_items;
CREATE POLICY "Admins can delete order items"
  ON order_items FOR DELETE TO authenticated
  USING (public.is_admin());