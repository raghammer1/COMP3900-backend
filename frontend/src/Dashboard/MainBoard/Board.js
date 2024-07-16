import React from 'react';
import { styled } from '@mui/material/styles';
import useUserStore from '../../zustand/useUserStore';
import Weather from './Weather';
import ThoughtOfTheDay from './ThoughtOfTheDay';

const BoardContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[3],
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  justifyContent: 'space-around',
  height: '80vh',
  overflow: 'auto',
  width: '80%',
}));

const Heading = styled('h1')(({ theme }) => ({
  color: '#000',
  margin: theme.spacing(2, 0),
}));

const SubHeading = styled('h1')(({ theme }) => ({
  color: '#000',
  margin: theme.spacing(1, 0),
}));

// The main dashboard that is displayed on user login
const Board = () => {
  const { getUser } = useUserStore();

  return (
    <BoardContainer>
      <Weather />
      <div>
        <Heading>
          G'Day <span style={{ color: '#651FFF' }}>{getUser().username}</span>
        </Heading>
        <SubHeading>Welcome Back to your personal E-manager</SubHeading>
      </div>
      <ThoughtOfTheDay />
    </BoardContainer>
  );
};

export default Board;
