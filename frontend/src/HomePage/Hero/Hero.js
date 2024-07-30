import React from 'react';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { useNavigate } from 'react-router-dom';

// Styled container for the hero section
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '86vh',
  textAlign: 'center',
  padding: '0 20px',
  background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)',
});

// Styled heading section for the hero content
const Heading = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '0',
  maxWidth: '800px',
  padding: '0 20px',
});

const Header = styled('h1')({
  marginBottom: '-10px',
  fontSize: '3.5rem',
  fontWeight: '400',
  '@media (max-width: 550px)': {
    fontSize: '2.6rem',
  },
});

// Main hero component
const Hero = () => {
  const nav = useNavigate(); // Hook to navigate programmatically

  // Function to navigate to the register page
  const goToRegister = () => {
    nav('/dashboard/main');
  };

  return (
    <Container>
      <Heading>
        <Header>Helping SME's Move Towards the</Header>
        <Header>
          Next Revolution <span style={{ color: '#651FFF' }}>#Industry4.0</span>
        </Header>
        <h4
          style={{
            marginTop: '14px',
            fontSize: '1.25rem',
            fontWeight: '300',
            color: '#555',
          }}
        >
          HexaHunks is an online file manager allowing users to convert various
          file formats to UBL, validate UBL files, and securely share them with
          team collaboration.
        </h4>
        <CustomPrimaryButton
          label="Get Started"
          onClick={goToRegister}
          bgcolour="#651FFF"
          additionalStyle={{
            width: '200px',
            height: '50px',
            fontSize: '1rem',
            marginTop: '20px',
          }}
        />
      </Heading>
    </Container>
  );
};

export default Hero;
