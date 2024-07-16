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

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spacing(2),
}));

const AccessManagerBoard = () => {
  const { id } = useParams();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();

  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  );

  const handleClickOpen = () => {
    if (!validateEmail(email)) return showAlert('Invalid email', 'tomato');
    const data = getValidatorDataById(id);
    setName(data.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = getValidatorDataById(id);
    console.log(data, id);
    console.log('Access granted to:', email);

    const response = await giveAccessValidationUbl({
      email,
      ublId: data.ublId,
      validatorId: data.validatorId,
      name,
    });

    setOpen(false);
    console.log(response, 'LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOL');

    if (response.error) {
      showAlert(`${response.data.message}`, 'tomato');
    } else {
      showAlert(`${response.data.message}`, 'green');
    }
  };

  return (
    <AccessManagerContainer>
      <Typography variant="h4" gutterBottom>
        Access Manager
      </Typography>
      <FormContainer>
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
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
          <Button onClick={handleSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AccessManagerContainer>
  );
};

export default AccessManagerBoard;
