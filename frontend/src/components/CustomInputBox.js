import React from 'react';
import { styled } from '@mui/system';

const InputContainer = styled('div')({
  position: 'relative',
  margin: '20px 0',
  width: '300px',
});

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

const InputLabel = styled('label')({
  position: 'absolute',
  top: '-10px',
  left: '10px',
  backgroundColor: '#fff',
  padding: '0 5px',
  fontSize: '13px',
  color: '#424242',
});

const CustomInputBox = ({
  value,
  setValue,
  style,
  placeholder,
  label,
  ...props
}) => {
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <InputContainer style={style}>
      <StyledInput
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
