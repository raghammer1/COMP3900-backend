import React from 'react';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';

// This component is a for a consistent button design in the application
const CustomPrimaryButton = ({
  label, // The text label of the button
  additionalStyle, // Additional custom styles for the button
  disabled, // Boolean to determine if the button is disabled
  onClick, // Function to handle button click events
  dataTestid, // Data-testid for testing purposes
  bgcolour, // Background color of the button
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: bgcolour,
        color: `${bgcolour === '#ffffff' ? '#000' : '#fff'}`,
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
        '&:hover': {
          bgcolor: darken(bgcolour, 0.2),
        },
        '&:disabled': {
          color: '#666',
        },
      }}
      style={additionalStyle || {}}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestid || ''}
    >
      {label}
    </Button>
  );
};
export default CustomPrimaryButton;
