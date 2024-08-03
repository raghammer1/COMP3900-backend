import React from 'react';
import { Button, styled } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { fetchGoogleUserInfo, googleLoginBackend } from '../services/api';
import { useAlert } from '../components/AlertError';
import useUserStore from '../zustand/useUserStore';

// This is a styled container for the Google authentication button
const StyledContainer = styled('div')({
  textAlign: 'center',
  width: '100%',
});

// This is a styled Google button with custom styling
const StyledGoogleButton = styled(Button)({
  backgroundColor: 'white',
  color: 'rgba(0, 0, 0, 0.54)',
  boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.25)',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '8px 24px',
  textTransform: 'none',
  fontSize: '14px',
  lineHeight: '36px',
  width: '100%',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

// This component handles Google authentication and user login
const GoogleAuth = ({ setNewUser, newUser, goToDashboard }) => {
  const { showAlert } = useAlert(); // Custom hook to show alert messages
  const { setUser } = useUserStore(); // Zustand store hook to set user data

  // If newUser is set by Google Auth, this effect runs
  useEffect(() => {
    const fetchData = async () => {
      if (newUser) {
        // Gets the user info from the Google OAuth API
        const userInfo = await fetchGoogleUserInfo(newUser.access_token);

        // After data is received from the access token, save it in the backend
        const response = await googleLoginBackend({
          googleId: userInfo.id,
          email: userInfo.email, // Google email
          username: userInfo.name, // Google name
          googlePicture: userInfo.picture,
        });

        if (response.error) {
          // Show error alert if login fails
          showAlert(
            response.data.error
              ? response.data.error
              : 'Error occurred try again later',
            'tomato'
          );
        } else {
          // Show success alert and log user in if everything works successfully
          showAlert(`Welcome ${userInfo.name}`, 'green');

          // Set user data in Zustand store
          setUser({ user: response.data });

          // Finally, navigate to the dashboard
          goToDashboard();
        }
        console.log('Google User Info:', userInfo);
      }
    };

    // Only runs the fetch request when newUser is set by Google Auth for efficiency
    if (newUser && newUser.length !== 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  // Function to get the access token for the Google user
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setNewUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div>
      <StyledContainer>
        <StyledGoogleButton variant="contained" onClick={login}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtDY3lQL0z3nfknrcD16ZxHe9BGCj-MlTGQ&s"
            alt="Google G Logo"
            style={{ marginRight: '16px', height: '20px' }}
          />
          Sign in with Google
        </StyledGoogleButton>
      </StyledContainer>
    </div>
  );
};

export default GoogleAuth;
