import React from 'react';
import Logo from './Logo';
import { User } from '../types';
import { motion } from 'framer-motion';
import { Menu, Trophy } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onOpenMenu?: () => void;
  onOpenBadges?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onOpenMenu, onOpenBadges }) => {
  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        
        {user && (
          <div className="flex items-center space-x-3">
            {user.badges.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-secondary-500"
                onClick={onOpenBadges}
              >
                <Trophy size={24} />
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600"
              onClick={onOpenMenu}
            >
              <Menu size={24} />
            </motion.button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;