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
import EmailIcon from '@mui/icons-material/Email';

// This container holds all the selectors
const SelectorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
  alignContent: 'center',
}));

// This container holds the first set of selector links
const SelectorContainer1 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

// This container holds the second set of selector links
const SelectorContainer2 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

// Styled button for logging out and going to the dashboard
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

// This is the main component for displaying all selectors
const AllSelectors = () => {
  const { file, id } = useParams(); // Get the file and id from URL parameters
  const [selectedRoute, setSelectedRoute] = useState(''); // State to store the selected route

  const navigate = useNavigate(); // Hook for navigation

  // Handler to navigate to the dashboard
  const handleGotoDashboard = () => {
    navigate('/dashboard/validate');
  };

  // Effect to update the selected route based on the file parameter
  useEffect(() => {
    if (file === 'ubl') {
      setSelectedRoute(`/handle-files/validation-reports/ubl/${id}`);
    } else if (file === 'validate') {
      setSelectedRoute(`/handle-files/validation-reports/validate/${id}`);
    } else if (file === 'help') {
      setSelectedRoute(`/handle-files/validation-reports/help/${id}`);
    } else if (file === 'share') {
      setSelectedRoute(`/handle-files/validation-reports/share/${id}`);
    } else if (file === 'access') {
      setSelectedRoute(`/handle-files/validation-reports/access/${id}`);
    } else if (file === 'email-history') {
      setSelectedRoute(`/handle-files/validation-reports/email-history/${id}`);
    } else {
      setSelectedRoute(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <SelectorContainer>
      <SelectorContainer1>
        {/* Link to UBL validation report */}
        <SelectorLinks
          routeTo={`/handle-files/validation-reports/ubl/${id}`}
          text="UBL"
          isSelected={
            selectedRoute === `/handle-files/validation-reports/ubl/${id}`
          }
          onClick={() =>
            setSelectedRoute(`/handle-files/validation-reports/ubl/${id}`)
          }
          icon={<ReceiptIcon />}
        />
        {/* Link to validation report */}
        <SelectorLinks
          routeTo={`/handle-files/validation-reports/validate/${id}`}
          text="Validation Report"
          isSelected={
            selectedRoute === `/handle-files/validation-reports/validate/${id}`
          }
          onClick={() =>
            setSelectedRoute(`/handle-files/validation-reports/validate/${id}`)
          }
          icon={<CheckCircleIcon />}
        />
        {/* Link to share the validation report */}
        <SelectorLinks
          routeTo={`/handle-files/validation-reports/share/${id}`}
          text="Share"
          isSelected={
            selectedRoute === `/handle-files/validation-reports/share/${id}`
          }
          onClick={() =>
            setSelectedRoute(`/handle-files/validation-reports/share/${id}`)
          }
          icon={<ShareIcon />}
        />
        {/* Link to access control for the validation report */}
        <SelectorLinks
          routeTo={`/handle-files/validation-reports/access/${id}`}
          text="Access"
          isSelected={
            selectedRoute === `/handle-files/validation-reports/access/${id}`
          }
          onClick={() =>
            setSelectedRoute(`/handle-files/validation-reports/access/${id}`)
          }
          icon={<LockOpenIcon />}
        />
        {/* Link to email history of the validation report */}
        <SelectorLinks
          routeTo={`/handle-files/validation-reports/email-history/${id}`}
          text="Email History"
          isSelected={
            selectedRoute ===
            `/handle-files/validation-reports/email-history/${id}`
          }
          onClick={() =>
            setSelectedRoute(
              `/handle-files/validation-reports/email-history/${id}`
            )
          }
          icon={<EmailIcon />}
        />
      </SelectorContainer1>
      <SelectorContainer2>
        {/* Link to help section */}
        <SelectorLinks
          routeTo={`/handle-files/validation-reports/help/${id}`}
          text="Help"
          isSelected={
            selectedRoute === `/handle-files/validation-reports/help/${id}`
          }
          onClick={() =>
            setSelectedRoute(`/handle-files/validation-reports/help/${id}`)
          }
          icon={<HelpIcon />}
        />
        {/* Button to go to the dashboard */}
        <StyledLogoutButton
          variant="contained"
          startIcon={<DashboardIcon />}
          onClick={handleGotoDashboard}
          data-testid={'logout-button'}
        >
          Dashboard
        </StyledLogoutButton>
      </SelectorContainer2>
    </SelectorContainer>
  );
};

export default AllSelectors;
