import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useValidatorStore from '../../../zustand/useValidatorStore';
import useUserStore from '../../../zustand/useUserStore';
import { deleteOneValidationUblInfo } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';

// This is the styling for the box that contains each UBL file preview
const PdfBox = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  margin: '10px',
  border: '2px solid #ccc',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  backgroundColor: '#f0f0f0',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    borderColor: '#651FFF',
    backgroundColor: '#ffffff',
  },
}));

// This is the styling for the delete button
const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: 'rgba(255, 0, 0, 0.3)',
  '&:hover': {
    color: '#ff0000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

// This is the styling for the share button
const ShareButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  left: '8px',
  color: 'rgba(0, 0, 255, 0.3)',
  '&:hover': {
    color: '#0000ff',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

// This is the styling for the date and time label
const DateTimeLabel = styled('p')({
  margin: '8px 0 0 0',
  fontSize: '12px',
  color: '#666',
});

// Main component for showing UBL files
const ShowUblBox = ({ isLoading, searchTerm, filterDate }) => {
  // Here, we are defining the state for dialog visibility and selected UBL file
  const nav = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedXml, setSelectedXml] = useState(null);

  // Function to get validator data from the store
  const getValidatorData = useValidatorStore((state) => state.getValidatorData);
  const FilesXML = getValidatorData();

  // Filter XML files based on search term and filter date
  const xmlFiles = FilesXML.filter((file) => {
    const matchesSearchTerm = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilterDate = filterDate
      ? new Date(file.date).toDateString() ===
        new Date(filterDate).toDateString()
      : true;
    return matchesSearchTerm && matchesFilterDate;
  });

  // Function to show alerts
  const { showAlert } = useAlert();

  // Function to delete validator data by ID
  const deleteValidatorDataById = useValidatorStore(
    (state) => state.deleteValidatorDataById
  );

  // Function to get user information from the store
  const getUser = useUserStore((state) => state.getUser);

  // Handle opening the validation report for a UBL file
  const handleOpenValidationReport = (xml) => {
    nav(`/handle-files/validation-reports/ubl/${xml._id}`);
  };

  // Handle delete button click
  const handleDeleteClick = (xml) => {
    setSelectedXml(xml);
    setOpenDialog(true);
  };

  // Handle confirming the deletion of a UBL file
  const handleConfirmDelete = async () => {
    const user = getUser();
    try {
      setOpenDialog(false);
      const res = await deleteOneValidationUblInfo({
        userId: user._id,
        dataId: selectedXml._id,
      });

      if (res.error) {
        showAlert(
          res.data.error ? res.data.error : 'Error: Cannot delete',
          'tomato'
        );
      } else {
        deleteValidatorDataById(selectedXml._id);
        console.log(
          'CAMEH EIUHEQOIYRGQWIYEGUQTORIW',
          selectedXml._id,
          selectedXml
        );
        showAlert('Deleted record successfully', 'green');
      }
    } catch (error) {
      showAlert(
        'Failed to delete the validation data. Please try again.',
        'tomato'
      );
    }
  };

  // Handle closing the delete confirmation dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Handle sharing a UBL file
  const handleShareClick = (xml) => {
    nav(`/handle-files/validation-reports/share/${xml._id}`);
  };

  // Here, we return the JSX for rendering the UBL file preview boxes and dialogs
  return (
    <>
      {xmlFiles.map((xml) => (
        <PdfBox
          data-testid={'validation-record'}
          key={xml._id}
          onClick={() => handleOpenValidationReport(xml)}>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(xml);
            }}>
            <DeleteIcon />
          </DeleteButton>
          <ShareButton
            onClick={(e) => {
              e.stopPropagation();
              handleShareClick(xml);
            }}>
            <ShareIcon />
          </ShareButton>
          <h2 style={{ margin: '0', fontWeight: '500', color: '#333' }}>
            {xml.name}
          </h2>
          <DateTimeLabel>
            {new Date(xml.date).toLocaleTimeString()}{' '}
            {new Date(xml.date).toLocaleDateString()}
          </DateTimeLabel>
        </PdfBox>
      ))}
      {isLoading && (
        <PdfBox>
          <CircularProgress color="primary" />
        </PdfBox>
      )}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedXml?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShowUblBox;
