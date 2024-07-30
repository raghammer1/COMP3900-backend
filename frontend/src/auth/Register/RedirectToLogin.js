import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// This is a styled component for the redirect information text
const RedirectInfo = styled('p')({
  fontSize: '12.8px',
  '&:hover': {
    color: '#1354CB',
    cursor: 'pointer',
  },
});

// This component handles redirecting the user to the login page
const RedirectToLogin = () => {
  const nav = useNavigate(); // Hook to navigate programmatically

  // This function navigates the user to the login page
  const goToLogin = () => {
    nav('/login');
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Clickable text that redirects the user to the login page */}
        <RedirectInfo onClick={goToLogin}>
          Already have an account?{' '}
          <u>
            <b>LOGIN HERE</b>
          </u>
        </RedirectInfo>
      </div>
    </div>
  );
};

export default RedirectToLogin;
