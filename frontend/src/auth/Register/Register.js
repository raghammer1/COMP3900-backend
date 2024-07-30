import React, { useState } from 'react';
import { styled } from '@mui/system';
import RegisterInputs from './RegisterInputs';
import RegisterText from './RegisterText';
import { useNavigate } from 'react-router-dom';

// This is a styled component for the background container with an image
const BackgroundContainer = styled('div')({
  backgroundImage: `url(${process.env.PUBLIC_URL}/register.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh',
  position: 'relative',
});

// This is a styled component for the main registration container
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

// This is a styled component for the secondary container
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

// This is the main component for the user registration interface
const Register = () => {
  const [exitLeft, setExitLeft] = useState(false); // State to manage the left exit animation
  const [exitBottom, setExitBottom] = useState(false); // State to manage the bottom exit animation
  const nav = useNavigate(); // Hook to navigate programmatically

  // This function navigates the user to the dashboard on successful registration
  const goToDashboard = () => {
    // Trigger the exit animations
    setExitLeft(true);
    setExitBottom(true);
    // Navigate to the dashboard after a delay to allow animations to complete
    setTimeout(() => {
      nav('/dashboard/main');
    }, 400);
  };

  return (
    <BackgroundContainer>
      {/* Render the secondary container with a conditional left position for animation */}
      <Container2 style={{ left: exitLeft ? '-100%' : '' }}>
        <RegisterText />
      </Container2>
      {/* Render the main registration container with a conditional bottom position for animation */}
      <Container style={{ bottom: exitBottom ? '-100%' : '' }}>
        <RegisterInputs goToDashboard={goToDashboard} />
      </Container>
    </BackgroundContainer>
  );
};

export default Register;
