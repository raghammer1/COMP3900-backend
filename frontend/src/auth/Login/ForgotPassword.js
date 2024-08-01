import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import LockResetIcon from '@mui/icons-material/LockReset';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { forgotPassword } from '../../services/api';
import { useAlert } from '../../components/AlertError';
import CircularProgress from '@mui/material/CircularProgress';

// This is a styled component for the loading overlay
const LoadingOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
}));

// This is a styled component for the forgot password wrapper
const ForgotPasswordWrapper = styled('div')(({ theme }) => ({
  marginBottom: '10px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#3f51b5',
  textDecoration: 'none',
  '&:hover': {
    color: '#1a237e',
    textDecoration: 'underline',
  },
}));

// This is a styled component for the forgot password text
const ForgotPasswordText = styled('span')({
  marginLeft: '8px',
});

// This is the main component for the forgot password functionality
const ForgotPassword = () => {
  const [open, setOpen] = useState(false); // State to manage the dialog open/close status
  const [email, setEmail] = useState(''); // State to manage the email input
  const { showAlert } = useAlert(); // Custom hook to show alert messages
  const [loading, setLoading] = useState(false); // State to manage the loading spinner

  // This function opens the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // This function closes the modal
  const handleClose = () => {
    setOpen(false);
  };

  // This function handles the form submission to send the reset password email
  const handleSubmit = async () => {
    setLoading(true);
    handleClose();

    if (!email) {
      showAlert('Please enter a valid email address.', 'tomato');
      setLoading(false);
      return;
    }

    const response = await forgotPassword({ email });
    if (response.error) {
      showAlert(
        response.data.error || 'Failed to send reset password email.',
        'tomato'
      );
      setLoading(false);
    } else {
      showAlert('Password reset email sent successfully.', 'green');
      setLoading(false);
    }
  };

  return (
    <div>
      <ForgotPasswordWrapper onClick={handleClickOpen}>
        <LockResetIcon />
        <ForgotPasswordText data-testid={'forgot-password-button'}>
          Forgot Password?
        </ForgotPasswordText>
      </ForgotPasswordWrapper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address to receive a password reset link.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {loading && (
        <LoadingOverlay>
          <CircularProgress />
        </LoadingOverlay>
      )}
    </div>
  );
};

export default ForgotPassword;
