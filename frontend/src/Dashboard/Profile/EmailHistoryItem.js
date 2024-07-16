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

const StyledListItem = styled(ListItem)({
  padding: '16px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  '& .MuiListItemText-secondary': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

const FileTypeLink = styled(Link)({
  textDecoration: 'none',
  color: '#1976d2',
  '&:hover': {
    textDecoration: 'underline',
  },
});

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
          <Avatar>
            <Edit />
          </Avatar>
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
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteHistory(index)}
        >
          <Delete />
        </IconButton>
      </StyledListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default EmailHistoryItem;
