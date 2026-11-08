/*
# Add admin role and admin-scoped write policies

## Overview
Adds an `is_admin` boolean column to the `customers` table so the app can
distinguish admin users. Creates SECURITY DEFINER helper functions that
check the admin flag server-side, and uses them in RLS policies to gate
all admin write operations (INSERT/UPDATE/DELETE) on products, events,
blog_posts, and newsletter_subscribers. Also fixes the
`increment_helpful_count` function to require authentication.

## Schema changes
1. `customers` table: new column `is_admin boolean NOT NULL DEFAULT false`.
   Existing rows default to `false` (no data loss).

## New functions
2. `is_admin()` — SECURITY DEFINER, returns true if `auth.uid()` matches a
   customer row with `is_admin = true`. Used by all admin policies.
   Execution revoked from PUBLIC/anon, granted to authenticated only.

3. `increment_helpful_count(review_id uuid)` — replaced to require
   authentication (checks `auth.uid() IS NOT NULL`). Execution revoked
   from anon so anonymous callers can no longer inflate counts.

## Policy changes
### products (previously: SELECT-only to public)
- Keep existing SELECT (public read).
- Add INSERT/UPDATE/DELETE scoped to admins via `is_admin()`.

### events (previously: SELECT-only to public)
- Keep existing SELECT (public read).
- Add INSERT/UPDATE/DELETE scoped to admins via `is_admin()`.

### blog_posts (previously: SELECT-only to public)
- Keep existing SELECT (public read for published posts).
- Add INSERT/UPDATE/DELETE scoped to admins via `is_admin()`.

### newsletter_subscribers (previously: INSERT-only to public)
- Keep existing INSERT (anyone can subscribe).
- Add SELECT/DELETE scoped to admins via `is_admin()`.

### testimonials
- Keep existing SELECT (approved) and INSERT (own customer).
- Add UPDATE/DELETE scoped to admins via `is_admin()`.

### order_items / custom_cakes / event_registrations
- Keep existing user-scoped policies.
- Add UPDATE/DELETE scoped to admins via `is_admin()`.

## Security notes
- The `is_admin()` function runs as SECURITY DEFINER (owner privileges)
  so it can read the `customers` table regardless of the caller's RLS.
  It only reads, never writes. The admin flag itself can only be set by
  a database operator (no policy allows users to update their own
  `is_admin` column).
- All admin write policies check `is_admin()` in both USING and WITH CHECK.
- `is_admin()` is not callable by the anon role.
*/