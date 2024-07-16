import React from 'react';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';

const CustomPrimaryButton = ({
  label,
  additionalStyle,
  disabled,
  onClick,
  dataTestid,
  bgcolour,
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
