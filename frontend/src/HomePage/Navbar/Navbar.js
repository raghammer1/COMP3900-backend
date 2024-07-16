import React from 'react';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

const Navbar = () => {
  const nav = useNavigate();

  const goToRegister = () => {
    nav('/register');
  };

  const goToLogin = () => {
    nav('/login');
  };

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          margin: '0',
          gap: '20px',
          padding: '20px',
          paddingTop: '15px',
        }}
      >
        <div style={{ margin: '0' }}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="NavBarLogo" />
        </div>
        <div style={{ margin: '0', marginTop: '5px' }}>
          <h1
            style={{
              margin: '0px',
            }}
          >
            HexaHunks
          </h1>
          <h5
            style={{
              margin: '0px',
            }}
          >
            Experience Hexa-Growth
          </h5>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '47.5px',
          padding: '20px',
        }}
      >
        <CustomPrimaryButton
          label="Sign In"
          onClick={goToLogin}
          bgcolour="#ffffff"
          additionalStyle={{ width: 'fit-content' }}
        />
        <CustomPrimaryButton
          label="Create an account"
          onClick={goToRegister}
          bgcolour="#651FFF"
          additionalStyle={{ width: 'fit-content' }}
        />
      </div>
    </Container>
  );
};
export default Navbar;
