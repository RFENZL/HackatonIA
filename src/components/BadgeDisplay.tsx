import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Lock } from 'lucide-react';
import { Badge } from '../types';
import Button from './Button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
}

const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges
}) => {
  if (!isOpen) return null;

  const allBadges = [
    {
      id: 'first-day',
      name: 'Premier Pas',
      description: 'Tu as relevé ton premier défi circuit court !',
      imageUrl: '/badges/first-day.svg'
    },
    {
      id: 'three-days',
      name: 'Mi-parcours',
      description: 'Tu as atteint la moitié du chemin. Continue !',
      imageUrl: '/badges/three-days.svg'
    },
    {
      id: 'all-completed',
      name: 'Champion Circuit Court',
      description: 'Tu as complété tous les défis de la semaine ! Extraordinaire !',
      imageUrl: '/badges/all-completed.svg'
    },
    {
      id: 'photo-sharing',
      name: 'Influenceur Vert',
      description: 'Tu as partagé des photos de tes défis',
      imageUrl: '/badges/photo-sharing.svg'
    }
  ];

  const modalVariants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const getBadgeStatus = (badgeId: string) => {
    return badges.find(b => b.id === badgeId);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial="closed"
      animate="open"
      exit="closed"
      variants={backdropVariants}
    >
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-xl z-10 max-h-[70vh] flex flex-col"
        variants={modalVariants}
      >
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-secondary-500" />
            <h3 className="font-bold text-2xl text-gray-800">Collection de badges</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allBadges.map((badge, index) => {
              const earnedBadge = getBadgeStatus(badge.id);
              const isLocked = !earnedBadge;

              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-xl p-6 ${
                    isLocked ? 'bg-gray-50' : 'bg-gradient-to-br from-beige-50 to-secondary-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`relative rounded-full p-4 ${
                      isLocked ? 'bg-gray-100' : 'bg-white shadow-md'
                    }`}>
                      <img
                        src={badge.imageUrl}
                        alt={badge.name}
                        className={`w-16 h-16 ${isLocked ? 'opacity-30' : ''}`}
                      />
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`font-bold text-lg mb-1 ${
                        isLocked ? 'text-gray-400' : 'text-gray-800'
                      }`}>
                        {badge.name}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        isLocked ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {badge.description}
                      </p>
                      {earnedBadge?.dateEarned && (
                        <p className="text-xs text-secondary-600 font-medium">
                          Obtenu le {format(new Date(earnedBadge.dateEarned), 'dd MMMM yyyy', { locale: fr })}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t bg-white rounded-b-2xl">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {badges.length} badge{badges.length > 1 ? 's' : ''} obtenu{badges.length > 1 ? 's' : ''} sur {allBadges.length}
            </p>
            <Button onClick={onClose} variant="outline">
              Fermer
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BadgesModal;
