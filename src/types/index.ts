export type UserProfile = 'young' | 'family' | 'eco';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  day: number;
  profileType: UserProfile;
  encouragement: string;
  tips?: string;
  imageUrl?: string;
  validationType: 'checkmark' | 'photo' | 'text';
}

export interface User {
  id: string;
  profileType: UserProfile;
  startDate: string; // ISO string
  currentDay: number;
  completedChallenges: string[]; // IDs of completed challenges
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateEarned: string; // ISO string
}

export interface ChallengeCompletion {
  challengeId: string;
  completedAt: string; // ISO string
  validationData?: string; // Could be text input or photo URL
}

export interface AppState {
  user: User | null;
  challenges: Challenge[];
  completions: ChallengeCompletion[];
}