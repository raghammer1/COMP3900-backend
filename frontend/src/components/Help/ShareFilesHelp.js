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

// This component represents the help section for sharing files
const ShareFilesHelp = () => {
  return (
    <ContentWrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        Share File
      </Typography>
      <VideoWrapper>
        <iframe
          src="https://www.youtube.com/embed/qxCD-y4y8wQ?mute=1&controls=0&modestbranding=1"
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
            <ListItemText primary="Step 1: Go to the record you want to share." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 2: Go to the Share option to email or the Access option to share in app." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 3: For access option type the email of a registered user and give them access to the record, it will appear on there dashboard as well." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 4: For the Share option give users email (required), body and subject (optional) and finally select the files you want to send." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 5: Click on the send button and email with the attachments will be sent to the users email." />
          </ListItem>
        </List>
      </StepsPaper>
    </ContentWrapper>
  );
};

export default ShareFilesHelp;
