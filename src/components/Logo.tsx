import React from 'react';
import { Sprout } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };
  
  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`text-primary-500 ${sizeMap[size]}`}>
        <Sprout size="100%" strokeWidth={2} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold ${textSizeMap[size]} text-primary-600 leading-tight`}>
            Défi 7 jours
          </span>
          <span className={`font-display text-secondary-500 ${size === 'sm' ? 'text-xs' : 'text-sm'} leading-tight`}>
            Circuit Court
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;