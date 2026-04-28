# ÆTHER — User Journeys

## Journey 1: New Visitor → Signed Up
1. Lands on homepage from Reddit/Product Hunt
2. Sees live stat counter (social proof)
3. Scrolls to feed preview — sees beautiful observation posts
4. Sees pricing — notes Free tier has all social features
5. Clicks Join Free
6. Google OAuth popup → account created
7. Redirected to /onboarding
8. Picks role: Astrophysicist
9. Selects topics: Exoplanets, Cosmology
10. Adds Mumbai location + 8" Dobsonian telescope
11. Follows 5 suggested people
12. Lands on /feed for first time
13. Sky Tonight panel shows Jupiter rising in 2 hours
14. They set a reminder. Addiction loop begins.

## Journey 2: Free User → Pro Upgrade
1. User tries to access /tools/observation-planner
2. Pro gate appears: glass panel, feature preview, price
3. They see the value (nobody else offers this beautifully)
4. They notice they've been seeing skippable ads for 2 weeks
5. $9/month feels reasonable to remove ads + get the planner
6. RevenueCat checkout (Stripe underneath)
7. Entitlement granted instantly — ad_free = true
8. Observation Planner unlocked
9. Verified badge option appears in settings

## Journey 3: User Posts First Observation
1. User observed M42 last night
2. Opens PostComposer from + button in nav
3. Selects type: Observation
4. Uploads image
5. Starts typing object name — M42 autocompletes with 
   full SIMBAD data (Orion Nebula, RA/Dec populated)
6. Adds gear, conditions, Bortle scale, seeing
7. Adds note about the night
8. Posts
9. Messier counter updates to 68/110
10. Notification appears when someone Peer Reviews it
11. They open app again to check. Loop continues.

## Journey 4: Affiliate Partner Setup
1. User with 5000 Instagram followers messages founder
2. Founder grants Partner tier in admin dashboard
3. Affiliate gets email with their unique code
4. They access /affiliate dashboard
5. Generate their link: aether.space?ref=username
6. Post about ÆTHER on their astronomy Instagram
7. 200 clicks → 20 signups → 4 go Pro
8. Affiliate earns 40% of $9 × 4 = $14.40/month recurring
9. Payout requested at $50 threshold via Rewardful

## Journey 5: Sky Alert Discovery
1. NOAA detects elevated aurora probability for latitude 55°N+
2. System auto-creates sky_alert in Firestore
3. All users with coordinates above 55°N get push notification
4. They open the app/site — Sky Alert banner at top of feed
5. 47 people are already posting observations
6. User goes outside, observes, comes back to post
7. Their post joins the live aurora thread
8. Non-subscribers see a skippable ad before viewing the thread
9. 3 of them upgrade to Pro because the experience is worth it
