import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  marginBottom: theme.spacing(4),
}));

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

const StepsPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[3],
}));

const ValidateUblHelp = () => {
  return (
    <ContentWrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        UBL VALIDATION
      </Typography>
      <VideoWrapper>
        <iframe
          src="https://www.youtube.com/embed/kiddMKPiQUw?mute=1"
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
            <ListItemText primary="Step 1: Upload your UBL file to the system." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 2: The system will automatically validate the UBL file." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 3: Check the validation report for any errors." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 4: If there are errors, correct them and re-upload the UBL file." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 5: Download the validation report as a PDF for your records." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 6: Once validation is successful, proceed with your business process." />
          </ListItem>
        </List>
      </StepsPaper>
    </ContentWrapper>
  );
};
export default ValidateUblHelp;
