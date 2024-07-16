import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import SelectorLinks from '../../components/SelectorLinks';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Button from '@mui/material/Button';

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
    backgroundColor: '#D50000',
  },
}));

// The component that contains the left hand side selectors on the
// main dashboard for users navigation on the main dashboard
const MainSelectors = ({ handleLogout }) => {
  const { process } = useParams();
  const [selectedRoute, setSelectedRoute] = useState('');

  // Checks the params and sets the mani board accordingly for the main dashboard
  useEffect(() => {
    if (process === 'main') {
      setSelectedRoute('/dashboard/main');
    } else if (process === 'validate') {
      setSelectedRoute('/dashboard/validate');
    } else if (process === 'convert') {
      setSelectedRoute('/dashboard/convert');
    } else if (process === 'settings') {
      setSelectedRoute('/dashboard/settings');
    } else if (process === 'help') {
      setSelectedRoute('/dashboard/help');
    } else {
      setSelectedRoute(null);
    }
  }, [process]);

  return (
    <SelectorContainer>
      <SelectorContainer1>
        <SelectorLinks
          routeTo="/dashboard/main"
          text="Dashboard"
          isSelected={selectedRoute === '/dashboard/main'}
          onClick={() => setSelectedRoute('/dashboard/main')}
          icon={<DashboardIcon />}
        />
        <SelectorLinks
          routeTo="/dashboard/validate"
          text="Validate"
          isSelected={selectedRoute === '/dashboard/validate'}
          onClick={() => setSelectedRoute('/dashboard/validate')}
          icon={<CheckCircleIcon />}
        />
        <SelectorLinks
          routeTo="/dashboard/convert"
          text="Invoices"
          isSelected={selectedRoute === '/dashboard/convert'}
          onClick={() => setSelectedRoute('/dashboard/convert')}
          icon={<ReceiptIcon />}
        />
        <SelectorLinks
          routeTo="/dashboard/settings"
          text="Settings"
          isSelected={selectedRoute === '/dashboard/settings'}
          onClick={() => setSelectedRoute('/dashboard/settings')}
          additionalStyle={{ marginTop: '50px' }}
          icon={<SettingsIcon />}
        />
      </SelectorContainer1>
      <SelectorContainer2>
        <SelectorLinks
          routeTo="/dashboard/help"
          text="Help"
          isSelected={selectedRoute === '/dashboard/help'}
          onClick={() => setSelectedRoute('/dashboard/help')}
          icon={<HelpIcon />}
        />
        <StyledLogoutButton
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          data-testid={'logout-button'}
        >
          Logout
        </StyledLogoutButton>
      </SelectorContainer2>
    </SelectorContainer>
  );
};

export default MainSelectors;
