import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useValidatorStore from '../zustand/useValidatorStore';
import useUserStore from '../zustand/useUserStore';
import { styled, useTheme } from '@mui/system';
import { useMediaQuery, Drawer, IconButton, Avatar } from '@mui/material';
import UblValidSelector from './UblValidation/Selector/UblValidSelector';
import UblBoard from './UblValidation/MainBoard/UblBoard';
import ValidBoard from './UblValidation/MainBoard/ValidBoard';
import HelpBoard from '../Dashboard/Help/HelpBoard';
import MenuIcon from '@mui/icons-material/Menu';
import ShareFilesBoard from './UblValidation/MainBoard/ShareFilesBoard';
import { getAllValidationUblInfo } from '../services/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessManagerBoard from './UblValidation/MainBoard/AccessManagerBoard';

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
});

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

const Container1 = styled('div')({
  width: '20%',
  height: '100vh',
  backgroundColor: '#ffffff',
});

const Container2 = styled('div')({
  width: '80%',
  height: '100vh',
  backgroundColor: '#F9F9F9',
});

const HeaderContainer = styled('div')({
  height: '10vh',
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  paddingLeft: '30px',

  '@media (max-width: 1200px)': {
    justifyContent: 'space-between',
    right: '10%',
  },
});
const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: '240px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '240px',
    boxSizing: 'border-box',
  },
}));

const FileManagerDashboard = () => {
  const { process, file, id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const nav = useNavigate();

  const handleOpenProfile = () => {
    nav(`/profile/${user._id}`);
  };

  const getValidatorData = useValidatorStore((state) => state.getValidatorData);
  const getUser = useUserStore((state) => state.getUser);
  const setLatestData = useValidatorStore((state) => state.setLatestData);
  const getUserData = getUser();

  useEffect(() => {
    const ans = getValidatorData();
    setUser(getUserData);
    console.log(ans, 'THIS IS ANSwer', getUserData);

    async function fetchData() {
      try {
        const user = getUser();
        const userId = user._id;
        console.log(userId, 'IEIEIJRIEJRIEJRIEJ');
        const result = await getAllValidationUblInfo({ userId });
        if (result.error) {
          console.error('Error fetching initial XML files:', result);
          console.log('Error fetching initial XML files', 'tomato');
        } else {
          console.log('CAME HERE', result);
          setLatestData(result);
        }
        setLoading(false);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        console.log(
          'An unexpected error occurred while fetching initial XML files. Please try again later.',
          'tomato'
        );
        setLoading(false);
      }
    }

    fetchData();
  }, [getUser, getValidatorData, setLatestData]);

  let content;
  let selector;

  if (loading) {
    content = <div>Loading...</div>;
    selector = <div>Loading...</div>;
  } else {
    switch (process) {
      case 'validation-reports':
        selector = <UblValidSelector id={id} />;
        switch (file) {
          case 'ubl':
            content = <UblBoard />;
            break;
          case 'validate':
            content = <ValidBoard />;
            break;
          case 'share':
            content = <ShareFilesBoard />;
            break;
          case 'access':
            content = <AccessManagerBoard />;
            break;
          case 'help':
            content = <HelpBoard />;
            break;
          default:
            content = <></>;
        }
        break;
      case 'conversion-reports':
        content = <></>;
        selector = <></>;
        break;
      default:
        content = <></>;
        selector = <></>;
    }
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
            {selector}
          </DrawerContainer>
        </>
      ) : (
        <div style={{ width: '20%', backgroundColor: '#ffffff' }}>
          {selector}
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
            {user.username}
          </Username>
        </HeaderContainer>
        <div>{content}</div>
      </div>
    </Container>
  );
};

export default FileManagerDashboard;
