# ÆTHER — Firestore Schema

## Collection: users
Document ID: Firebase Auth UID
Fields:
  uid:              string
  email:            string
  displayName:      string
  username:         string (unique, lowercase, no spaces)
  avatarUrl:        string
  bio:              string (max 160 chars)
  role:             string (enum: astrophysicist | astronomer | astrologer | 
                    citizen_scientist | mission_analyst | observatory | educator)
  badgeTier:        string (enum: free | pro | institution | founding | verified)
  isVerified:       boolean
  isFoundingMember: boolean
  location:         string (city, country)
  coordinates:      { lat: number, lng: number } (for sky calculations)
  telescope:        string (primary instrument)
  website:          string
  orcidId:          string (for researchers)
  followersCount:   number
  followingCount:   number
  postCount:        number
  observationCount: number
  messierCompleted: number[] (array of completed Messier numbers)
  observationStreak:number
  lastObservation:  timestamp
  joinedAt:         timestamp
  updatedAt:        timestamp
  subscriptionStatus: string (enum: free | pro | institution)
  adFree:           boolean (true if pro or institution)
  affiliateCode:    string (their unique referral code)
  affiliateRef:     string (code of who referred them)

## Collection: posts
Document ID: auto
Fields:
  id:               string
  authorId:         string (ref: users)
  authorName:       string (denormalised)
  authorAvatar:     string (denormalised)
  authorBadge:      string (denormalised)
  type:             string (enum: observation | sky_alert | paper_share | 
                    discussion | equipment_log)
  text:             string (max 500 chars)
  imageUrls:        string[] (max 10 images)
  
  observationData:  {                   (only for type: observation)
    objectName:     string (e.g. "Orion Nebula")
    catalogId:      string (e.g. "M42", "NGC 1976")
    telescope:      string
    camera:         string
    exposure:       string
    location:       string
    coordinates:    { lat: number, lng: number }
    conditions:     string (enum: excellent|good|average|poor)
    skyDarkness:    number (Bortle scale 1-9)
    seeing:         number (1-5)
    observedAt:     timestamp
  }
  
  skyAlertData:     {                   (only for type: sky_alert)
    eventType:      string
    expiresAt:      timestamp           (24hr max)
    region:         string
    urgency:        string (enum: low | medium | high | critical)
  }
  
  paperShareData:   {                   (only for type: paper_share)
    arxivId:        string
    title:          string
    authors:        string
    abstract:       string
    url:            string
  }

  tags:             string[] (catalog IDs, topics, mission names)
  objectIds:        string[] (linked catalog IDs for object following)
  
  reactions:        {
    peer_review:    number
    replicate:      number
    cite:           number
    question:       number
    remarkable:     number
  }
  
  commentCount:     number
  viewCount:        number
  isLive:           boolean
  expiresAt:        timestamp (null unless sky_alert)
  createdAt:        timestamp
  updatedAt:        timestamp

## Collection: follows
Document ID: {followerId}_{followedId}
Fields:
  followerId:       string
  followedId:       string
  createdAt:        timestamp

## Collection: object_follows
Document ID: {userId}_{catalogId}
Fields:
  userId:           string
  catalogId:        string (e.g. "M42")
  objectName:       string
  createdAt:        timestamp

## Collection: reactions
Document ID: {postId}_{userId}_{reactionType}
Fields:
  postId:           string
  userId:           string
  reactionType:     string
  createdAt:        timestamp

## Collection: comments
Document ID: auto
Fields:
  postId:           string
  authorId:         string
  authorName:       string (denormalised)
  authorAvatar:     string (denormalised)
  text:             string (max 300 chars)
  createdAt:        timestamp

## Collection: notifications
Document ID: auto
Fields:
  userId:           string (recipient)
  type:             string (enum: reaction | comment | follow | 
                    sky_alert | object_post | citation | milestone)
  title:            string
  body:             string
  link:             string
  isRead:           boolean
  actorId:          string (who triggered it)
  actorName:        string (denormalised)
  actorAvatar:      string (denormalised)
  createdAt:        timestamp

## Collection: observations
Document ID: auto
Fields:
  userId:           string
  postId:           string (linked post if shared publicly)
  objectName:       string
  catalogId:        string
  telescope:        string
  camera:           string
  exposure:         string
  location:         string
  coordinates:      { lat: number, lng: number }
  conditions:       string
  skyDarkness:      number
  seeing:           number
  notes:            string
  imageUrls:        string[]
  isPublic:         boolean
  observedAt:       timestamp
  createdAt:        timestamp

## Collection: collections
Document ID: auto
Fields:
  userId:           string
  title:            string
  description:      string
  coverImageUrl:    string
  postIds:          string[]
  objectIds:        string[]
  isPublic:         boolean
  isPro:            boolean (only pro members can have unlimited)
  createdAt:        timestamp
  updatedAt:        timestamp

## Collection: affiliates
Document ID: userId
Fields:
  userId:           string
  code:             string (unique referral code)
  tier:             string (enum: ambassador | partner | institution)
  clicks:           number
  conversions:      number
  totalEarned:      number (in USD cents)
  pendingPayout:    number
  paidOut:          number
  payoutEmail:      string
  joinedAt:         timestamp

## Collection: sky_alerts (global collection, separate from posts)
Document ID: auto
Fields:
  title:            string
  type:             string
  description:      string
  region:           string[]
  coordinates:      { lat: number, lng: number }
  radius:           number (km)
  urgency:          string
  source:           string (enum: noaa | jpl | iss | manual)
  expiresAt:        timestamp
  createdAt:        timestamp
  createdBy:        string (admin UID or "system")
