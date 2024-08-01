import React from 'react';
import { styled } from '@mui/system';

// This is a styled container for the input field
const InputContainer = styled('div')({
  position: 'relative',
  margin: '20px 0',
  width: '300px',
});

// This is a styled input field
const StyledInput = styled('input')({
  width: '100%',
  padding: '20px',
  border: '1px solid #ccc',
  fontSize: '16px',
  borderRadius: '8px',
  '&:focus': {
    outline: 'none',
    borderColor: '#007BFF',
  },
});

// This is a styled label for the input field
const InputLabel = styled('label')({
  position: 'absolute',
  top: '-10px',
  left: '10px',
  backgroundColor: '#fff',
  padding: '0 5px',
  fontSize: '13px',
  color: '#424242',
});

// This component represents a custom input box with a label
const CustomInputBox = ({
  value,
  setValue,
  style,
  placeholder,
  label,
  additionalStyles,
  dataTestId = null,
  ...props
}) => {
  // Function to handle the input change
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputContainer style={{ ...style, ...additionalStyles }}>
      <StyledInput
        data-testid={dataTestId}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        {...props}
      />
      <InputLabel>{label}</InputLabel>
    </InputContainer>
  );
};

export default CustomInputBox;
