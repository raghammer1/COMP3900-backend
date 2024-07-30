import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

// Styled Box component for the 404 page
const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}));

// Main component for the 404 page
const PageNotFound = () => {
  const [countdown, setCountdown] = useState(10); // State for countdown timer
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1); // Decrement countdown
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate('/dashboard/main'); // Redirect after 10 seconds
    }, 10000);

    return () => {
      clearInterval(timer); // Clear timer on component unmount
      clearTimeout(redirectTimeout); // Clear redirect timeout on component unmount
    };
  }, [navigate]);

  return (
    <StyledBox>
      <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: 80 }} />
      <Typography variant="h3" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Oops! Looks like this page is as lost as an unfiled invoice.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Redirecting to Home in {countdown} seconds...
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/dashboard/main')}
        sx={{ mt: 2 }}
      >
        Go to Home Now
      </Button>
    </StyledBox>
  );
};

export default PageNotFound;
