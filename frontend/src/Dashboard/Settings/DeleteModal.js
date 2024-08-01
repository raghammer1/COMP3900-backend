import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import useUserStore from '../../zustand/useUserStore';

// Component to display a delete confirmation modal
const DeleteModal = ({
  open, // Indicates if the modal is open
  handleClose, // Function to handle closing the modal
  setPassword, // Function to set the password state
  password, // Password value from state
  handleConfirmDelete, // Function to handle the delete confirmation
  username, // Username value from state
  setUsername, // Function to set the username state
}) => {
  const { getUser } = useUserStore();
  const user = getUser(); // Gets the current user data from the store

  // Here, we return the JSX for rendering the delete confirmation modal
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? This action cannot be
          undone. ({user?.username})
        </DialogContentText>
      </DialogContent>
      {user?.googleId ? (
        <CustomInputBox
          style={{ marginLeft: '70px', marginBottom: '30px', width: '70%' }}
          label="Enter Username"
          type="text"
          setValue={setUsername}
          value={username}
        />
      ) : (
        <CustomInputBox
          dataTestId={'delete-user-password-final'}
          style={{ marginLeft: '70px', marginBottom: '30px', width: '70%' }}
          placeholder="########"
          label="Password"
          type="password"
          setValue={setPassword}
          value={password}
        />
      )}
      <DialogActions
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '10px',
        }}>
        <CustomPrimaryButton
          label="Cancel"
          bgcolour="#666"
          additionalStyle={{
            width: '40%',
            height: '45px',
            fontSize: '15px',
          }}
          onClick={handleClose}
        />
        <CustomPrimaryButton
          dataTestid={'submit-delete-user-button'}
          label="Confirm"
          bgcolour="#651FFF"
          additionalStyle={{
            width: '40%',
            height: '45px',
            fontSize: '15px',
          }}
          onClick={handleConfirmDelete}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
