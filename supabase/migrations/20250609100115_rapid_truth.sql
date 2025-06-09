/*
  # Bakery Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `special_price` (decimal, nullable)
      - `category` (text)
      - `image_url` (text)
      - `ingredients` (text array)
      - `allergens` (text array)
      - `is_special` (boolean)
      - `is_available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `customers`
      - `id` (uuid, primary key, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text, nullable)
      - `city` (text, nullable)
      - `zip_code` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, references customers)
      - `order_type` (text) -- 'pickup' or 'delivery'
      - `status` (text) -- 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
      - `pickup_date` (date)
      - `pickup_time` (time)
      - `special_instructions` (text, nullable)
      - `subtotal` (decimal)
      - `tax` (decimal)
      - `delivery_fee` (decimal)
      - `total` (decimal)
      - `payment_status` (text) -- 'pending', 'paid', 'failed', 'refunded'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `product_id` (uuid, references products)
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `total_price` (decimal)
      - `customizations` (jsonb, nullable)
      - `created_at` (timestamp)

    - `custom_cakes`
      - `id` (uuid, primary key)
      - `order_item_id` (uuid, references order_items)
      - `size` (text)
      - `flavor` (text)
      - `frosting` (text)
      - `decorations` (text array)
      - `custom_message` (text, nullable)
      - `total_price` (decimal)
      - `created_at` (timestamp)

    - `testimonials`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, references customers)
      - `name` (text)
      - `content` (text)
      - `rating` (integer)
      - `image_url` (text, nullable)
      - `is_approved` (boolean)
      - `created_at` (timestamp)

    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `event_date` (date)
      - `event_time` (time)
      - `duration` (text)
      - `location` (text)
      - `price` (decimal)
      - `max_participants` (integer)
      - `current_participants` (integer)
      - `instructor` (text)
      - `difficulty` (text)
      - `category` (text)
      - `image_url` (text)
      - `includes` (text array)
      - `requirements` (text array, nullable)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `event_registrations`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `customer_id` (uuid, references customers)
      - `registration_date` (timestamp)
      - `payment_status` (text)
      - `created_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `author` (text)
      - `category` (text)
      - `tags` (text array)
      - `image_url` (text)
      - `read_time` (text)
      - `is_published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `is_active` (boolean)
      - `subscribed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  special_price decimal(10,2),
  category text NOT NULL,
  image_url text NOT NULL,
  ingredients text[] DEFAULT '{}',
  allergens text[] DEFAULT '{}',
  is_special boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text,
  city text,
  zip_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  order_type text NOT NULL CHECK (order_type IN ('pickup', 'delivery')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  pickup_date date NOT NULL,
  pickup_time time NOT NULL,
  special_instructions text,
  subtotal decimal(10,2) NOT NULL,
  tax decimal(10,2) NOT NULL,
  delivery_fee decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  customizations jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create custom_cakes table
CREATE TABLE IF NOT EXISTS custom_cakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id uuid REFERENCES order_items(id) ON DELETE CASCADE,
  size text NOT NULL,
  flavor text NOT NULL,
  frosting text NOT NULL,
  decorations text[] DEFAULT '{}',
  custom_message text,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  name text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  event_time time NOT NULL,
  duration text NOT NULL,
  location text NOT NULL,
  price decimal(10,2) NOT NULL,
  max_participants integer NOT NULL,
  current_participants integer DEFAULT 0,
  instructor text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  category text NOT NULL CHECK (category IN ('Workshop', 'Class', 'Special Event')),
  image_url text NOT NULL,
  includes text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  registration_date timestamptz DEFAULT now(),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, customer_id)
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  image_url text NOT NULL,
  read_time text NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_cakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO public
  USING (true);

-- Customers policies
CREATE POLICY "Users can view own customer data"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own customer data"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own customer data"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (customer_id = auth.uid());

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders WHERE customer_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders WHERE customer_id = auth.uid()
    )
  );

-- Custom cakes policies
CREATE POLICY "Users can view own custom cakes"
  ON custom_cakes FOR SELECT
  TO authenticated
  USING (
    order_item_id IN (
      SELECT oi.id FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.customer_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own custom cakes"
  ON custom_cakes FOR INSERT
  TO authenticated
  WITH CHECK (
    order_item_id IN (
      SELECT oi.id FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.customer_id = auth.uid()
    )
  );

-- Testimonials policies
CREATE POLICY "Approved testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Users can create own testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

-- Events policies
CREATE POLICY "Active events are viewable by everyone"
  ON events FOR SELECT
  TO public
  USING (is_active = true);

-- Event registrations policies
CREATE POLICY "Users can view own event registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Users can create own event registrations"
  ON event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  TO public
  USING (is_published = true);

-- Newsletter subscribers policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_special ON products(is_special);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();