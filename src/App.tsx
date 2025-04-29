import React, { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { Challenge, UserProfile, Badge } from './types';
import Welcome from './components/Welcome';
import ProfileSelector from './components/ProfileSelector';
import ChallengeCard from './components/ChallengeCard';
import ProgressTracker from './components/ProgressTracker';
import Header from './components/Header';
import BadgeDisplay from './components/BadgeDisplay';
import AppMenu from './components/AppMenu';
import BadgesModal from './components/BadgesModal';
import ChallengeComplete from './components/ChallengeComplete';
import { getEarnedBadge } from './data/badges';
import { checkUserExists } from './utils/storage';
import { getChallengeByDayAndProfile, getRandomEncouragement } from './data/challenges';

function App() {
  const {
    user,
    loading,
    setupUser,
    completeChallenge,
    isChallengeCompleted,
    getDateForChallengeDay,
    getUserChallenges
  } = useAppState();

  const [initialized, setInitialized] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [newBadge, setNewBadge] = useState<Badge | null>(null);

  // Control body overflow in parent document when completion modal is shown
  useEffect(() => {
    try {
      if (showCompletion) {
        window.parent.document.body.style.overflow = 'hidden';
        console.log('Body overflow set to hidden');
      } else {
        window.parent.document.body.style.overflow = '';
        console.log('Body overflow reset');
      }
    } catch (err) {
      console.warn('Unable to modify parent body overflow:', err);
    }
  }, [showCompletion]);

  useEffect(() => {
    const checkUser = async () => {
      console.log('Checking if user exists...');
      const exists = await checkUserExists();
      console.log('User exists:', exists);
      if (exists) {
        setShowWelcome(false);
      }
      setInitialized(true);
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('User loaded:', user);
      setSelectedDay(user.currentDay);
    }
  }, [user]);

  if (!initialized || loading) {
    console.log('App loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const handleProfileSelect = async (profileType: UserProfile) => {
    console.log('Profile selected:', profileType);
    await setupUser(profileType);
    setSelectedDay(1);
  };

  const handleProfileChange = async (profileType: UserProfile) => {
    if (user && profileType !== user.profileType) {
      console.log('Changing profile:', profileType);
      await setupUser(profileType);
      setSelectedDay(1);
    }
  };

  const handleChallengeComplete = async (challengeId: string, validationData?: string) => {
    console.log('Challenge complete:', challengeId, validationData);
    await completeChallenge(challengeId, validationData);

    const completedCount = user?.completedChallenges.length || 0;
    const hasPhotoSubmission = !!validationData && validationData.startsWith('data:');

    const badge = getEarnedBadge(completedCount + 1, hasPhotoSubmission);
    console.log('New badge earned:', badge);

    setNewBadge(badge);
    setCompletionMessage(getRandomEncouragement());
    setShowCompletion(true);
  };

  if (showWelcome) {
    console.log('Showing welcome screen...');
    return <Welcome onGetStarted={() => setShowWelcome(false)} />;
  }

  if (!user) {
    console.log('No user found, showing profile selector...');
    return <ProfileSelector onSelect={handleProfileSelect} />;
  }

  const userChallenges = getUserChallenges();
  const selectedChallenge = selectedDay
    ? getChallengeByDayAndProfile(selectedDay, user.profileType)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Header 
        user={user}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenBadges={() => setBadgesOpen(true)}
      />

      <main className="flex-1 container mx-auto px-4 py-6">
        <ProgressTracker
          challenges={userChallenges}
          completedChallengeIds={user.completedChallenges}
          currentDay={user.currentDay}
          onSelectDay={(day) => {
            console.log('Day selected:', day);
            setSelectedDay(day);
          }}
        />

        {selectedChallenge && (
          <div className="mt-4">
            <ChallengeCard
              challenge={selectedChallenge}
              isCompleted={isChallengeCompleted(selectedChallenge.id)}
              onComplete={(validationData) =>
                handleChallengeComplete(selectedChallenge.id, validationData)
              }
              date={getDateForChallengeDay(selectedChallenge.day)}
            />
          </div>
        )}

        {user.badges.length > 0 && (
          <BadgeDisplay
            badges={user.badges}
            isOpen={false}
            onClose={() => console.log('Badge display closed')}
          />
        )}
      </main>

      {/* Modals */}
      <AppMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onProfileChange={handleProfileChange}
        onViewBadges={() => setBadgesOpen(true)}
        currentProfile={user.profileType}
      />

      <BadgesModal
        isOpen={badgesOpen}
        onClose={() => setBadgesOpen(false)}
        badges={user.badges}
      />

      {showCompletion && (
        <ChallengeComplete
          onContinue={() => {
            console.log('Closing challenge complete modal');
            setShowCompletion(false);
          }}
          message={completionMessage}
          newBadge={newBadge}
        />
      )}
    </div>
  );
}

export default App;