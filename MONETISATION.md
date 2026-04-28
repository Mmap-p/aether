# ÆTHER — Monetisation Architecture

## Tiers
FREE:        All social features. Basic tools. Ads shown. 5 collections max.
PRO:         $9/month. No ads. All tools. Unlimited collections. Verified badge.
INSTITUTION: $49/month. Team workspace. API access. Custom subdomain.

## Ad Strategy

### Free Member Ad Placements
Feed Interstitial:    Full screen, skippable after 5s, every 10th post
Rewarded Video:       Optional 30s watch to unlock Pro feature for 24hrs
Tool Banner:          Thin banner bottom of tool pages
ArXiv Banner:         Between every 5th paper card

### Implementation
Web: Google AdSense (apply after launch with real traffic)
Mobile (V2): Google AdMob
Gate check: RevenueCat entitlement ad_free checked on every ad component
If ad_free === true: render null (no ad shown, no API call made)
If ad_free === false: render ad component

### RevenueCat Entitlements
ad_free:            true for Pro + Institution
observation_planner: true for Pro + Institution  
unlimited_collections: true for Pro + Institution
api_access:         true for Institution only
team_workspace:     true for Institution only

## Affiliate Program (Rewardful)
Ambassador tier (any user): 30% commission, first year of subscription
Partner tier (1000+ followers): 40% recurring commission
Institution partner: 20% recurring on Institution referrals
Minimum payout: $50
Payout method: PayPal or bank transfer via Rewardful

## Revenue Targets
Month 3:  500 users, 25 Pro = $225/mo + ads $100 = $325/mo
Month 6:  2000 users, 100 Pro, 2 Institution = $998/mo + ads $400 = $1398/mo
Month 12: 10000 users, 500 Pro, 10 Institution = $5990/mo + ads $2000 = $7990/mo
