import React from 'react';
import RegisterBody from './RegisterBody';
import RegisterHeader from './RegisterHeader';

// Register component
const RegisterText = () => {
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
      <RegisterHeader />
      <RegisterBody />
    </div>
  );
};
export default RegisterText;
