# ÆTHER — Security Plan (Phase 5)

## Firebase Security Rules
Implement after all Firestore reads/writes are confirmed working.
Rules to write:
- Users can only write to their own user document
- Posts can be created by authenticated users only
- Posts can only be deleted by their author or admin
- Admin routes protected by custom claim: admin === true
- Affiliate data readable only by owner or admin
- Observations readable by owner only if isPublic === false

## API Route Protection (Vercel Edge Middleware)
- Rate limit all /api/* routes: 60 requests per minute per IP
- Block requests without valid session on authenticated routes
- Arcjet integration for bot detection on signup and post creation

## Environment Variable Rules
- Never commit .env.local to GitHub (already in .gitignore)
- Rotate NASA API key if ever exposed
- Firebase API keys are public-safe (restricted by domain in Firebase console)
- RevenueCat secret key server-side only (never NEXT_PUBLIC_)

## GitHub Security
- Enable GitHub secret scanning (automatic on all repos)
- Enable Dependabot for dependency vulnerability alerts
- Branch protection on main: require PR review before merge
