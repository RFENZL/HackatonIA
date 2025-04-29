import { useState, useEffect, useCallback } from 'react';
import { AppState, User, Challenge, ChallengeCompletion, Badge, UserProfile } from '../types';
import { getAppState, saveUser, completeChallenge, createUser, addBadgeToUser } from '../utils/storage';
import { getChallengesByProfile, getChallengeById } from '../data/challenges';
import { getEarnedBadge } from '../data/badges';
import { format, addDays, isSameDay } from 'date-fns';

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    user: null,
    challenges: [],
    completions: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial state
  useEffect(() => {
    const loadAppState = async () => {
      try {
        setLoading(true);
        const appState = await getAppState();
        setState(appState);
      } catch (err) {
        setError('Failed to load app data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAppState();
  }, []);

  // Set up a user profile
  const setupUser = useCallback(async (profileType: UserProfile) => {
    try {
      setLoading(true);
      const newUser = await createUser(profileType);
      
      setState(prevState => ({
        ...prevState,
        user: newUser,
        challenges: getChallengesByProfile(profileType)
      }));
      
      return newUser;
    } catch (err) {
      setError('Failed to create user profile');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Complete a challenge
  const handleCompleteChallenge = useCallback(async (
    challengeId: string, 
    validationData?: string
  ) => {
    if (!state.user) return;
    
    try {
      setLoading(true);
      await completeChallenge(challengeId, validationData);
      
      // Check for badges
      const updatedUser = { ...state.user };
      updatedUser.completedChallenges.push(challengeId);
      
      // Update current day if needed
      const challenge = getChallengeById(challengeId);
      if (challenge && challenge.day === state.user.currentDay && state.user.currentDay < 7) {
        updatedUser.currentDay += 1;
      }
      
      // Check for earned badges
      const hasPhotoSubmission = state.completions.some(
        c => c.validationData && c.validationData.startsWith('data:')
      );
      
      const badge = getEarnedBadge(
        updatedUser.completedChallenges.length,
        hasPhotoSubmission || (validationData && validationData.startsWith('data:'))
      );
      
      if (badge) {
        await addBadgeToUser(badge);
        updatedUser.badges.push(badge);
      }
      
      // Update app state
      const updatedCompletion: ChallengeCompletion = {
        challengeId,
        completedAt: new Date().toISOString(),
        validationData
      };
      
      setState(prevState => ({
        ...prevState,
        user: updatedUser,
        completions: [...prevState.completions, updatedCompletion]
      }));
    } catch (err) {
      setError('Failed to complete challenge');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [state]);

  // Get today's challenge
  const getTodaysChallenge = useCallback(() => {
    if (!state.user) return null;
    
    const userChallenges = getChallengesByProfile(state.user.profileType);
    return userChallenges.find(challenge => challenge.day === state.user.currentDay);
  }, [state.user]);

  // Check if a challenge is completed
  const isChallengeCompleted = useCallback((challengeId: string) => {
    return state.user?.completedChallenges.includes(challengeId) || false;
  }, [state.user]);

  // Get a formatted date for a specific challenge day
  const getDateForChallengeDay = useCallback((day: number) => {
    if (!state.user?.startDate) return '';
    
    const startDate = new Date(state.user.startDate);
    const challengeDate = addDays(startDate, day - 1);
    
    if (isSameDay(challengeDate, new Date())) {
      return "Aujourd'hui";
    }
    
    return format(challengeDate, 'dd/MM/yyyy');
  }, [state.user]);

  // Get all challenges for current user
  const getUserChallenges = useCallback(() => {
    if (!state.user) return [];
    return getChallengesByProfile(state.user.profileType);
  }, [state.user]);

  return {
    user: state.user,
    challenges: state.challenges,
    completions: state.completions,
    loading,
    error,
    setupUser,
    completeChallenge: handleCompleteChallenge,
    getTodaysChallenge,
    isChallengeCompleted,
    getDateForChallengeDay,
    getUserChallenges
  };
};