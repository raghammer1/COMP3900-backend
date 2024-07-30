import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// This is a styled Link component with custom styles based on the isSelected prop
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

// This component represents a link with optional icon and styling, useful for navigation
const SelectorLinks = ({
  routeTo, // The route to navigate to
  text, // The text to display
  isSelected, // Boolean to determine if the link is selected
  onClick, // Function to handle click events
  additionalStyle, // Additional custom styles for the link
  icon, // Optional icon to display alongside the text
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
