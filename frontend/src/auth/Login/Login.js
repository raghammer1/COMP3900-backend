import React, { useState } from 'react';
import { styled } from '@mui/system';
import LoginInputs from './LoginInputs';
import LoginText from './LoginText';
import { useNavigate } from 'react-router-dom';

const BackgroundContainer = styled('div')({
  backgroundImage: `url(${process.env.PUBLIC_URL}/login.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh',
  position: 'relative',
});

const Container = styled('div')({
  width: '450px',
  height: '658px',
  backgroundColor: '#FFFFFF',
  position: 'absolute',
  bottom: '0',
  right: '16%',
  display: 'flex',
  borderRadius: '24px 24px 0 0',
  transition: 'bottom 0.5s ease',
  '@media (max-width: 1400px)': {
    right: '10%',
  },
  '@media (max-width: 1150px)': {
    right: '4%',
  },
  '@media (max-width: 980px)': {
    right: '1%',
  },
  '@media (max-width: 890px)': {
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const Container2 = styled('div')({
  width: '450px',
  height: '658px',
  position: 'absolute',
  left: '16%',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'left 0.5s ease',
  '@media (max-width: 1400px)': {
    left: '10%',
  },
  '@media (max-width: 1150px)': {
    left: '4%',
  },
  '@media (max-width: 980px)': {
    left: '0%',
  },
  '@media (max-width: 890px)': {
    display: 'none',
  },
});

// The main component for user login interface
const Login = () => {
  const [exitLeft, setExitLeft] = useState(false);
  const [exitBottom, setExitBottom] = useState(false);
  const nav = useNavigate();

  // To send the user to dashboard on successful login
  const goToDashboard = () => {
    // Just some animation on login success
    setExitLeft(true);
    setExitBottom(true);
    setTimeout(() => {
      nav('/dashboard/main');
    }, 400);
  };

  return (
    <BackgroundContainer>
      <Container2 style={{ left: exitLeft ? '-100%' : '' }}>
        <LoginText />
      </Container2>
      <Container style={{ bottom: exitBottom ? '-100%' : '' }}>
        <LoginInputs goToDashboard={goToDashboard} />
      </Container>
    </BackgroundContainer>
  );
};

export default Login;
