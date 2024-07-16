import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';

const PurpleCard = () => {
  const nav = useNavigate();

  const goToRegister = () => {
    nav('/register');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1
          style={{
            fontSize: '42px',
            fontFamily: 'Adamina, serif',
            fontWeight: '400',
            letterSpacing: '0.1px',
            textAlign: 'center',
            color: '#000',
          }}
        >
          <span
            style={{
              color: '#651FFF',
            }}
          >
            All Invoices
          </span>{' '}
          in one simple place with privacy come first.
        </h1>

        <CustomPrimaryButton
          label="Get Started"
          onClick={goToRegister}
          bgcolour="#651FFF"
          additionalStyle={{ width: '50%' }}
        />
      </div>
      <div style={{ maxWidth: '40%' }}>
        <img
          style={{ width: '515px', height: '495px' }}
          src={`${process.env.PUBLIC_URL}/group.png`}
          alt="logo"
        />
      </div>
    </div>
  );
};
export default PurpleCard;
