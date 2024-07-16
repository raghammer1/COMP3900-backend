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
import usePdfStore from '../../../zustand/usePdfStore';
import useUserStore from '../../../zustand/useUserStore';
import { deleteOnePdfInfo } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';

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
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    borderColor: '#651FFF',
    backgroundColor: '#ffffff',
  },
}));

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

const ShowPdf = ({ pdfs, isLoading }) => {
  const nav = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const { showAlert } = useAlert();

  const deletePdfDataById = usePdfStore((state) => state.deletePdfDataById);
  const getPdfData = usePdfStore((state) => state.getPdfData);
  const getUser = useUserStore((state) => state.getUser);
  const pdfFiles = getPdfData();

  const handleOpenPdf = (pdf) => {
    nav(`/handle-files/pdf-reports/pdf/${pdf._id}`);
  };

  const handleDeleteClick = (pdf) => {
    setSelectedPdf(pdf);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    const user = getUser();
    try {
      await deleteOnePdfInfo({
        userId: user._id,
        dataId: selectedPdf._id,
      });

      deletePdfDataById(selectedPdf._id);

      showAlert('Deleted PDF successfully', 'green');
      setOpenDialog(false);
    } catch (error) {
      showAlert('Failed to delete the PDF. Please try again.', 'tomato');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleShareClick = (pdf) => {
    nav(`/handle-files/pdf-reports/share/${pdf._id}`);
  };

  return (
    <>
      {pdfFiles.map((pdf) => (
        <PdfBox key={pdf._id} onClick={() => handleOpenPdf(pdf)}>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(pdf);
            }}
          >
            <DeleteIcon />
          </DeleteButton>
          <ShareButton
            onClick={(e) => {
              e.stopPropagation();
              handleShareClick(pdf);
            }}
          >
            <ShareIcon />
          </ShareButton>
          <embed
            src={pdf.url}
            type="application/pdf"
            width="100%"
            height="100%"
          />
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
