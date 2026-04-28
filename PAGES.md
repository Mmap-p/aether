# ÆTHER — Complete Page Map

## SURFACE 1: MARKETING SITE (public)

### / (Homepage)
Purpose: Convert visitors to signups
Sections:
  - Hero: Full viewport, animated star field, ÆTHER logo, tagline, 
    two CTAs (Join Free, See Features), live stat counter (X observers, 
    Y objects logged, Z papers discussed)
  - Social proof strip: Logos or names of notable early members
  - Feature showcase: 3 panels — Social, Tools, Community
  - Live feed preview: 3-4 sample posts (static, beautiful)
  - Pricing table: Free vs Pro vs Institution
  - Founding member callout: Limited spots, apply here
  - Footer: Links, social, legal

### /pricing
Purpose: Full pricing detail, FAQ, comparison table

### /about
Purpose: Mission statement, team (just founder for now), 
the why behind ÆTHER, press kit link

### /blog
Purpose: SEO content — space events, platform updates, science explainers

### /blog/[slug]
Purpose: Individual blog post

### /auth/login
Purpose: Sign in with Google or email/password

### /auth/signup  
Purpose: Create account, then redirects to /onboarding

## SURFACE 2: USER DASHBOARD (post-login)

### /onboarding
Purpose: New user setup
Steps: Pick your role → Select interest topics → Add location + 
telescope → Follow 5 suggested people → First post prompt

### /feed
Purpose: Main social feed — the home screen
Left: Sidebar navigation
Centre: Feed (infinite scroll, mixed post types)
Right: Sky Tonight panel (next 3 events from user location), 
Suggested people, Trending objects

### /discover
Purpose: Explore beyond your follows
Tabs: Trending | New Members | Top Observers | Near You | By Object

### /explore
Purpose: Browse by catalog object
Search any Messier/NGC/IC ID → see all posts tagged to it → 
object data from SIMBAD API → who follows this object

### /tools
Purpose: Hub landing for all SaaS tools
Grid of tool cards: ISS Tracker, Sky Events, Solar System, 
Space Weather, APOD, ArXiv Feed, Observation Planner (Pro)

### /tools/iss-tracker
Purpose: Live ISS position
Leaflet map with live marker, coordinates panel, next pass 
predictor for user location, people currently on ISS

### /tools/sky-events
Purpose: Celestial events calendar
Next 90 days, filter by type (eclipse/conjunction/meteor shower/
opposition), add to personal calendar, share as sky alert

### /tools/solar-system
Purpose: Interactive 3D solar system
spacekit embed, click any body for data, current positions, 
orbital mechanics data from JPL

### /tools/space-weather
Purpose: Live space weather dashboard
Kp index, solar wind speed and density, X-ray flux, 
aurora probability by latitude, NOAA alerts

### /tools/apod
Purpose: NASA Astronomy Picture of the Day
Today's image full screen, searchable archive back to 1995, 
share directly to feed as post

### /tools/arxiv
Purpose: Latest astrophysics papers
Filter by category (Exoplanets, Cosmology, High Energy, etc.), 
save paper, share to feed as paper_share post

### /tools/observation-planner (PRO ONLY)
Purpose: Plan tonight's observing session
Input: location + telescope + available time
Output: ranked list of optimal targets, rise/set times, 
sky conditions forecast, difficulty rating

### /profile/[id]
Purpose: User profile page
Header: avatar, name, badge, role, bio, stats, follow button
Tabs: Posts | Observations | Collections | Gear
Observation grid (Instagram-style tiled)
Sky map showing all observed objects
Messier tracker showing completion
Streak counter

### /settings
Purpose: Account settings hub
Sub-pages: Account (name, bio, username) | 
Notifications (what to receive) | 
Subscription (current plan, upgrade/downgrade)

## SURFACE 3: ADMIN DASHBOARD (/admin — founder only)

### /admin
Stats: Total users, DAU, MAU, new signups today, 
pro subscribers, MRR, API health status

### /admin/users
Full user table, search, filter by role/tier, 
ban/unban, grant founding member badge, 
manually upgrade to pro

### /admin/posts
All posts feed with moderation controls, 
report queue, delete, flag, pin globally

### /admin/reports
User-submitted reports, resolve/dismiss, 
ban triggered from here

### /admin/revenue
MRR chart, subscriber counts by tier, 
churn rate, affiliate payouts pending

### /admin/api-health
Live status of all 7 external APIs, 
response time, last successful call, 
error rate

### /admin/announcements
Create platform-wide notifications 
sent to all users

## SURFACE 4: AFFILIATE DASHBOARD (/affiliate)

### /affiliate
Overview: total clicks, conversions, earnings, 
payout pending, personal referral link, share tools

### /affiliate/links
All referral links created, performance per link, 
UTM builder for campaign tracking

### /affiliate/earnings
Earnings history, commission breakdown per conversion, 
monthly totals chart

### /affiliate/payouts
Payout history, request payout (min threshold $50), 
payment method setup

### /affiliate/assets
Downloadable creative assets: banners, badges, 
copy templates, brand guidelines
