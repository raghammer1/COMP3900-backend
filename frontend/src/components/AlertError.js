import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

const AlertContext = createContext();

const StyledSnackbarContent = styled(SnackbarContent)(
  ({ theme, bgcolor2 }) => ({
    backgroundColor: bgcolor2 || theme.palette.primary.main,
  })
);

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    bgColor2: 'default',
  });

  const showAlert = (message, bgColor2 = 'default') => {
    setAlertState({
      open: true,
      message,
      bgColor2,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alertState.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledSnackbarContent
          bgcolor2={alertState.bgColor2}
          message={<span id="client-snackbar">{alertState.message}</span>}
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
