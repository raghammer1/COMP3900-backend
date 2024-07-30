import React from 'react';
import RegisterSlider from './RegisterSlider';

// This is the body component for the registration body
const RegisterBody = () => {
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
      <RegisterSlider />
    </div>
  );
};
export default RegisterBody;
