import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/system';
import {
  useMediaQuery,
  Drawer,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Selector from './Selector/Selector';
import Board from './MainBoard/Board';
import { useNavigate, useParams } from 'react-router-dom';
import PdfUploadBoard from './MainBoard/PdfUpload/PdfUploadBoard';
import ValidateBoard from './MainBoard/ValidateBoard/ValidateBoard';
import useUserStore from '../zustand/useUserStore';
import SettingsBoard from './Settings/SettingsBoard';
import HelpBoard from './Help/HelpBoard';
import ProfileBoard from './Profile/ProfileBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Container = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
}));

const ProfileAvatar = styled(Avatar)({
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  margin: 'auto',
  marginRight: '10px',
});

const Username = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '17px',
  fontWeight: '600',
  fontFamily: 'Roboto, sans-serif',
  padding: '8px 12px',
  borderRadius: '30px',
  background: '#ffffff',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.1s ease-in-out',
  '&:hover': {
    background: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },

  '& svg': {
    marginRight: '5px',
    fontSize: '1.2rem',
  },
}));

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: '240px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '240px',
    boxSizing: 'border-box',
  },
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  height: '10vh',
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  justifyContent: 'right',

  '@media (max-width: 1200px)': {
    justifyContent: 'space-between',
    right: '10%',
  },
}));

// Main dashboard component where user comes first to interact with the app
const Dashboard = () => {
  // to handle media queries
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Get user info
  const { getUser } = useUserStore();
  const user = getUser();
  const username = user.username;

  const { process } = useParams();

  const nav = useNavigate();

  // To go to the profile page
  const handleOpenProfile = () => {
    nav(`/profile/${user._id}`);
  };

  // To set the dashboard according to the params that are set
  // and the option user has picked on the selectors
  let content;
  switch (process) {
    case 'convert':
      content = <PdfUploadBoard />;
      break;
    case 'validate':
      content = <ValidateBoard />;
      break;
    case 'settings':
      content = <SettingsBoard />;
      break;
    case 'help':
      content = <HelpBoard />;
      break;
    case 'main':
      content = <Board />;
      break;
    default:
      content = <></>;
  }

  return (
    <Container>
      {isMobile ? (
        <>
          <DrawerContainer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Selector />
          </DrawerContainer>
        </>
      ) : (
        <div style={{ width: '20%', backgroundColor: '#ffffff' }}>
          <Selector />
        </div>
      )}
      <div
        style={{ width: isMobile ? '100%' : '80%', backgroundColor: '#F9F9F9' }}
      >
        <HeaderContainer>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <Username onClick={handleOpenProfile}>
            <ProfileAvatar src={user.googlePicture} alt="Profile Picture" />
            {username}
          </Username>
        </HeaderContainer>
        <div>{content}</div>
      </div>
    </Container>
  );
};

export default Dashboard;
