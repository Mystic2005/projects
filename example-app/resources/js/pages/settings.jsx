import React from 'react';
import '../../css/bento.css';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{fontFamily: "'Bitcount Prop Double', sans-serif"}} className="fixed inset-0 z-50 flex items-center justify-center">
      <div style={{backgroundColor: 'rgb(74, 74, 74)', outline: '2px solid'}} className="rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-900 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div>
          settings
          settings
          settings
          {/* */}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
