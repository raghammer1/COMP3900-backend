import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ logo, heading, text }) => {
  const nav = useNavigate();

  const redirect = () => {
    const token = Cookies.get('token');

    if (token) {
      nav('/dashboard');
    } else {
      nav('/register');
    }
  };

  return (
    <div
      style={{
        height: '400px',
        width: '28%',
        borderRadius: '9px',
        backgroundColor: '#651FFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: '50%',
          marginTop: '48px',
          marginLeft: '48px',
        }}
      >
        <img
          style={{ width: '38px', height: '38px' }}
          src={`${process.env.PUBLIC_URL}/${logo}`}
          alt="logo"
        />
      </div>
      <h1
        style={{
          fontSize: '28px',
          marginLeft: '48px',
          marginTop: '32px',
          marginBottom: '0',
          fontFamily: 'Adamina, serif',
          fontWeight: '400',
        }}
      >
        {heading}
      </h1>
      <p
        style={{
          fontFamily: 'Adamina, serif',
          marginLeft: '48px',
          marginRight: '48px',
          marginTop: '7px',
          lineHeight: '24px',
          fontSize: '16px',
        }}
      >
        {text}
      </p>
      <p
        style={{
          fontFamily: 'Adamina, serif',
          margin: '0',
          fontSize: '16px',
          marginLeft: '48px',
          position: 'relative',
          bottom: '0',
          cursor: 'pointer',
        }}
        onClick={redirect}
      >
        <u>{heading} Now</u>
      </p>
    </div>
  );
};
export default FeatureCard;
