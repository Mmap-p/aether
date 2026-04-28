# ÆTHER — Master Context File
> Read this file completely before doing anything else in this project.
> This is the single source of truth for the entire build.

## What ÆTHER Is
ÆTHER is a space science social platform and SaaS tool hub built for 
astrophysicists, astronomers, astrologers, independent scientists, and 
professionals from NASA, ISRO, ESA, and similar institutions.

It is two things fused into one:
1. A SOCIAL NETWORK — Instagram-style but purpose-built for the space 
   science community. Observation posts, sky alerts, paper discussions, 
   astrophotography, scientific reactions, object-tagging.
2. A SAAS TOOL HUB — Beautiful tools built on free public APIs. ISS 
   tracker, sky events calendar, solar system explorer, space weather 
   dashboard, ArXiv research feed, APOD daily, observation planner.

## The 4 Surfaces
1. MARKETING SITE — public, SEO-optimised, converts visitors to signups
2. USER DASHBOARD — post-login social + tools experience  
3. ADMIN DASHBOARD — private ops panel for the founder
4. AFFILIATE DASHBOARD — for influencer and partner program

## The Audience (4 Layers)
Layer 1 — Professionals (NASA/ISRO/ESA workers) — gives credibility
Layer 2 — Serious amateurs (telescope owners, astrophotographers) — gives activity
Layer 3 — Science enthusiasts (space content consumers) — gives virality
Layer 4 — Astrology community — gives massive scale

## Tech Stack
- Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Backend: Firebase (Auth, Firestore, Storage, Functions)
- Deploy: Vercel (production) connected to GitHub main branch
- Payments: RevenueCat + Stripe
- Affiliate: Rewardful
- Security: Firebase Rules + Arcjet + Vercel Edge Middleware
- Charts: Recharts
- Maps: Leaflet.js
- Animations: Framer Motion
- State: Zustand
- Icons: Lucide React

## Free Data APIs Used
- NASA: api.nasa.gov (APOD, NEO, DONKI, Mars)
- JPL Horizons: ssd.jpl.nasa.gov/horizons (ephemeris, events)
- Open Notify: open-notify.org (ISS live position)
- NOAA SWPC: services.swpc.noaa.gov (space weather)
- ArXiv: export.arxiv.org/api (research papers)
- Solar System: api.le-systeme-solaire.net
- CelesTrak: celestrak.org (satellite TLE data)
- SIMBAD: simbad.cds.unistra.fr (star catalog)

## Monetisation
- FREE: All social features + basic tools + skipable video ads
- PRO ($9/mo): No ads + Observation Planner + Custom Sky Alerts + 
  Equipment tracker + VOTable export + Unlimited collections + Verified badge
- INSTITUTION ($49/mo): Team workspace + Bulk export + Custom subdomain + API access
- AFFILIATE: 30-40% commission on referred subscriptions via Rewardful
- ADS: Google AdSense (web) + AdMob (mobile, V2). Free users only. 
  Skippable video interstitials + banner ads on tool pages.

## Rules — Never Break These
1. Never use a paid API for a free tier feature
2. Every paid feature must justify its price and be unavailable elsewhere at this quality
3. Read this CONTEXT.md at the start of every single session
4. Never build on main branch directly — always use feature branches
5. TODO comments mark every location where functionality will be added
6. No ads ever shown to Pro or Institution members
7. Free APIs only until revenue justifies paid ones
8. Security is done last — after the product works

## Current Build Phase
Phase 0 — Scaffold complete. No UI built yet.
Next: Design all pages in Google Stitch, then build shells in Phase 1.

## What Has Been Built
- [x] Next.js 14 scaffold with TypeScript + Tailwind
- [x] Complete folder structure
- [x] All environment variable placeholders
- [x] All markdown documentation files
- [x] Git branching strategy set up
- [ ] Firebase project connected
- [ ] Any UI built
- [ ] Any logic wired
