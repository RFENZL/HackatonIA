import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Sparkles } from 'lucide-react';
import Button from './Button';
import { Badge } from '../types';

interface ChallengeCompleteProps {
  onContinue: () => void;
  message: string;
  newBadge?: Badge | null;
}

const ChallengeComplete: React.FC<ChallengeCompleteProps> = ({
  onContinue,
  message,
  newBadge
}) => {
  const [showBadge, setShowBadge] = useState(false);
  
  useEffect(() => {
    if (newBadge) {
      const timer = setTimeout(() => {
        setShowBadge(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [newBadge]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-white rounded-xl shadow-lg p-4 w-full max-w-md text-center relative max-h-[95vh] overflow-auto
"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 mx-auto mb-3 text-primary-500"
        >
          <CheckCircle className="w-full h-full" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Défi complété !</h3>
        
        <p className="text-gray-600 mb-6 text-sm">{message}</p>
        
        {newBadge && showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-4"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-secondary-50 to-beige-50 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            
            <div className="relative p-6 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-secondary-500" />
                <h4 className="font-bold text-base text-gray-800">Nouveau badge obtenu !</h4>
                <Sparkles className="text-secondary-500" />
              </div>
              
              <motion.div 
                className="relative"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="badge mx-auto p-2 bg-white rounded-full shadow-lg relative">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: [0, 0.5, 0], scale: 1.4 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(245,124,0,0.3) 0%, transparent 70%)'
                    }}
                  />
                  <img
                    src={newBadge.imageUrl}
                    alt={newBadge.name}
                    className="w-16 h-16
"
                  />
                </div>
              </motion.div>
              
              <h5 className="font-bold text-xl text-gray-800 mt-4 mb-2">{newBadge.name}</h5>
              <p className="text-gray-600 text-sm">{newBadge.description}</p>
            </div>
          </motion.div>
        )}
        
        <Button
          onClick={onContinue}
          variant="primary"
          fullWidth
          size="lg"
          className="relative overflow-hidden"
        >
          <span className="relative z-10">Continuer</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            style={{ opacity: 0.2 }}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ChallengeComplete;