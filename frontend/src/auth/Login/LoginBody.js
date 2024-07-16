import React from 'react';
import LoginSlider from './LoginSlider';

// The component to handle the login page sliders
const LoginBody = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          color: 'white',
          fontSize: '40px',
          letterSpacing: '1px',
        }}
      >
        Building the Future
      </h2>
      <LoginSlider />
    </div>
  );
};
export default LoginBody;
