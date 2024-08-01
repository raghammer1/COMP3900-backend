import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomInputBox from '../../../components/CustomInputBox';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';

// This is the styling for the upload box container
const UploadBox = styled('div')({
  width: '200px',
  height: '200px',
  margin: '10px',
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

// This is the styling for the upload label
const UploadLabel = styled('label')({
  fontSize: '3em',
  color: '#007BFF',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#fff',
  },
});

// This is the style for the modal box
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 315,
  bgcolor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  p: 4,
};

// This is the header for the modal
const ModalHeader = styled('h2')({
  margin: 0,
  marginBottom: '16px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 700,
  color: '#333',
});

// This is the styling for the file input field
const FileInput = styled('input')({
  display: 'block',
  marginBottom: '16px',
  fontSize: '1rem',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  transition: 'border-color 0.3s ease',
  width: '295px',
  '&:focus': {
    borderColor: '#007BFF',
  },
});

// Main component to upload a UBL XML file to the app for validation purposes
const UblUploadBox = ({ handleUpload }) => {
  // Here, we are defining the state for modal visibility, file, and name
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  // Function to handle opening the modal
  const handleOpen = () => setOpen(true);

  // Function to handle closing the modal
  const handleClose = () => setOpen(false);

  // Function to set the file when it is uploaded by the user
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Finally, if user clicks submit, the file is sent to the backend for processing
  const handleSubmit = () => {
    if (file) {
      handleUpload(file, name);
      handleClose();
    }
    setFile(null);
    setName('');
  };

  // Here, we return the JSX for rendering the upload box and modal
  return (
    <>
      <UploadBox data-testid={'upload-xml-plus-btn'} onClick={handleOpen}>
        <UploadLabel>+</UploadLabel>
      </UploadBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box sx={modalStyle}>
          <ModalHeader id="modal-title">Upload XML</ModalHeader>
          <CustomInputBox
            dataTestId={'validate-upload-name'}
            style={{
              width: '270px',
            }}
            value={name}
            setValue={setName}
            type="text"
            label="File Name"
            placeholder="File A"
          />
          <FileInput
            data-testid={'validate-upload-file'}
            type="file"
            accept="text/xml"
            onChange={handleFileChange}
            id="xml-upload"
          />
          <CustomPrimaryButton
            label="Upload"
            bgcolour="#651FFF"
            additionalStyle={{
              width: '315px',
              height: '50px',
              fontSize: '13px',
            }}
            disabled={name === '' || file === null}
            onClick={handleSubmit}
            dataTestid={'upload-xml-submit-btn'}
          />
        </Box>
      </Modal>
    </>
  );
};

export default UblUploadBox;
