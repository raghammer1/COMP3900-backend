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
import useUserStore from '../../../zustand/useUserStore';
import { deleteOnePdfInfo } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';
import usePdfStore from '../../../zustand/usePdfStore';

// This is the styling for the box that contains each PDF preview
const PdfBox = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  margin: '10px',
  border: '2px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '12px',
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

// Main component for showing PDF files
const ShowPdf = ({ isLoading, searchTerm, filterDate }) => {
  // Here, we are defining the state for dialog visibility and selected PDF
  const nav = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Function to show alerts
  const { showAlert } = useAlert();

  // Function to delete PDF data by ID
  const deletePdfDataById = usePdfStore((state) => state.deletePdfDataById);
  const getUser = useUserStore((state) => state.getUser);
  const getPdfData = usePdfStore((state) => state.getPdfData);
  const FilesPDF = getPdfData();

  // Filter PDF files based on search term and filter date
  const pdfs = FilesPDF.filter((file) => {
    const matchesSearchTerm = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilterDate = filterDate
      ? new Date(file.date).toDateString() ===
        new Date(filterDate).toDateString()
      : true;
    return matchesSearchTerm && matchesFilterDate;
  });

  // Handle opening the validation report for a PDF
  const handleOpenValidationReport = (pdf) => {
    nav(`/handle-files/convertion-reports/ubl/${pdf._id}`);
  };

  // Handle sharing a PDF
  const handleShareClick = (pdf) => {
    nav(`/handle-files/convertion-reports/share/${pdf._id}`);
  };

  console.log(pdfs, 'EWR(ew9ryE98wryewyruewiruewuYRIG');

  // Handle delete button click
  const handleDeleteClick = (pdf) => {
    setSelectedPdf(pdf);
    setOpenDialog(true);
  };

  // Handle confirming the deletion of a PDF
  const handleConfirmDelete = async () => {
    const user = getUser();
    try {
      setOpenDialog(false);
      const res = await deleteOnePdfInfo({
        userId: user._id,
        dataId: selectedPdf._id,
      });

      if (res.error) {
        showAlert(
          res.data.error ? res.data.error : 'Error: Cannot delete',
          'tomato'
        );
      } else {
        deletePdfDataById(selectedPdf._id);
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

  // Here, we return the JSX for rendering the PDF preview boxes and dialogs
  return (
    <>
      {pdfs.map((pdf) => (
        <PdfBox
          data-testid={'conversion-record'}
          key={pdf._id}
          onClick={() => handleOpenValidationReport(pdf)}>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(pdf);
            }}>
            <DeleteIcon />
          </DeleteButton>
          <ShareButton
            onClick={(e) => {
              e.stopPropagation();
              handleShareClick(pdf);
            }}>
            <ShareIcon />
          </ShareButton>
          <h2 style={{ margin: '0', fontWeight: '500', color: '#333' }}>
            {pdf.name}
          </h2>
          <DateTimeLabel>
            {new Date(pdf.date).toLocaleTimeString()}{' '}
            {new Date(pdf.date).toLocaleDateString()}
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
          Are you sure you want to delete {selectedPdf?.name}?
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

export default ShowPdf;
