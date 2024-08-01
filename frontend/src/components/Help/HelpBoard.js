import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import ValidateUblHelp from './ValidateUblHelp';
import ConvertPdfInvoice from './ConvertPdfInvoice';
import ShareFilesHelp from './ShareFilesHelp';
import { Select, MenuItem, FormControl } from '@mui/material';

// This is a styled container for the main content
const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  height: '80vh',
  overflowY: 'auto',
}));

// This is a styled section for individual help components
const Section = styled('div')(({ theme }) => ({}));

// This component represents the help board with different sections
const HelpBoard = () => {
  const validateUblHelpRef = useRef(null); // Reference for ValidateUblHelp section
  const convertPdfInvoiceRef = useRef(null); // Reference for ConvertPdfInvoice section
  const shareFilesHelp = useRef(null); // Reference for ShareFilesHelp section

  // Function to scroll to a specific section smoothly
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler for dropdown menu selection
  const handleSelectChange = (event) => {
    const sectionMap = {
      validateUblHelp: validateUblHelpRef,
      convertPdfInvoice: convertPdfInvoiceRef,
      shareFilesHelp: shareFilesHelp,
    };
    scrollToSection(sectionMap[event.target.value]);
  };

  return (
    <StyledContainer>
      <FormControl
        variant="outlined"
        sx={{
          position: 'sticky',
          top: '0px',
          right: '20px',
          zIndex: 999,
          alignSelf: 'flex-end',
        }}
      >
        <Select
          displayEmpty
          defaultValue=""
          onChange={handleSelectChange}
          sx={{
            fontWeight: '900',
            backgroundColor: '#651fff',
            color: '#fff',
            '& .MuiSelect-icon': {
              color: '#fff',
            },
          }}
        >
          <MenuItem value="" disabled>
            Go to...
          </MenuItem>
          <MenuItem value="validateUblHelp">Validate UBL Help</MenuItem>
          <MenuItem value="convertPdfInvoice">Convert PDF Invoice</MenuItem>
          <MenuItem value="shareFilesHelp">Share File Help</MenuItem>
        </Select>
      </FormControl>
      {/* Section for ValidateUblHelp */}
      <Section ref={validateUblHelpRef}>
        <ValidateUblHelp />
      </Section>
      {/* Section for ConvertPdfInvoice */}
      <Section ref={convertPdfInvoiceRef}>
        <ConvertPdfInvoice />
      </Section>
      {/* Section for ShareFilesHelp */}
      <Section ref={shareFilesHelp}>
        <ShareFilesHelp />
      </Section>
    </StyledContainer>
  );
};

export default HelpBoard;
