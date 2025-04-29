import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Camera, FileText, MapPin } from 'lucide-react';
import { Challenge } from '../types';
import Button from './Button';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onComplete: (validationData?: string) => void;
  date: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  isCompleted,
  onComplete,
  date
}) => {
  const [validationText, setValidationText] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = () => {
    if (challenge.validationType === 'checkmark') {
      onComplete();
    } else if (challenge.validationType === 'text') {
      onComplete(validationText);
    } else if (challenge.validationType === 'photo') {
      onComplete(photoPreview || undefined);
    }
  };
  
  const getProfileTagClass = () => {
    switch (challenge.profileType) {
      case 'young': return 'tag-young';
      case 'family': return 'tag-family';
      case 'eco': return 'tag-eco';
      default: return '';
    }
  };
  
  const getProfileTagText = () => {
    switch (challenge.profileType) {
      case 'young': return 'Jeune adulte';
      case 'family': return 'Famille';
      case 'eco': return 'Éco-curieux';
      default: return '';
    }
  };
  
  const ValidationComponent = () => {
    if (isCompleted) {
      return (
        <div className="mt-4 p-3 bg-green-50 rounded-lg text-green-700 flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Défi validé !</span>
        </div>
      );
    }
    
    switch (challenge.validationType) {
      case 'checkmark':
        return (
          <Button 
            onClick={handleSubmit}
            variant="primary"
            className="mt-4"
            icon={<Check />}
          >
            Valider ce défi
          </Button>
        );
      case 'text':
        return (
          <div className="mt-4 space-y-3">
            <textarea
              value={validationText}
              onChange={e => setValidationText(e.target.value)}
              placeholder="Décris comment tu as relevé ce défi..."
              className="input min-h-[100px]"
            />
            <Button 
              onClick={handleSubmit}
              variant="primary"
              disabled={!validationText.trim()}
              icon={<FileText className="w-4 h-4" />}
            >
              Envoyer et valider
            </Button>
          </div>
        );
      case 'photo':
        return (
          <div className="mt-4 space-y-3">
            {photoPreview ? (
              <div className="relative">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button 
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Camera className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-gray-500">Prendre une photo pour valider le défi</span>
                </label>
              </div>
            )}
            <Button 
              onClick={handleSubmit}
              variant="primary"
              disabled={!photoPreview}
              icon={<Camera className="w-4 h-4" />}
            >
              Valider avec cette photo
            </Button>
          </div>
        );
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden"
    >
      {challenge.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={challenge.imageUrl} 
            alt={challenge.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`challenge-tag ${getProfileTagClass()}`}>
            {getProfileTagText()}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {challenge.title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {challenge.description}
        </p>
        
        {challenge.tips && (
          <div className="bg-beige-50 p-3 rounded-lg mb-4 text-sm text-gray-700">
            <strong className="block mb-1">Astuce :</strong>
            {challenge.tips}
          </div>
        )}
        
        {ValidationComponent()}
      </div>
    </motion.div>
  );
};

export default ChallengeCard;