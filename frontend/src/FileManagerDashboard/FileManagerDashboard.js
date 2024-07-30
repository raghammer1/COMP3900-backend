import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useValidatorStore from '../zustand/useValidatorStore';
import useUserStore from '../zustand/useUserStore';
import { styled, useTheme } from '@mui/system';
import { useMediaQuery, Drawer, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getAllValidationUblInfo } from '../services/api';
import usePdfStore from '../zustand/usePdfStore';
import { useAlert } from '../components/AlertError';
import { getContentSelectorForFileDash } from '../shared/getContentSelectorForFileDash';

// This is the main container for the FileManagerDashboard component
const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
});

// This styled component is used for the user avatar
const ProfileAvatar = styled(Avatar)({
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  margin: 'auto',
  marginRight: '10px',
});

// This styled component is used for displaying the username
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

// This styled component is used for the header container
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

// This styled component is used for the drawer container
const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: '240px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '240px',
    boxSizing: 'border-box',
  },
}));

// This is the main component for the file manager dashboard
const FileManagerDashboard = () => {
  const { process, file, id } = useParams(); // Get URL parameters
  const [user, setUser] = useState({}); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage drawer open status
  const theme = useTheme(); // Get theme for responsive design
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // Check if the screen is mobile-sized
  const navigate = useNavigate(); // Hook for navigation
  const { showAlert } = useAlert(); // Hook to show alerts

  const getValidatorData = useValidatorStore((state) => state.getValidatorData); // Hook to get validator data
  const getUser = useUserStore((state) => state.getUser); // Hook to get user data
  const setLatestData = useValidatorStore((state) => state.setLatestData); // Hook to set the latest validator data
  const getUserData = getUser(); // Get the user data
  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  ); // Hook to get validator data by ID
  const getPdfDataById = usePdfStore((state) => state.getPdfDataById); // Hook to get PDF data by ID
  const setLatestDataPdf = usePdfStore((state) => state.setLatestData); // Hook to set the latest PDF data

  const UblValidateData = getValidatorDataById(id); // Get validator data by ID
  const PdfUblValidateData = getPdfDataById(id); // Get PDF data by ID

  const handleOpenProfile = () => {
    navigate(`/profile/${user._id}`); // Navigate to the user's profile
  };

  // useEffect to fetch initial data when the component mounts
  useEffect(() => {
    const ans = getValidatorData();
    setUser(getUserData);
    console.log(ans, 'THIS IS ANSwer', getUserData);

    async function fetchData() {
      try {
        const user = getUser();
        const userId = user._id;
        const result = await getAllValidationUblInfo({ userId });
        if (result.error) {
          showAlert(
            result.data.error ? result.data.error : "Error fetching XML's",
            'tomato'
          );
        } else {
          setLatestData(result);
        }
        setLoading(false);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        showAlert(
          'An unexpected error occurred while fetching initial XML files. Please try again later.',
          'tomato'
        );
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser, getValidatorData, setLatestData]);

  let content;
  let selector;

  if (loading) {
    // Display loading message while data is being fetched
    content = <div>Loading...</div>;
    selector = <div>Loading...</div>;
  } else {
    // Get the content and selector components based on the file type and process
    const result = getContentSelectorForFileDash(
      id,
      process,
      file,
      getValidatorDataById,
      setLatestData,
      UblValidateData,
      PdfUblValidateData,
      getPdfDataById,
      setLatestDataPdf,
      navigate
    );
    selector = result?.selector ? result.selector : <></>;
    content = result?.content ? result.content : <></>;
  }

  return (
    <Container>
      {isMobile ? (
        <>
          {/* Display drawer for mobile view */}
          <DrawerContainer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {selector}
          </DrawerContainer>
        </>
      ) : (
        // Display selector links in a sidebar for desktop view
        <div style={{ width: '20%', backgroundColor: '#ffffff' }}>
          {selector}
        </div>
      )}
      {/* Main content area */}
      <div
        style={{ width: isMobile ? '100%' : '80%', backgroundColor: '#F9F9F9' }}
      >
        <HeaderContainer>
          {isMobile && (
            // Display menu icon for opening drawer on mobile
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          {/* Display user profile information */}
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
