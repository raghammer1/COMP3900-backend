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
import { useParams } from 'react-router-dom';
import { giveAccessPdfUbl } from '../../../services/api';
import usePdfStore from '../../../zustand/usePdfStore';

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

// Main component for managing access to PDF UBLs
const AccessManagerBoardPdfUbl = () => {
  const { id } = useParams(); // Retrieve the ID from URL parameters

  const [email, setEmail] = useState(''); // State for storing email input
  const [name, setName] = useState(''); // State for storing name input
  const [open, setOpen] = useState(false); // State for managing the dialog visibility
  const { showAlert } = useAlert(); // Hook for showing alerts

  const getPdfDataById = usePdfStore((state) => state.getPdfDataById); // Hook to retrieve PDF data by ID

  // Handler to open the dialog
  const handleClickOpen = () => {
    if (!validateEmail(email)) return showAlert('Invalid email', 'tomato'); // Validate email before proceeding
    const data = getPdfDataById(id); // Get PDF data by ID
    setName(data.name); // Set the name state with the PDF data name
    setOpen(true); // Open the dialog
  };

  // Handler to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handler to submit the access request
  const handleSubmit = async () => {
    const data = getPdfDataById(id); // Get PDF data by ID
    console.log(data, id);
    console.log('Access granted to:', email);

    const response = await giveAccessPdfUbl({
      email,
      ublId: data.ublId,
      validatorId: data.validatorId,
      pdfId: data.pdfId,
      validationHtml: data.validationHtml,
      validationJson: data.validationJson,
      name,
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
      <Typography variant="h4" gutterBottom>
        Access Manager
      </Typography>
      <FormContainer>
        <TextField
          data-testid={'access-manager-convert-email'}
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
        <Button
          data-testid={'access-manager-convert-submit'}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}>
          Give Access
        </Button>
      </FormContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to give access to {email}?
          </DialogContentText>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            data-testid={'access-manager-convert-submit-yes'}
            onClick={handleSubmit}
            color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AccessManagerContainer>
  );
};

export default AccessManagerBoardPdfUbl;
