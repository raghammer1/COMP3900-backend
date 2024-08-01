import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate, useParams } from 'react-router-dom';
import SelectorLinks from '../../../components/SelectorLinks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HelpIcon from '@mui/icons-material/Help';
import ShareIcon from '@mui/icons-material/Share';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';

// Styled container for the selectors
const SelectorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
  alignContent: 'center',
}));

// Styled container for the first group of selectors
const SelectorContainer1 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

// Styled container for the second group of selectors
const SelectorContainer2 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

// Styled button for logging out
const StyledLogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#555555',
  color: '#fff',
  marginTop: '5px',
  width: '100%',
  alignSelf: 'center',
  '&:hover': {
    backgroundColor: '#333333',
  },
}));

// Main component for rendering all selectors
const AllSelectors = ({ setDrawerOpen }) => {
  const { file, id } = useParams(); // Get file and id from URL parameters
  const [selectedRoute, setSelectedRoute] = useState(''); // State for storing selected route

  const nav = useNavigate(); // Hook for navigation

  // Handler to navigate to the dashboard
  const handleGotoDashboard = () => {
    nav('/dashboard/convert');
    return;
  };

  // Effect to set the selected route based on the file type
  useEffect(() => {
    if (file === 'pdf') {
      setSelectedRoute(`/handle-files/convertion-reports/pdf/${id}`);
    } else if (file === 'ubl') {
      setSelectedRoute(`/handle-files/convertion-reports/ubl/${id}`);
    } else if (file === 'validate') {
      setSelectedRoute(`/handle-files/convertion-reports/validate/${id}`);
    } else if (file === 'help') {
      setSelectedRoute(`/handle-files/convertion-reports/help/${id}`);
    } else if (file === 'share') {
      setSelectedRoute(`/handle-files/convertion-reports/share/${id}`);
    } else if (file === 'access') {
      setSelectedRoute(`/handle-files/convertion-reports/access/${id}`);
    } else if (file === 'email-history') {
      setSelectedRoute(`/handle-files/convertion-reports/email-history/${id}`);
    } else {
      setSelectedRoute(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <SelectorContainer>
      <SelectorContainer1>
        <SelectorLinks
          dataTestId={'file-manager-convert-pdf'}
          routeTo={`/handle-files/convertion-reports/pdf/${id}`}
          text="Invoice Pdf"
          isSelected={
            selectedRoute === `/handle-files/convertion-reports/pdf/${id}`
          }
          onClick={() => {
            setSelectedRoute(`/handle-files/convertion-reports/pdf/${id}`);
            setDrawerOpen(false);
          }}
          icon={<ReceiptIcon />}
        />
        <SelectorLinks
          dataTestId={'file-manager-convert-ubl'}
          routeTo={`/handle-files/convertion-reports/ubl/${id}`}
          text="UBL"
          isSelected={
            selectedRoute === `/handle-files/convertion-reports/ubl/${id}`
          }
          onClick={() => {
            setSelectedRoute(`/handle-files/convertion-reports/ubl/${id}`);
            setDrawerOpen(false);
          }}
          icon={<DescriptionIcon />}
        />
        <SelectorLinks
          dataTestId={'file-manager-convert-validate'}
          routeTo={`/handle-files/convertion-reports/validate/${id}`}
          text="Validation Report"
          isSelected={
            selectedRoute === `/handle-files/convertion-reports/validate/${id}`
          }
          onClick={() => {
            setSelectedRoute(`/handle-files/convertion-reports/validate/${id}`);
            setDrawerOpen(false);
          }}
          icon={<CheckCircleIcon />}
        />
        <SelectorLinks
          dataTestId={'file-manager-convert-share'}
          routeTo={`/handle-files/convertion-reports/share/${id}`}
          text="Share"
          isSelected={
            selectedRoute === `/handle-files/convertion-reports/share/${id}`
          }
          onClick={() => {
            setSelectedRoute(`/handle-files/convertion-reports/share/${id}`);
            setDrawerOpen(false);
          }}
          icon={<ShareIcon />}
        />
        <SelectorLinks
          dataTestId={'file-manager-convert-access'}
          routeTo={`/handle-files/convertion-reports/access/${id}`}
          text="Access"
          isSelected={
            selectedRoute === `/handle-files/convertion-reports/access/${id}`
          }
          onClick={() => {
            setSelectedRoute(`/handle-files/convertion-reports/access/${id}`);
            setDrawerOpen(false);
          }}
          icon={<LockOpenIcon />}
        />
        <SelectorLinks
          dataTestId={'file-manager-convert-email-history'}
          routeTo={`/handle-files/convertion-reports/email-history/${id}`}
          text="Email History"
          isSelected={
            selectedRoute ===
            `/handle-files/convertion-reports/email-history/${id}`
          }
          onClick={() => {
            setSelectedRoute(
              `/handle-files/convertion-reports/email-history/${id}`
            );
            setDrawerOpen(false);
          }}
          icon={<EmailIcon />}
        />
      </SelectorContainer1>
      <SelectorContainer2>
        <SelectorLinks
          dataTestId={'file-manager-convert-help'}
          routeTo={`/handle-files/convertion-reports/help/${id}`}
          text="Help"
          isSelected={
            selectedRoute === `/handle-files/convertion-reports/help/${id}`
          }
          onClick={() => {
            setSelectedRoute(`/handle-files/convertion-reports/help/${id}`);
            setDrawerOpen(false);
          }}
          icon={<HelpIcon />}
        />
        <StyledLogoutButton
          variant="contained"
          startIcon={<DashboardIcon />}
          onClick={handleGotoDashboard}
          data-testid={'dashboard-button'}>
          Dashboard
        </StyledLogoutButton>
      </SelectorContainer2>
    </SelectorContainer>
  );
};

export default AllSelectors;
