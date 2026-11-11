-- Fix 1: update_updated_at_column has mutable search_path
-- Add SET search_path = public to lock it down
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix 2: increment_helpful_count is SECURITY DEFINER and callable by authenticated via /rest/v1/rpc/
-- The client never calls it directly; it's only used in RLS policies.
-- Revoke EXECUTE so it can't be called via the REST API.
REVOKE EXECUTE ON FUNCTION public.increment_helpful_count(uuid) FROM authenticated, anon;

-- Fix 3: is_admin is SECURITY DEFINER and callable by authenticated via /rest/v1/rpc/
-- The client never calls it directly; it's only used in RLS policies.
-- Revoke EXECUTE so it can't be called via the REST API.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM authenticated, anon;