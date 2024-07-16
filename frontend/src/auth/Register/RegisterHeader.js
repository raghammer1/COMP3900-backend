import React from 'react';

const RegisterHeader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
      }}
    >
      <img
        style={{ width: '64px', height: '64px' }}
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="logo"
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
