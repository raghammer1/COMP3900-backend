import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledLink = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const SelectorLogo = ({ link }) => {
  const nav = useNavigate();
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
