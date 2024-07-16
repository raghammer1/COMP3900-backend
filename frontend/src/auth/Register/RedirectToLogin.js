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

const RedirectToLogin = () => {
  const nav = useNavigate();

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
