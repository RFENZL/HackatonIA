import React from 'react';
import { UserProfile } from '../types';
import { motion } from 'framer-motion';
import { Users, Sprout, User } from 'lucide-react';
import Button from './Button';

interface ProfileSelectorProps {
  onSelect: (profile: UserProfile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect }) => {
  const profiles: { type: UserProfile; title: string; description: string; icon: React.ReactNode }[] = [
    {
      type: 'young',
      title: 'Jeune adulte',
      description: 'Tu as entre 16 et 30 ans et tu souhaites découvrir le circuit court.',
      icon: <User className="w-8 h-8 text-purple-500" />
    },
    {
      type: 'family',
      title: 'Famille',
      description: 'Vous souhaitez sensibiliser vos enfants à une alimentation plus locale.',
      icon: <Users className="w-8 h-8 text-blue-500" />
    },
    {
      type: 'eco',
      title: 'Éco-curieux',
      description: 'Tu es intéressé(e) par une démarche écoresponsable dans ton quotidien.',
      icon: <Sprout className="w-8 h-8 text-green-500" />
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-display font-bold text-gray-800 mb-6 text-center">Choisis ton profil</h2>
      
      <div className="space-y-4">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => onSelect(profile.type)}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-full shadow-sm">
                {profile.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{profile.title}</h3>
                <p className="text-gray-600 text-sm">{profile.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="mt-6 text-sm text-gray-500 text-center">
        Ce choix personnalisera les défis proposés selon ton profil
      </p>
    </div>
  );
};

export default ProfileSelector;