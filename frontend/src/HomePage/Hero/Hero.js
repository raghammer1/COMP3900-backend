import React from 'react';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const Heading = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '0',
});

const Image = styled('img')({
  width: '80%',
});

const Hero = () => {
  const nav = useNavigate();

  const goToRegister = () => {
    nav('/register');
  };

  return (
    <Container>
      <Heading>
        <h1 style={{ marginBottom: '0', fontSize: '56px', fontWeight: '400' }}>
          Helping SME's Move Towards the
        </h1>
        <h1
          style={{
            fontSize: '56px',
            fontWeight: '400',
            marginTop: '5px',
            marginBottom: '0',
          }}
        >
          Next Revolution <span style={{ color: '#FFE0E5' }}>#Industry4.0</span>
        </h1>
        <h4
          style={{
            marginTop: '14px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '300',
          }}
        >
          HexaHunks is a online file manager allowing users to convert various
          file formats to UBL,
          <br /> validate UBL files, and securely share them with team
          collaboration
        </h4>
        <CustomPrimaryButton
          label="Get Started"
          onClick={goToRegister}
          bgcolour="#651FFF"
          additionalStyle={{ width: '50%' }}
        />
      </Heading>
      <Image src={`${process.env.PUBLIC_URL}/home-hero-2.png`} alt="hero" />
    </Container>
  );
};
export default Hero;
