import React, { useEffect, useState } from 'react';
import { resetPassword } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/AlertError';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';

// This is a styled component for the form container
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

// This is a styled component for the button
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
}));

// This component handles the user setting a new password from the email
const ResetPassword = () => {
  const [password, setPassword] = useState(''); // State to manage the new password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State to manage the confirm password input

  const { token } = useParams(); // Hook to get the token from the URL params
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { showAlert } = useAlert(); // Custom hook to show alert messages

  // This effect checks if the token is present in the URL params for security
  useEffect(() => {
    if (!token) {
      navigate('*');
    }
  }, [token, navigate]);

  // This function handles the form submission to reset the password if the token is valid
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlert('Passwords do not match', 'tomato');
      return;
    }

    // Sends the request to reset the password
    const response = await resetPassword({ newPassword: password, token });
    if (response.error) {
      // Show error alert if password reset fails
      showAlert(response.data.error || 'Failed to reset password', 'tomato');
    } else {
      // Show success alert and redirect to login page if password reset is successful
      showAlert('Password reset successfully', 'green');
      navigate('/login');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <FormContainer>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledButton type="submit" fullWidth variant="contained">
            Reset Password
          </StyledButton>
        </Box>
      </FormContainer>
    </Container>
  );
};

export default ResetPassword;
