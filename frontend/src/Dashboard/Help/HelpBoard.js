import React from 'react';
import { styled } from '@mui/material/styles';
import ValidateUblHelp from './ValidateUblHelp';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  height: '80vh',
  overflowY: 'auto',
}));

const HelpBoard = () => {
  return (
    <StyledContainer>
      <ValidateUblHelp />
    </StyledContainer>
  );
};

export default HelpBoard;
