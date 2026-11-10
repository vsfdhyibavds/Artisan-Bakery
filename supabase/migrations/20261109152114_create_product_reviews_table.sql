/*
# Create product_reviews table

## Overview
The product review feature (review form, review list, star ratings on
product cards) references a product_reviews table that was defined in a
migration file but never applied to the database. This migration creates
the table with proper RLS policies, grants, and a helpful-count function.

## New Tables
- product_reviews
  - id (uuid, primary key)
  - product_id (uuid, FK to products, ON DELETE CASCADE)
  - customer_id (uuid, FK to customers, ON DELETE SET NULL)
  - rating (integer, 1-5, NOT NULL)
  - title (text, NOT NULL)
  - content (text, NOT NULL)
  - is_verified_purchase (boolean, default false)
  - helpful_count (integer, default 0)
  - is_approved (boolean, default false — reviews require moderation)
  - created_at (timestamptz, default now())
  - updated_at (timestamptz, default now())

## Security
- RLS enabled on product_reviews.
- GRANT SELECT to anon, authenticated (public can read approved reviews).
- GRANT INSERT, UPDATE, DELETE to authenticated (own review management).
- SELECT policy: anyone can read approved reviews; authenticated users
  can also read their own unapproved reviews.
- INSERT policy: authenticated users can create reviews for themselves.
- UPDATE policy: users can update their own reviews.
- DELETE policy: users can delete their own reviews; admins can delete any.
- increment_helpful_count function: SECURITY DEFINER, requires auth,
  execution revoked from anon.

## Indexes
- idx_product_reviews_product_id (product_id)
- idx_product_reviews_customer_id (customer_id)
- idx_product_reviews_approved (is_approved)
*/

CREATE TABLE IF NOT EXISTS product_reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title text NOT NULL,
    content text NOT NULL,
    is_verified_purchase boolean NOT NULL DEFAULT false,
    helpful_count integer NOT NULL DEFAULT 0,
    is_approved boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_customer_id ON product_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_approved ON product_reviews(is_approved);

ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON product_reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON product_reviews TO authenticated;

DROP POLICY IF EXISTS "Anyone can read approved reviews" ON product_reviews;
CREATE POLICY "Anyone can read approved reviews"
  ON product_reviews FOR SELECT TO anon, authenticated
  USING (is_approved = true OR auth.uid() = customer_id);

DROP POLICY IF EXISTS "Customers can create reviews" ON product_reviews;
CREATE POLICY "Customers can create reviews"
  ON product_reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Customers can update own reviews" ON product_reviews;
CREATE POLICY "Customers can update own reviews"
  ON product_reviews FOR UPDATE TO authenticated
  USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Customers can delete own reviews" ON product_reviews;
CREATE POLICY "Customers can delete own reviews"
  ON product_reviews FOR DELETE TO authenticated
  USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Admins can delete any review" ON product_reviews;
CREATE POLICY "Admins can delete any review"
  ON product_reviews FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.increment_helpful_count(review_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  UPDATE product_reviews
  SET helpful_count = helpful_count + 1
  WHERE id = review_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.increment_helpful_count(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_helpful_count(uuid) TO authenticated;