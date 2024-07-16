import React from 'react';
import LoginBody from './LoginBody';
import LoginHeader from './LoginHeader';

// A component to handle the left component on the login page
const LoginText = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '80px',
      }}
    >
      <LoginHeader />
      <LoginBody />
    </div>
  );
};
export default LoginText;
