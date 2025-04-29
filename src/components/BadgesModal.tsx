import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NewBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    description: string;
    imageUrl: string;
  };
}

const NewBadgeModal: React.FC<NewBadgeModalProps> = ({ isOpen, onClose, badge }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-lg w-full max-w-xl max-h-[70vh] overflow-y-auto z-10 p-6 text-center"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Défi complété !</h2>
        <p className="text-sm text-gray-500 mb-4">
          Bravo pour ton engagement dans cette démarche écoresponsable !
        </p>

        <div className="bg-orange-50 rounded-xl p-6 mb-4">
          <p className="text-sm font-bold text-orange-600 mb-2">🎉 Nouveau badge obtenu !</p>
          <div className="flex flex-col items-center">
            <div className="bg-white shadow-md rounded-full p-4 mb-3">
              <img src={badge.imageUrl} alt={badge.name} className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{badge.name}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition"
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>
  );
};

export default NewBadgeModal;
