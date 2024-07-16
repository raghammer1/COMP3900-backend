import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-ball"></div>
    </div>
  );
};

export default LoadingIndicator;
