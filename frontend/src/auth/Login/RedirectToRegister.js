import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const RedirectInfo = styled('p')({
  fontSize: '12.8px',
  '&:hover': {
    color: '#1354CB',
    cursor: 'pointer',
  },
});

// If user clicks on register then user taken to the register page
const RedirectToRegister = () => {
  const nav = useNavigate();

  const goToRegister = () => {
    nav('/register');
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
        <RedirectInfo onClick={goToRegister}>
          New User?{' '}
          <u>
            <b>SIGN UP HERE</b>
          </u>
        </RedirectInfo>
      </div>
    </div>
  );
};
export default RedirectToRegister;
