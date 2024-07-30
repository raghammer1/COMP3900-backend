import React from 'react';
import { useNavigate } from 'react-router-dom';

// This component represents the header for the registration page
const RegisterHeader = () => {
  const nav = useNavigate(); // Hook to navigate programmatically

  // This function navigates the user to the home page
  const goToHome = () => {
    nav('/');
    return;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={goToHome} // Clicking on the header navigates to the home page
    >
      <img
        style={{ width: '64px', height: '64px' }}
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="logo" // Logo image
      />
      <h2
        style={{
          color: 'white',
          fontSize: '46px',
          fontWeight: '300',
          letterSpacing: '1px',
        }}
      >
        HexaHunks
      </h2>
    </div>
  );
};

export default RegisterHeader;
