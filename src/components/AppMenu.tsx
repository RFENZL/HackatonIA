import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Users, Sprout, Info, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileChange: (profile: UserProfile) => void;
  onViewBadges: () => void;
  currentProfile: UserProfile;
}

const AppMenu: React.FC<AppMenuProps> = ({
  isOpen,
  onClose,
  onProfileChange,
  onViewBadges,
  currentProfile
}) => {
  if (!isOpen) return null;
  
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { 
        type: 'tween',
        duration: 0.25
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: 'tween',
        duration: 0.25
      }
    }
  };
  
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };
  
  const getProfileIcon = (profile: UserProfile) => {
    switch (profile) {
      case 'young': return <User size={20} />;
      case 'family': return <Users size={20} />;
      case 'eco': return <Sprout size={20} />;
    }
  };
  
  const getProfileName = (profile: UserProfile) => {
    switch (profile) {
      case 'young': return 'Jeune adulte';
      case 'family': return 'Famille';
      case 'eco': return 'Éco-curieux';
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex"
      initial="closed"
      animate="open"
      exit="closed"
      variants={backdropVariants}
    >
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <motion.div 
        className="ml-auto w-3/4 max-w-xs bg-white h-full flex flex-col shadow-xl"
        variants={menuVariants}
      >
        {/* Fixed Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white">
          <h3 className="font-bold text-gray-800">Menu</h3>
          <button onClick={onClose} className="p-1">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-2">Profil actuel</h4>
              <div className="flex items-center gap-2 p-2 bg-beige-50 rounded-lg">
                {getProfileIcon(currentProfile)}
                <span className="font-medium">{getProfileName(currentProfile)}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-2">Changer de profil</h4>
              <div className="space-y-2">
                {(['young', 'family', 'eco'] as UserProfile[]).map(profile => (
                  <button
                    key={profile}
                    onClick={() => {
                      onProfileChange(profile);
                      onClose();
                    }}
                    className={`flex items-center gap-2 p-2 w-full rounded-lg text-left ${
                      currentProfile === profile
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {getProfileIcon(profile)}
                    <span>{getProfileName(profile)}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-2">Autres</h4>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onViewBadges();
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 w-full rounded-lg text-left hover:bg-gray-50"
                >
                  <Award size={20} />
                  <span>Mes badges</span>
                </button>
                
                <button
                  className="flex items-center gap-2 p-2 w-full rounded-lg text-left hover:bg-gray-50"
                >
                  <Info size={20} />
                  <span>À propos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Fixed Footer */}
        <div className="p-4 text-xs text-center text-gray-500 border-t bg-white">
          Défi 7 jours - Circuit Court v0.1.0
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppMenu;