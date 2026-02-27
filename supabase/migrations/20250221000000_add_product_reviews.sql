/*
# Add Product Reviews Table

1. New Tables
- `product_reviews`
- `id` (uuid, primary key)
- `product_id` (uuid, references products)
- `customer_id` (uuid, references customers, nullable for anonymous reviews)
- `rating` (integer, 1-5)
- `title` (text)
- `content` (text)
- `is_verified_purchase` (boolean)
- `helpful_count` (integer, default 0)
- `is_approved` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

2. Security
- Enable RLS on product_reviews
- Allow public read access to approved reviews
- Allow customers to create/edit own reviews
*/

-- Create product_reviews table
CREATE TABLE product_reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    product_id uuid NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    customer_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
    rating integer NOT NULL CHECK (
        rating >= 1
        AND rating <= 5
    ),
    title text NOT NULL,
    content text NOT NULL,
    is_verified_purchase boolean DEFAULT false,
    helpful_count integer DEFAULT 0,
    is_approved boolean DEFAULT false,
    created_at timestamp
    with
        time zone DEFAULT now(),
        updated_at timestamp
    with
        time zone DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_product_reviews_product_id ON product_reviews (product_id);

CREATE INDEX idx_product_reviews_customer_id ON product_reviews (customer_id);

CREATE INDEX idx_product_reviews_approved ON product_reviews (is_approved);

-- Enable RLS
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews" ON product_reviews FOR
SELECT USING (is_approved = true);

-- Policy: Customers can read all reviews (including their own unapproved)
CREATE POLICY "Customers can read their own reviews" ON product_reviews FOR
SELECT USING (
        auth.uid () = customer_id
        OR is_approved = true
    );

-- Policy: Customers can create reviews
CREATE POLICY "Customers can create reviews" ON product_reviews FOR
INSERT
WITH
    CHECK (auth.uid () = customer_id);

-- Policy: Customers can update their own reviews
CREATE POLICY "Customers can update own reviews" ON product_reviews FOR
UPDATE USING (auth.uid () = customer_id)
WITH
    CHECK (auth.uid () = customer_id);

-- Policy: Customers can delete their own reviews
CREATE POLICY "Customers can delete own reviews" ON product_reviews FOR DELETE USING (auth.uid () = customer_id);

-- Create function to update helpful count (for future implementation)
CREATE OR REPLACE FUNCTION increment_helpful_count(review_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE product_reviews
  SET helpful_count = helpful_count + 1
  WHERE id = review_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;