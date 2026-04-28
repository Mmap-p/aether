import { Timestamp } from "firebase/firestore";

export type UserRole =
  | "astrophysicist"
  | "astronomer"
  | "astrologer"
  | "citizen_scientist"
  | "mission_analyst"
  | "observatory"
  | "educator";

export type BadgeTier = "free" | "pro" | "institution" | "founding" | "verified";

export type SubscriptionStatus = "free" | "pro" | "institution";

export interface UserCoordinates {
  lat: number;
  lng: number;
}

export interface AetherUser {
  uid: string;
  email: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  bio: string;
  role: UserRole;
  badgeTier: BadgeTier;
  isVerified: boolean;
  isFoundingMember: boolean;
  location: string;
  coordinates: UserCoordinates;
  telescope: string;
  website: string;
  orcidId: string;
  followersCount: number;
  followingCount: number;
  postCount: number;
  observationCount: number;
  messierCompleted: number[];
  observationStreak: number;
  lastObservation: Timestamp | null;
  joinedAt: Timestamp;
  updatedAt: Timestamp;
  subscriptionStatus: SubscriptionStatus;
  adFree: boolean;
  affiliateCode: string;
  affiliateRef: string;
}
