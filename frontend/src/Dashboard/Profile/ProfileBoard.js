import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import EmailHistoryItem from './EmailHistoryItem';
import {
  changeProfilePhoto,
  changeUsername,
  getHistoryEmail,
} from '../../services/api';
import { useAlert } from '../../components/AlertError';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import useUserStore from '../../zustand/useUserStore';

// This is the styling for the main container of the profile board
const StyledContainer = styled(Container)({
  marginTop: '32px',
  padding: '16px',
  backgroundColor: '#f4f6f8',
  borderRadius: '16px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
});

// This is the styling for the profile card
const ProfileCard = styled(Paper)({
  padding: '32px',
  textAlign: 'center',
  borderRadius: '16px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
});

// This is the styling for the profile avatar
const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  margin: 'auto',
  marginBottom: '16px',
  border: '3px solid #651FFF',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
});

// This is the styling for the history card
const HistoryCard = styled(Paper)({
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
});

// This is the styling for the list of email history items
const StyledList = styled(List)({
  maxHeight: 400,
  overflowY: 'auto',
});

// This is the styling for the icon button used to close the profile board
const LargeIconButton = styled(IconButton)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  border: '1px solid #999',
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

// Main component for displaying the user profile board
const ProfileBoard = () => {
  const { getUser, updateGoogleImage, updateUsername } = useUserStore();
  const user = getUser();

  const [username, setUsername] = useState(user.username);
  const [history, setHistory] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Set the profile image when the component mounts
  useEffect(() => {
    setProfileImage(user.googlePicture);
  }, [user.googlePicture]);

  // Handle changes to the username input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Fetch the email history when the component mounts
  useEffect(() => {
    async function fetchData() {
      const res = await getHistoryEmail();
      if (!res.error) {
        setHistory(res);
      } else {
        showAlert(
          res.data.error ? res.data.error : 'Failed to fetch history email',
          'tomato'
        );
      }
    }
    fetchData();
  }, [showAlert]);

  // Handle changes to the profile picture
  const handleProfilePicChange = async (event) => {
    const userId = user._id;
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const result = await changeProfilePhoto(formData);

      if (result.error) {
        return showAlert(
          result.data.error || 'Unable to change profile photo',
          'tomato'
        );
      }

      setProfileImage(result.googlePicture);
      updateGoogleImage(result.googlePicture);
      showAlert('Profile photo changed successfully', 'green');
    } else {
      showAlert('Invalid file type given', 'tomato');
    }
  };

  // Handle deletion of an email history item
  const handleDeleteHistory = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  // Handle opening of an email report
  const handleOpenReport = (e, item) => {
    e.stopPropagation();
  };

  // Toggle the edit mode for the username
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle updating the username
  const handleUpdate = async () => {
    setIsEditing(false);
    const res = await changeUsername({
      newUsername: username,
      userId: user._id,
    });
    if (res.error) {
      showAlert(res.data.error, 'tomato');
      setUsername(user.username);
    } else {
      showAlert('Username successfully updated', 'green');
      updateUsername(username);
    }
  };

  // Handle closing the profile board
  const handleClose = () => {
    navigate('/dashboard/main');
  };

  // Here, we return the JSX for rendering the profile board
  return (
    <StyledContainer maxWidth="md">
      <LargeIconButton onClick={handleClose}>
        <CloseIcon fontSize="large" />
      </LargeIconButton>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '30px',
          color: '#333',
        }}>
        User Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProfileCard elevation={4}>
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <ProfileAvatar src={profileImage} alt="Profile Picture" />
            <input
              data-testid="profile-picture-change"
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-pic-upload"
              type="file"
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic-upload">
              <IconButton color="primary" component="span">
                <AddAPhotoIcon />
              </IconButton>
            </label>
            {isEditing ? (
              <TextField
                data-testid={'profile-name-input'}
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ) : (
              <Typography
                style={{ marginTop: '20px', color: '#555' }}
                variant="body1"
                gutterBottom>
                {username}
              </Typography>
            )}
            <div>
              {isEditing ? (
                <Button
                  data-testid={'profile-submit'}
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdate}
                  style={{ marginTop: '20px' }}>
                  Save
                </Button>
              ) : (
                <Button
                  data-testid={'edit-username-button'}
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={toggleEditMode}
                  style={{ marginTop: '20px' }}>
                  Edit
                </Button>
              )}
            </div>
          </ProfileCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <HistoryCard elevation={4}>
            <Typography variant="h6" gutterBottom>
              Email History
            </Typography>
            <StyledList>
              {history.map((item, index) => (
                <div key={index}>
                  <EmailHistoryItem
                    handleOpenReport={handleOpenReport}
                    item={item}
                    handleDeleteHistory={handleDeleteHistory}
                    index={index}
                  />
                </div>
              ))}
            </StyledList>
          </HistoryCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ProfileBoard;
