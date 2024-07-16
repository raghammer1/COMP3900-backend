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

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
}));

// Component that handles user setting new password from the email
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // Checks if the token is there in the params for security
  useEffect(() => {
    if (!token) {
      navigate('*');
    }
  }, [token, navigate]);

  // On submit resets the password if token is valid
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showAlert('Passwords do not match', 'tomato');
      return;
    }

    try {
      // sends the request to reset password
      const response = await resetPassword({ newPassword: password, token });
      if (response.error) {
        showAlert(
          response.data.message || 'Failed to reset password',
          'tomato'
        );
      } else {
        // On success user is sent to login page to login with new password
        showAlert('Password reset successfully', 'green');
        navigate('/login');
      }
    } catch (e) {
      showAlert(
        'An unexpected error occurred. Please try again later.',
        'tomato'
      );
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
