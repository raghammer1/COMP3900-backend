import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ isSelected }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: isSelected ? '#651FFF' : '#FFF',
  color: isSelected ? '#FFF' : '#000',
  textDecoration: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  marginBottom: '10px',
  borderRadius: '4px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: isSelected ? '#651FFF' : '#f0f0f0',
  },
}));

const SelectorLinks = ({
  routeTo,
  text,
  isSelected,
  onClick,
  additionalStyle,
  icon,
}) => {
  return (
    <StyledLink
      to={routeTo}
      isSelected={isSelected}
      onClick={onClick}
      style={additionalStyle}
    >
      {icon}
      <span style={{ marginLeft: '10px' }}>{text}</span>
    </StyledLink>
  );
};

export default SelectorLinks;
