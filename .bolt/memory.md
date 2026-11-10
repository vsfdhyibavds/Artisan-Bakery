# Project memory

## Product intent & audience

- E-commerce / product platform with product cards, star ratings, and customer reviews
- Customers can write reviews; reviews require admin approval before public display
- Stripe payments integration
- Supabase backend (auth, database, edge functions)

## Brand personality & voice

- Not yet explicitly defined; default to clean, professional, production-quality presentation

## Visual design & UX direction

- Vite + React + JSX + Tailwind CSS
- Icons from `lucide-react`
- Toast notifications via `react-hot-toast` (do not reintroduce `react-toastify`)
- Product cards include review forms and star-rating UI
- Target: production-worthy, non-cookie-cutter UI

## Decisions, constraints & rationale

- Do not install extra UI/icon/theme packages unless explicitly requested
- Server-only secrets (Stripe secret key, SMTP credentials) belong only in edge functions, never in the browser/static-site container
- Docker Compose has production and development configs; browser container runs nginx serving a static build
- Database uses Supabase migrations with RLS policies: public read for approved reviews, signed-in write for customers, admin-gated publishing
- Removed unused deps: `otpauth`, `react-toastify`, associated type defs
- Deleted orphaned scaffolding files: Supabase config panel, setup wizard, setup hook, auth-config module, raw `pg_dump` output (`db_cluster.sql`)

## Open questions & assumptions

- Brand color palette, typography, and spacing system not yet specified
- Full product catalog structure and data model beyond `product_reviews` not documented
- Admin interface/approval workflow for reviews: implementation details unclear
- Authentication provider details (Supabase auth vs custom) assumed via Supabase
- Deployment target and hosting specifics beyond Docker not confirmed