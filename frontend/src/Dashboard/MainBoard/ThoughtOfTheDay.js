import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { getThoughtOfTheDay } from '../../services/api';

const ThoughtContainer = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #000 0%, #651FFF 100%)',
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  maxWidth: '600px',
  margin: '20px auto',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ThoughtHeading = styled('h2')(({ theme }) => ({
  color: theme.palette.common.white,
  marginBottom: theme.spacing(2),
  fontSize: '24px',
  fontWeight: 'bold',
}));

const ThoughtText = styled('div')(({ theme }) => ({
  fontStyle: 'italic',
  color: theme.palette.common.white,
  fontSize: '18px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '20px',
  },
}));

// To display the thought of the day on the dashboard main page
const ThoughtOfTheDay = () => {
  const [thought, setThought] = useState('');

  // API to get the latest thought of the day
  useEffect(() => {
    const fetchThoughtOfTheDay = async () => {
      const thoughtData = await getThoughtOfTheDay();
      setThought(thoughtData.data);
    };
    fetchThoughtOfTheDay();
  }, []);

  return (
    <ThoughtContainer>
      <ThoughtHeading>Thought of the Day</ThoughtHeading>
      <ThoughtText>{thought}</ThoughtText>
    </ThoughtContainer>
  );
};

export default ThoughtOfTheDay;
