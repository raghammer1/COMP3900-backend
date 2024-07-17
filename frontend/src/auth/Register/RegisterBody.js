import React from 'react';
import RegisterSlider from './RegisterSlider';

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