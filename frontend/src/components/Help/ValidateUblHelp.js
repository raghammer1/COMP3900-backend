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
  marginTop: '80px',
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

// This component represents the help section for UBL validation
const ValidateUblHelp = () => {
  return (
    <ContentWrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        UBL VALIDATION
      </Typography>
      <VideoWrapper>
        <iframe
          src="https://www.youtube.com/embed/kiddMKPiQUw?mute=1&controls=0&modestbranding=1"
          title="Help Video"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </VideoWrapper>
      <StepsPaper>
        <Typography variant="h6" component="h2" gutterBottom>
          Steps to Complete UBL Validation
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Step 1: Go to the Validate option on the Navbar." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 2: Click the plus (+) sign." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 3: Add the file name and choose the UBL you want to validate." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 4: If there are errors, correct them and re-upload the UBL file." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 5: Click on the created box and view the validation report." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 6: Furthermore, you can email, give access, download, and view the files in the chosen file's dashboard as well." />
          </ListItem>
        </List>
      </StepsPaper>
    </ContentWrapper>
  );
};

export default ValidateUblHelp;
