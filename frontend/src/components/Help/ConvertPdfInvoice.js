import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

// This is a styled container for the main content wrapper
const ContentWrapper = styled(Box)(({ theme }) => ({
  marginTop: '90px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  marginBottom: theme.spacing(4),
}));

// This is a styled container for the video wrapper
const VideoWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(4, 0),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '& iframe': {
    width: '100%',
    height: '465px',
    border: 'none',
  },
}));

// This is a styled Paper component for the steps list
const StepsPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[3],
}));

// This component represents the PDF to UBL conversion help section
const ConvertPdfInvoice = () => {
  return (
    <ContentWrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        PDF - UBL CONVERSION
      </Typography>
      <VideoWrapper>
        <iframe
          src="https://www.youtube.com/embed/RjL9WbztOOY?mute=1&controls=0&modestbranding=1"
          title="Help Video"
          allowFullScreen
        ></iframe>
      </VideoWrapper>
      <StepsPaper>
        <Typography variant="h6" component="h2" gutterBottom>
          Steps to Complete UBL Validation
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Step 1: Go to the Convert option on the Navbar." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 2: Click the plus (+) sign." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 3: Add the file name, give the customers and vendors GLN numbers and choose the PDF you want to convert." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 4: Click submit and convertion will start." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 5: Click on the created box and view the newly generated UBL." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 6: A validation report will also be generated to tell you about the extra info that might be required to create a valid UBL." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 7: Further more you can email, give access, download and view the files in the chosen file's dashboard as well." />
          </ListItem>
        </List>
      </StepsPaper>
    </ContentWrapper>
  );
};

export default ConvertPdfInvoice;
