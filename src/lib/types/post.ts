import { Timestamp } from "firebase/firestore";

export type PostType =
  | "observation"
  | "sky_alert"
  | "paper_share"
  | "discussion"
  | "equipment_log";

export type AlertUrgency = "low" | "medium" | "high" | "critical";

export type ObservationConditions = "excellent" | "good" | "average" | "poor";

export interface PostCoordinates {
  lat: number;
  lng: number;
}

export interface ObservationData {
  objectName: string;
  catalogId: string;
  telescope: string;
  camera: string;
  exposure: string;
  location: string;
  coordinates: PostCoordinates;
  conditions: ObservationConditions;
  skyDarkness: number;
  seeing: number;
  observedAt: Timestamp;
}

export interface SkyAlertData {
  eventType: string;
  expiresAt: Timestamp;
  region: string;
  urgency: AlertUrgency;
}

export interface PaperShareData {
  arxivId: string;
  title: string;
  authors: string;
  abstract: string;
  url: string;
}

export interface PostReactions {
  peer_review: number;
  replicate: number;
  cite: number;
  question: number;
  remarkable: number;
}

export interface AetherPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge: string;
  type: PostType;
  text: string;
  imageUrls: string[];
  observationData?: ObservationData;
  skyAlertData?: SkyAlertData;
  paperShareData?: PaperShareData;
  tags: string[];
  objectIds: string[];
  reactions: PostReactions;
  commentCount: number;
  viewCount: number;
  isLive: boolean;
  expiresAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
