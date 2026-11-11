-- Fix the last auth_rls_initplan: product_reviews SELECT policy
-- Wrap auth.uid() in (select ...) for per-statement caching
ALTER POLICY "Anyone can read approved reviews" ON product_reviews
  USING (is_approved = true OR (select auth.uid()) = customer_id);