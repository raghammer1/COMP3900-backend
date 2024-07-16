import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomInputBox from '../../../components/CustomInputBox';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';

const UploadContainer = styled('div')({
  width: '200px',
  height: '200px',
  border: '2px dashed #007BFF',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  '&:hover label': {
    color: '#fff',
  },
});

const UploadLabel = styled('label')({
  fontSize: '3em',
  color: '#007BFF',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#fff',
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  p: 4,
};

const ModalHeader = styled('h2')({
  margin: 0,
  marginBottom: '16px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 700,
  color: '#333',
});

const FileInput = styled('input')({
  display: 'block',
  marginBottom: '16px',
  fontSize: '1rem',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    borderColor: '#007BFF',
  },
});

// To upload a PDF file to the app
const UploadBox = ({ handleUpload }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  // Handles modal for uploading files
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Sets the file when it is uploaded by the user
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Finally if user clicks submit the file is sent to the backend for processing
  const handleSubmit = () => {
    if (file) {
      handleUpload(file, name);
      handleClose();
    }
    setFile(null);
    setName('');
  };

  return (
    <>
      <UploadContainer onClick={handleOpen}>
        <UploadLabel htmlFor="pdf-upload">+</UploadLabel>
      </UploadContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <ModalHeader id="modal-title">Upload PDF</ModalHeader>
          <CustomInputBox
            value={name}
            setValue={setName}
            type="text"
            label="File Name"
            placeholder="File A"
          />
          <FileInput
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            id="pdf-upload"
          />
          <CustomPrimaryButton
            label="Upload"
            bgcolour="#651FFF"
            additionalStyle={{
              width: '92%',
              height: '50px',
              fontSize: '13px',
            }}
            disabled={name === '' || file === null}
            onClick={handleSubmit}
          />
        </Box>
      </Modal>
    </>
  );
};

export default UploadBox;
