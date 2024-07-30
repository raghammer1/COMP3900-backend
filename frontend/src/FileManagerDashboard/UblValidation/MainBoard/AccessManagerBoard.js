import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { validateEmail } from '../../../shared/validators';
import { useAlert } from '../../../components/AlertError';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { useParams } from 'react-router-dom';
import { giveAccessValidationUbl } from '../../../services/api';

// This is a styled container for the main Access Manager component
const AccessManagerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  height: '50vh',
  maxWidth: '600px',
}));

// This is a styled container for the form elements
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spacing(2),
}));

// This is the main component for managing access to validation UBLs
const AccessManagerBoard = () => {
  const { id } = useParams(); // Get the id from the URL parameters

  const [email, setEmail] = useState(''); // State to store email input
  const [name, setName] = useState(''); // State to store name input
  const [open, setOpen] = useState(false); // State to manage the dialog visibility
  const { showAlert } = useAlert(); // Hook to show alerts

  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  ); // Hook to get validator data by ID

  // Handler to open the dialog
  const handleClickOpen = () => {
    if (!validateEmail(email)) return showAlert('Invalid email', 'tomato'); // Validate email before proceeding
    const data = getValidatorDataById(id); // Get validator data by ID
    setName(data.name); // Set the name state with the validator data name
    setOpen(true); // Open the dialog
  };

  // Handler to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handler to submit the access request
  const handleSubmit = async () => {
    const data = getValidatorDataById(id); // Get validator data by ID
    console.log(data, id);
    console.log('Access granted to:', email);

    const response = await giveAccessValidationUbl({
      email,
      ublId: data.ublId,
      validatorId: data.validatorId,
      name,
      validationHtml: data.validationHtml,
      validationJson: data.validationJson,
    });

    setOpen(false); // Close the dialog after submission
    console.log(response, 'LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOL');

    // Show alert based on the response
    if (response.error) {
      showAlert(
        `${response.data.error ? response.data.error : 'Error giving access to the user'}`,
        'tomato'
      );
    } else {
      showAlert(
        `${response.data.message ? response.data.message : 'Access Granted'}`,
        'green'
      );
    }
  };

  return (
    <AccessManagerContainer>
      {/* Title for the Access Manager */}
      <Typography variant="h4" gutterBottom>
        Access Manager
      </Typography>
      <FormContainer>
        {/* Input field for email address */}
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Email of the user in app that you want to give access to">
                  <InfoIcon />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        {/* Button to open the dialog */}
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Give Access
        </Button>
      </FormContainer>
      {/* Dialog to confirm the access grant */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to give access to {email}?
          </DialogContentText>
          {/* Input field for name */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          {/* Button to cancel the access grant */}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* Button to confirm the access grant */}
          <Button onClick={handleSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AccessManagerContainer>
  );
};

export default AccessManagerBoard;
