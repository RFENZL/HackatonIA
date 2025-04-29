import localforage from 'localforage';
import { User, Challenge, ChallengeCompletion, AppState, Badge } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { challenges } from '../data/challenges';

// Initialize localforage
localforage.config({
  name: 'circuit-court-app',
  storeName: 'user_data'
});

// Storage keys
const USER_KEY = 'user';
const COMPLETIONS_KEY = 'completions';

// Save user data
export const saveUser = async (user: User): Promise<void> => {
  await localforage.setItem(USER_KEY, user);
};

// Get user data
export const getUser = async (): Promise<User | null> => {
  return await localforage.getItem<User>(USER_KEY);
};

// Create a new user
export const createUser = async (profileType: string): Promise<User> => {
  const user: User = {
    id: uuidv4(),
    profileType: profileType as ('young' | 'family' | 'eco'),
    startDate: new Date().toISOString(),
    currentDay: 1,
    completedChallenges: [],
    badges: []
  };
  
  await saveUser(user);
  return user;
};

// Save challenge completion
export const saveCompletion = async (completion: ChallengeCompletion): Promise<void> => {
  const completions = await getCompletions();
  completions.push(completion);
  await localforage.setItem(COMPLETIONS_KEY, completions);
};

// Get all challenge completions
export const getCompletions = async (): Promise<ChallengeCompletion[]> => {
  const completions = await localforage.getItem<ChallengeCompletion[]>(COMPLETIONS_KEY);
  return completions || [];
};

// Add badge to user
export const addBadgeToUser = async (badge: Badge): Promise<User> => {
  const user = await getUser();
  if (!user) throw new Error('No user found');
  
  // Check if badge is already earned
  if (user.badges.some(b => b.id === badge.id)) {
    return user;
  }
  
  user.badges.push(badge);
  await saveUser(user);
  return user;
};

// Complete a challenge
export const completeChallenge = async (
  challengeId: string, 
  validationData?: string
): Promise<void> => {
  const user = await getUser();
  if (!user) throw new Error('No user found');
  
  if (user.completedChallenges.includes(challengeId)) {
    return; // Already completed
  }
  
  // Add to completed challenges
  user.completedChallenges.push(challengeId);
  
  // Record completion with timestamp
  const completion: ChallengeCompletion = {
    challengeId,
    completedAt: new Date().toISOString(),
    validationData
  };
  
  await saveCompletion(completion);
  
  // Update user's current day if needed
  const challenge = challenges.find(c => c.id === challengeId);
  if (challenge && challenge.day === user.currentDay && user.currentDay < 7) {
    user.currentDay += 1;
  }
  
  await saveUser(user);
};

// Check if user exists
export const checkUserExists = async (): Promise<boolean> => {
  const user = await getUser();
  return user !== null;
};

// Get full app state
export const getAppState = async (): Promise<AppState> => {
  const user = await getUser();
  const completions = await getCompletions();
  
  return {
    user,
    challenges,
    completions
  };
};

// Reset all data (for testing)
export const resetData = async (): Promise<void> => {
  await localforage.clear();
};