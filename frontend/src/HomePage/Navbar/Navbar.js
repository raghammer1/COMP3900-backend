import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';

// Styled container for the logo in the navbar
const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '@media (max-width: 800px)': {
    marginLeft: '-20px',
  },
});

// Styled container for the navbar with dynamic background based on scroll
const NavbarContainer = styled(AppBar)(({ isScrolled }) => ({
  backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : '#000',
  boxShadow: 'none',
  transition: 'background-color 0.3s ease-in-out',
  padding: '10px 50px',
}));

// Styled container for the toolbar in the navbar
const ToolbarContainer = styled(Toolbar)({
  justifyContent: 'space-between',
  gap: '30px',
});

// Styled container for elements in the navbar
const CustomBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

// Main navbar component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false); // State to track if the page is scrolled
  const [user, setUser] = useState(null); // State to track the logged-in user
  const nav = useNavigate(); // Hook to navigate programmatically

  // Function to handle the scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const isSmallScreen = useMediaQuery('(min-width: 800px)');

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check for user token and data in cookies and localStorage
  useEffect(() => {
    const token = Cookies.get('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData)?.user);
    }
  }, []);

  // Function to navigate to the register page
  const goToRegister = () => {
    nav('/register');
  };

  // Function to navigate to the login page
  const goToLogin = () => {
    nav('/login');
  };

  // Function to navigate to the dashboard
  const goToDashboard = () => {
    nav('/dashboard/main');
  };

  return (
    <NavbarContainer position="sticky" isScrolled={isScrolled}>
      <Container>
        <ToolbarContainer>
          {isSmallScreen ? (
            <LogoContainer>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="NavBarLogo"
                style={{ height: '50px' }}
              />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="h4" component="div" sx={{ margin: 0 }}>
                  HexaHunks
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ margin: 0 }}
                >
                  Experience Hexa-Growth...
                </Typography>
              </Box>
            </LogoContainer>
          ) : (
            <LogoContainer>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="NavBarLogo"
                style={{ height: '50px' }}
              />{' '}
            </LogoContainer>
          )}
          <CustomBox>
            {user ? (
              <>
                <Typography variant="h6" sx={{ fontSize: '20px' }}>
                  Welcome, {user.username}
                </Typography>
                <CustomPrimaryButton
                  label="Try Now"
                  onClick={goToDashboard}
                  bgcolour="#651FFF"
                  additionalStyle={{ width: 'fit-content' }}
                />
              </>
            ) : (
              <>
                <CustomPrimaryButton
                  label="Login"
                  onClick={goToLogin}
                  bgcolour="#ffffff"
                  additionalStyle={{ width: 'fit-content' }}
                />
                {isSmallScreen ? (
                  <CustomPrimaryButton
                    label="Create an account"
                    onClick={goToRegister}
                    bgcolour="#651FFF"
                    additionalStyle={{ width: 'fit-content' }}
                  />
                ) : (
                  <CustomPrimaryButton
                    label="Create"
                    onClick={goToRegister}
                    bgcolour="#651FFF"
                    additionalStyle={{ width: 'fit-content' }}
                  />
                )}
              </>
            )}
          </CustomBox>
        </ToolbarContainer>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
