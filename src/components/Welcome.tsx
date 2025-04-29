import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Button from './Button';
import { MapPin, Leaf, ShoppingBag } from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 text-center">
        <div className="flex justify-center mb-2">
          <Logo size="lg" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-display font-bold text-gray-800 mb-2"
        >
          Défi 7 jours
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          Circuit Court
        </motion.p>
      </header>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex-1 flex flex-col justify-center items-center px-4"
      >
        <div className="max-w-md text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            7 jours pour adopter des habitudes écoresponsables
          </h2>
          
          <p className="text-gray-600 mb-6">
            Chaque jour, relève un nouveau défi lié au circuit court et à la consommation locale.
            Valide tes actions, obtiens des badges et fais une différence pour l'environnement !
          </p>
          
          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-primary-500" />
              </div>
              <span className="text-sm text-gray-700">Produits locaux</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-beige-100 flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6 text-beige-500" />
              </div>
              <span className="text-sm text-gray-700">Écologique</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-2">
                <ShoppingBag className="w-6 h-6 text-secondary-500" />
              </div>
              <span className="text-sm text-gray-700">Circuits courts</span>
            </div>
          </div>
          
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            fullWidth
            className="animate-pulse"
          >
            Commencer le défi
          </Button>
        </div>
      </motion.div>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>Une expérience pour une consommation plus responsable</p>
      </footer>
    </div>
  );
};

export default Welcome;