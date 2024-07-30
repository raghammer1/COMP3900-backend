import React from 'react';
import {
  Typography,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

// This is the styling for the list item with hover effects
const StyledListItem = styled(ListItem)({
  padding: '16px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    transform: 'scale(1.02)',
  },
  '&:hover .MuiIconButton-root': {
    opacity: 1,
  },
});

// This is the styling for the text inside the list item
const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#333',
  },
  '& .MuiListItemText-secondary': {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    color: '#666',
  },
});

// This is the styling for the link to file types
const FileTypeLink = styled(Link)({
  textDecoration: 'none',
  color: '#1976d2',
  '&:hover': {
    textDecoration: 'underline',
  },
});

// This is the styling for the avatar in the list item
const StyledAvatar = styled(Avatar)({
  backgroundColor: '#651FFF',
  color: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

// This is the styling for the delete icon button which is hidden initially
const HiddenIconButton = styled(IconButton)({
  opacity: 0,
  transition: 'opacity 0.2s ease',
});

// Component to display each email history item
const EmailHistoryItem = ({
  handleOpenReport,
  item,
  handleDeleteHistory,
  index,
}) => {
  return (
    <div>
      <StyledListItem
        alignItems="flex-start"
        onClick={(e) => handleOpenReport(e, item)}
      >
        <ListItemAvatar>
          <StyledAvatar>
            <Edit />
          </StyledAvatar>
        </ListItemAvatar>
        <StyledListItemText
          primary={`Send to: ${item.email}`}
          secondary={
            <Box component="span">
              <Typography component="span" variant="body2" color="textPrimary">
                Subject: {item.subject}
              </Typography>
              <div>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  Files Sent:
                </Typography>
                {item.fileTypes.map((tp, index) => (
                  <FileTypeLink
                    key={index}
                    to={`http://localhost:3000/handle-files/${item.process}/${tp}/${item.sharedObjId}`}
                    rel="noopener noreferrer"
                  >
                    {`\t${tp.toUpperCase()}\t`}
                  </FileTypeLink>
                ))}
              </div>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                Sent On: {new Date(item.date).toLocaleString()}
              </Typography>
            </Box>
          }
        />
        <HiddenIconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteHistory(index)}
        >
          <Delete color="error" />
        </HiddenIconButton>
      </StyledListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default EmailHistoryItem;
