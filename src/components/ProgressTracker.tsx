import React from 'react';
import { motion } from 'framer-motion';
import { Challenge } from '../types';

interface ProgressTrackerProps {
  challenges: Challenge[];
  completedChallengeIds: string[];
  currentDay: number;
  onSelectDay: (day: number) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  challenges,
  completedChallengeIds,
  currentDay,
  onSelectDay
}) => {
  // Sort challenges by day
  const sortedChallenges = [...challenges].sort((a, b) => a.day - b.day);
  
  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-4 md:px-0">
        {sortedChallenges.map((challenge) => {
          const isCompleted = completedChallengeIds.includes(challenge.id);
          const isCurrent = challenge.day === currentDay;
          const isFuture = challenge.day > currentDay;
          
          let statusClass = 'challenge-future';
          if (isCompleted) statusClass = 'challenge-completed';
          else if (isCurrent) statusClass = 'challenge-current';
          
          return (
            <React.Fragment key={challenge.id}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`challenge-indicator ${statusClass}`}
                onClick={() => onSelectDay(challenge.day)}
                disabled={isFuture}
              >
                {challenge.day}
              </motion.button>
              
              {challenge.day < 7 && (
                <div 
                  className={`flex-1 h-1 ${
                    isCompleted ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <span className={currentDay > 1 ? 'text-primary-600 font-medium' : ''}>
          {completedChallengeIds.length} / 7 défis complétés
        </span>
      </div>
    </div>
  );
};

export default ProgressTracker;