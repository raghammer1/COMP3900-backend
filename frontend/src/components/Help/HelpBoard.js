import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import ValidateUblHelp from './ValidateUblHelp';
import ConvertPdfInvoice from './ConvertPdfInvoice';
import { AppBar, Toolbar, Button } from '@mui/material';
import ShareFilesHelp from './ShareFilesHelp';

// This is a styled container for the main content
const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  height: '80vh',
  overflowY: 'auto',
}));

// This is a styled AppBar for the navigation bar
const Navbar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: '-30px',
  backgroundColor: '#fff',
  color: 'white',
  zIndex: theme.zIndex.drawer + 1,
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

  return (
    <StyledContainer>
      <Navbar>
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Button to scroll to ValidateUblHelp section */}
          <Button
            color="inherit"
            onClick={() => scrollToSection(validateUblHelpRef)}
            style={{
              fontWeight: '900',
              backgroundColor: '#651fff',
              marginRight: '20px',
            }}
          >
            Validate UBL Help
          </Button>
          {/* Button to scroll to ConvertPdfInvoice section */}
          <Button
            color="inherit"
            onClick={() => scrollToSection(convertPdfInvoiceRef)}
            style={{
              fontWeight: '900',
              backgroundColor: '#651fff',
              marginRight: '20px',
            }}
          >
            Convert PDF Invoice
          </Button>
          {/* Button to scroll to ShareFilesHelp section */}
          <Button
            color="inherit"
            onClick={() => scrollToSection(shareFilesHelp)}
            style={{ fontWeight: '900', backgroundColor: '#651fff' }}
          >
            Share File Help
          </Button>
        </Toolbar>
      </Navbar>
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
