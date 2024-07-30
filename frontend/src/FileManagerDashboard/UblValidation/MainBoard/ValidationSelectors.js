import React, { useState } from 'react';
import HtmlValidationBoard from './HtmlValidationBoard';
import ValidBoard from '../../shared/ValidBoard';
import { ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import JsonValidationBoard from './JsonValidationBoard';

// This container wraps the entire board
const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '70vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  boxShadow: theme.shadows[5],
  position: 'relative',
}));

// This container holds the view selector buttons
const SelectorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  marginRight: '10%',
}));

// This is the styled button for view selection
const StyledButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? '#651FFF' : '#fff',
  color: selected ? '#fff' : '#000',
  '&:hover': {
    backgroundColor: selected ? '#531ecc' : theme.palette.grey[300],
  },
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

// This is the main component for validation selectors
const ValidationSelectors = ({ htmlContent, fileId, jsonContent }) => {
  const [selectedView, setSelectedView] = useState('html'); // State to manage selected view

  // Handler to change the selected view
  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <div>
      <SelectorContainer>
        {/* Button group to select different views */}
        <ButtonGroup>
          <StyledButton
            selected={selectedView === 'html'}
            onClick={() => handleViewChange('html')}
          >
            HTML View
          </StyledButton>
          <StyledButton
            selected={selectedView === 'json'}
            onClick={() => handleViewChange('json')}
          >
            JSON View
          </StyledButton>
          <StyledButton
            selected={selectedView === 'pdf'}
            onClick={() => handleViewChange('pdf')}
          >
            PDF View
          </StyledButton>
        </ButtonGroup>
      </SelectorContainer>
      {/* Conditionally render the view based on selected view state */}
      {selectedView === 'html' && (
        <BoardContainer>
          <HtmlValidationBoard htmlContent={htmlContent} />
        </BoardContainer>
      )}
      {selectedView === 'json' && (
        <BoardContainer>
          <JsonValidationBoard jsonContent={jsonContent} />
        </BoardContainer>
      )}
      {selectedView === 'pdf' && (
        <BoardContainer>
          <ValidBoard fileId={fileId} />
        </BoardContainer>
      )}
    </div>
  );
};

export default ValidationSelectors;
