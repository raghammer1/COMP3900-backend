import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailIcon from '@mui/icons-material/Email';
import { styled, keyframes } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';

// Custom styles for icons
const iconStyle = {
  fontSize: 60,
  color: '#651FFF',
};

// Custom styles for paper components with hover effects
const paperStyle = {
  p: 2,
  textAlign: 'center',
  bgcolor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  border: '2px solid transparent',
  transition:
    'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
  ':hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    borderColor: '#651FFF',
  },
};

// Keyframes for typing animation
const typing = keyframes`
  from { width: 0; }
  50% { width: 100%; }
  to { width: 100%; }
`;

// Keyframes for blinking cursor animation
const blinkingCursor = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: #651FFF; }
`;

// Styled Typography component with typing and blinking cursor animation
const AnimatedTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '0',
  textAlign: 'center',
  margin: 'auto',
  borderRight: '3px solid #651FFF',
  animation: `${typing} 8s steps(40, end) 1, ${blinkingCursor} 0.75s step-end infinite`,
  '@media (min-width:600px)': {
    width: '100%', // Ensures that text is centered for larger screens
  },
}));

// Styled Typography component for description text
const DescriptionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: 'white',
  textAlign: 'center',
}));

// Main component for the process section
const Process = () => {
  const [resetAnimation, setResetAnimation] = useState(false); // State to toggle animation
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');

  useEffect(() => {
    const interval = setInterval(() => {
      setResetAnimation((prev) => !prev); // Toggle to reset animation
    }, 2000); // Adjust the interval to be longer than the animation duration

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      sx={{
        mt: 4,
        bgcolor: 'black',
        color: 'white',
        pb: 4,
        width: '100vw',
        paddingTop: isSmallScreen ? '60px' : '',
      }}
    >
      <AnimatedTypography
        variant="h4"
        component="h1"
        gutterBottom
        key={resetAnimation}
      >
        How it works...?
      </AnimatedTypography>
      <DescriptionText variant="subtitle1">
        <b>
          Hexahunks removes complexity and offers a simple interface that allows
          users to take advantage of the vast array of decentralized storage
          with better security, performance, and pricing.
        </b>
      </DescriptionText>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Box sx={{ color: '#651FFF' }}>
              <AccountCircleIcon style={iconStyle} />
            </Box>
            <Typography variant="h6" component="h3">
              Create an account
            </Typography>
            <Typography variant="body1">
              Create an Hex account and start uploading your files.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Box sx={{ color: '#651FFF' }}>
              <CloudUploadIcon style={iconStyle} />
            </Box>
            <Typography variant="h6" component="h3">
              Upload your files
            </Typography>
            <Typography variant="body1">
              Your file and encrypted and converted to UBL 2.0
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={paperStyle}>
            <Box sx={{ color: '#651FFF' }}>
              <EmailIcon style={iconStyle} />
            </Box>
            <Typography variant="h6" component="h3">
              Share file instantly
            </Typography>
            <Typography variant="body1">
              Send your file via email or shareable link with password protect
              and expiration time.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Process;
