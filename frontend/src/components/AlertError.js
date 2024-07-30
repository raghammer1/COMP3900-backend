import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';

// Creating a context for the alert system
const AlertContext = createContext();

// Keyframes for the drop-down animation
const dropDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0.3;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// This is a styled SnackbarContent component to customize its appearance
const StyledSnackbarContent = styled(SnackbarContent)(
  ({ theme, bgcolor2 }) => ({
    backgroundColor:
      bgcolor2 === 'tomato'
        ? 'tomato'
        : bgcolor2 === 'green'
          ? 'green'
          : null || 'black',
    display: 'flex',
    alignItems: 'center',
    animation: `${dropDown} 0.5s ease-out`,
  })
);

// Custom hook to use the alert context
export const useAlert = () => useContext(AlertContext);

// This is the provider component that wraps around parts of the app that need alerts
export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    bgColor2: 'default',
  });

  // Function to show an alert with a message and optional background color
  const showAlert = (message, bgColor2 = 'default') => {
    setAlertState({
      open: true,
      message,
      bgColor2,
    });
  };

  // Function to handle closing the alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const getIcon = (bgColor2) => {
    switch (bgColor2) {
      case 'tomato':
        return <ErrorIcon style={{ marginRight: 8, color: '#fff' }} />;
      case 'green':
        return <CheckCircleIcon style={{ marginRight: 8, color: '#fff' }} />;
      default:
        return <HelpIcon style={{ marginRight: 8, color: '#fff' }} />;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Snackbar component to display the alert */}
      <Snackbar
        open={alertState.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledSnackbarContent
          bgcolor2={alertState.bgColor2}
          message={
            <span
              id="client-snackbar"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {getIcon(alertState.bgColor2)}
              {alertState.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </AlertContext.Provider>
  );
};
