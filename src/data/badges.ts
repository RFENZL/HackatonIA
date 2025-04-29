import { Badge } from '../types';

export const badges: Badge[] = [
  {
    id: 'first-day',
    name: 'Premier Pas',
    description: 'Tu as relevé ton premier défi circuit court !',
    imageUrl: '/badges/first-day.svg',
    dateEarned: ''
  },
  {
    id: 'three-days',
    name: 'Mi-parcours',
    description: 'Tu as atteint la moitié du chemin. Continue !',
    imageUrl: '/badges/three-days.svg',
    dateEarned: ''
  },
  {
    id: 'all-completed',
    name: 'Champion Circuit Court',
    description: 'Tu as complété tous les défis de la semaine ! Extraordinaire !',
    imageUrl: '/badges/all-completed.svg',
    dateEarned: ''
  },
  {
    id: 'photo-sharing',
    name: 'Influenceur Vert',
    description: 'Tu as partagé des photos de tes défis',
    imageUrl: '/badges/photo-sharing.svg',
    dateEarned: ''
  }
];

export const getBadgeById = (id: string): Badge | undefined => {
  return badges.find(badge => badge.id === id);
};

export const getEarnedBadge = (completedCount: number, hasPhotos: boolean): Badge | null => {
  if (completedCount === 1) {
    return { ...badges[0], dateEarned: new Date().toISOString() };
  } else if (completedCount === 3) {
    return { ...badges[1], dateEarned: new Date().toISOString() };
  } else if (completedCount === 7) {
    return { ...badges[2], dateEarned: new Date().toISOString() };
  } else if (hasPhotos && !badges[3].dateEarned) {
    return { ...badges[3], dateEarned: new Date().toISOString() };
  }
  
  return null;
};