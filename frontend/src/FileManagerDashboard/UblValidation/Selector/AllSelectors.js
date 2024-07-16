import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SelectorLinks from '../../../components/SelectorLinks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HelpIcon from '@mui/icons-material/Help';
import ShareIcon from '@mui/icons-material/Share';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const SelectorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
  alignContent: 'center',
}));

const SelectorContainer1 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

const SelectorContainer2 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

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

const AllSelectors = () => {
  const { file, id } = useParams();
  const [selectedRoute, setSelectedRoute] = useState('');

  const nav = useNavigate();

  const handleGotoDashboard = () => {
    nav('/dashboard/validate');
    return;
  };

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
    } else {
      setSelectedRoute(null);
    }
  }, [file]);

  return (
    <SelectorContainer>
      <SelectorContainer1>
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
      </SelectorContainer1>
      <SelectorContainer2>
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
