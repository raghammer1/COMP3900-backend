import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// This is a styled div that acts like a link
const StyledLink = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

// This component represents a logo that navigates to a specified link when clicked
const SelectorLogo = ({ link }) => {
  const nav = useNavigate(); // Hook to navigate programmatically

  // Function to navigate to the specified link
  const handleGoToDashboard = () => {
    nav(link);
  };

  return (
    <StyledLink onClick={handleGoToDashboard}>
      <img
        src={`${process.env.PUBLIC_URL}/hexahunkLogoBlack.png`}
        alt="icon"
        style={{
          width: '42px',
          height: '42px',
          verticalAlign: 'middle',
          marginRight: '8px',
        }}
        loading="lazy"
      />
      <h1 style={{ fontSize: '32px' }}>HexaHunks.</h1>
    </StyledLink>
  );
};

export default SelectorLogo;
