# Local Development Authentication

## Offline Mode Enabled ✅

Since your machine doesn't have internet access, the app automatically uses **Mock Authentication** for development.

### Test Credentials:

Use any of these accounts to sign in:

| Email                | Password    | Role  |
| -------------------- | ----------- | ----- |
| eugenco578@gmail.com | password123 | Admin |
| charlie@gmail.com    | password123 | User  |
| walden@gmail.com     | password123 | User  |

### How It Works:

1. **No Internet Required** - Mock auth is stored in your browser's sessionStorage
2. **Full Authentication Flow** - Sign in, sign up, sign out all work locally
3. **Admin Dashboard** - eugenco578@gmail.com has admin access to `/admin`
4. **User Profiles** - Each account has associated customer data in Postgres

### Production:

When you deploy with internet access, the app will automatically switch to **Cloud Supabase** authentication using the credentials in `.env.local`.

### Development Notes:

- Sessions persist while the browser tab is open
- Refresh the page to see if your session is maintained
- Try signing up with a new email (e.g., `test@example.com`)
- Mock data is stored in `src/lib/mock-auth.ts`
