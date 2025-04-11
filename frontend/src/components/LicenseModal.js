// E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\src\components\LicenseModal.js
import React from 'react';
import '../pages/popup.css';

const LicenseModal = ({ isOpen, onClose }) => {
  console.log("LicenseModal rendered, isOpen:", isOpen);

  if (!isOpen) {
    console.log("LicenseModal not open, returning null");
    return null;
  }

  console.log("Rendering LicenseModal popup UI");

  const handleContinue = () => {
    console.log("Continue button clicked, closing modal");
    onClose();
  };

  return (
    <div className="overlay">
      <div className="welcome-popup">
        <div className="popup-header">
          <h1>Welcome to jmeterAI</h1>
        </div>
        <div className="popup-content">
          <p>Your 5-day free trial has started.</p>
          <p>Press ok to continue.</p>
          <button
            onClick={handleContinue}
            className="continue-button"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicenseModal;