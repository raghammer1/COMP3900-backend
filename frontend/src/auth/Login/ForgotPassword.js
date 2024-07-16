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

const ForgotPasswordText = styled('span')({
  marginLeft: '8px',
});

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { showAlert } = useAlert();

  // open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // To send the email to user to reset password
  const handleSubmit = async () => {
    handleClose();
    console.log('Email:', email);
    if (!email) {
      showAlert('Please enter a valid email address.', 'tomato');
      return;
    }

    try {
      const response = await forgotPassword({ email });
      if (response.error) {
        showAlert(
          response.data.message || 'Failed to send reset password email.',
          'tomato'
        );
      } else {
        showAlert('Password reset email sent successfully.', 'green');
      }
    } catch (e) {
      showAlert(
        'An unexpected error occurred. Please try again later.',
        'tomato'
      );
    }
  };
  console.log('App component loaded');

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
    </div>
  );
};

export default ForgotPassword;
