import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import {
  downloadHTML,
  downloadJSON,
  downloadPDF,
} from '../../shared/downloadFunctions';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';

// This is a styled Card component for displaying email history details
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  backgroundColor: '#fff',
  color: '#1e1e1e',
  borderColor: '#651FFF',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  overflow: 'hidden',
}));

// This is a styled CardContent component for better padding and layout
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px',
}));

// This is a styled Typography component for consistent text styling
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#1e1e1e',
}));

// This is a styled Typography component for highlighted text
const HighlightedText = styled(Typography)(({ theme }) => ({
  color: '#651FFF',
  display: 'inline',
}));

// This is the EmailHistoryCard component which shows details of an email
const EmailHistoryCard = ({ email }) => {
  return (
    <StyledCard variant="outlined">
      <StyledCardContent>
        {/* Displaying the email subject */}
        <StyledTypography
          variant="h5"
          style={{
            marginBottom: '16px',
            fontWeight: '550',
            letterSpacing: '1px',
          }}
        >
          {email.subject}
        </StyledTypography>

        {/* Displaying the email address */}
        <StyledTypography variant="body1">
          <strong>Email:</strong>{' '}
          <HighlightedText>{email.email}</HighlightedText>
        </StyledTypography>

        {/* Displaying the date */}
        <StyledTypography variant="body1">
          <strong>Date:</strong>{' '}
          <HighlightedText>
            {new Date(email.date).toLocaleString()}
          </HighlightedText>
        </StyledTypography>

        {/* Displaying the email body */}
        <StyledTypography variant="body1">
          <strong>Body:</strong> <HighlightedText>{email.body}</HighlightedText>
        </StyledTypography>

        {/* Displaying the file types shared */}
        <StyledTypography variant="body1">
          <strong>File Shared:</strong>{' '}
          <HighlightedText>{email.fileTypes.join(', ')}</HighlightedText>
        </StyledTypography>

        {/* Displaying the email report section */}
        <StyledTypography
          variant="body1"
          style={{ marginTop: '20px', marginBottom: '-15px' }}
        >
          <strong>Email Report:</strong>
        </StyledTypography>

        {/* Displaying buttons for downloading the email report in different formats */}
        <Box sx={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <CustomPrimaryButton
            label="Download PDF"
            bgcolour="#651FFF"
            additionalStyle={{
              width: 'fit-content',
              height: '50px',
              fontSize: '15px',
            }}
            onClick={() => downloadPDF(email)}
            dataTestid={'login-submit'}
          />
          <CustomPrimaryButton
            label="Download HTML"
            bgcolour="#fff"
            additionalStyle={{
              width: 'fit-content',
              height: '50px',
              fontSize: '15px',
              color: '#651FFF',
            }}
            onClick={() => downloadHTML(email)}
            dataTestid={'login-submit'}
          />
          <CustomPrimaryButton
            label="Download JSON"
            bgcolour="#222"
            additionalStyle={{
              width: 'fit-content',
              height: '50px',
              fontSize: '15px',
              color: '#fff',
            }}
            onClick={() => downloadJSON(email)}
            dataTestid={'login-submit'}
          />
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default EmailHistoryCard;
