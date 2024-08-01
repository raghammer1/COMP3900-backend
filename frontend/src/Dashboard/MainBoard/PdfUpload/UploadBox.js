import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomInputBox from '../../../components/CustomInputBox';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import useUserStore from '../../../zustand/useUserStore';
import { Tooltip, Checkbox, FormControlLabel, Tabs, Tab } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GuiForm from './uploadTypes/GuiForm';

// This is the styling for the upload container
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
  marginLeft: '10px',
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
  bgcolor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  p: 3,
};

// This is the header for the modal
const ModalHeader = styled('h2')({
  margin: 0,
  marginBottom: '16px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 700,
  color: '#333',
  marginTop: '20px',
});

// This is the styling for the file input field
const FileInput = styled('input')({
  display: 'block',
  marginBottom: '16px',
  fontSize: '1rem',
  padding: '8px',
  border: '1px solid #ccc',
  width: '88%',
  borderRadius: '5px',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    borderColor: '#007BFF',
  },
});

// Main component for uploading PDF or filling the form
const UploadBox = ({ handleUpload, setPdfs, setIsLoading }) => {
  // Here, we are defining the state for modal visibility, file, name, and GLNs
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const { getUser, updateGLN } = useUserStore();
  const user = getUser();
  const [vendorGln, setVendorGln] = useState(user.gln ? user.gln : '');
  const [customerGln, setCustomerGln] = useState('');
  const [saveGln, setSaveGln] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for Upload, 1 for Fill Form

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (file) {
      handleUpload(file, vendorGln, customerGln, saveGln, name);
      handleClose();
      if (saveGln) {
        updateGLN(vendorGln);
      }
    }
    setFile(null);
    setName('');
  };

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Here, we return the JSX for rendering the upload box and modal
  return (
    <>
      <UploadContainer onClick={handleOpen}>
        <UploadLabel data-testid={'convert-upload-button'} htmlFor="pdf-upload">
          +
        </UploadLabel>
      </UploadContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box
          sx={{
            ...modalStyle,
            width: activeTab === 0 ? 310 : 920,
            height: activeTab === 0 ? 'fit-content' : '80vh',
          }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            TabIndicatorProps={{ style: { backgroundColor: '#651FFF' } }}>
            <Tab
              label="Upload"
              sx={{
                '&.Mui-selected': {
                  color: '#651FFF',
                },
              }}
            />
            <Tab
              data-testid={'goto-gui-form'}
              label="Fill Form"
              sx={{
                '&.Mui-selected': {
                  color: '#651FFF',
                },
              }}
            />
          </Tabs>
          <div
            style={{
              overflow: 'auto',
              height: '95%',
            }}>
            {activeTab === 0 && (
              <div>
                <ModalHeader id="modal-title">Upload PDF</ModalHeader>
                <CustomInputBox
                  dataTestId={'convert-upload-name'}
                  value={name}
                  setValue={setName}
                  type="text"
                  label="File Name"
                  placeholder="File A"
                  additionalStyles={{ width: '80%' }}
                />
                <div style={{ position: 'relative', marginTop: '30px' }}>
                  <CustomInputBox
                    dataTestId={'convert-vendor-gln'}
                    value={vendorGln}
                    setValue={setVendorGln}
                    type="text"
                    label="Your GLN"
                    placeholder="1234567898765"
                    additionalStyles={{ width: '80%' }}
                  />
                  <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
                    <InfoIcon
                      style={{
                        position: 'absolute',
                        right: '15%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                </div>
                <div style={{ position: 'relative', marginTop: '30px' }}>
                  <CustomInputBox
                    dataTestId={'convert-customer-gln'}
                    value={customerGln}
                    setValue={setCustomerGln}
                    type="text"
                    label="Customer GLN"
                    placeholder="9876543212345"
                    additionalStyles={{ width: '80%' }}
                  />
                  <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
                    <InfoIcon
                      style={{
                        position: 'absolute',
                        right: '15%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                </div>
                <FileInput
                  data-testid={'convert-upload-file'}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  id="pdf-upload"
                />
                <FormControlLabel
                  style={{ marginLeft: '5px' }}
                  control={
                    <Checkbox
                      checked={saveGln}
                      onChange={(e) => setSaveGln(e.target.checked)}
                      name="saveGln"
                    />
                  }
                  label="Save your GLN for future uploads"
                />
                <CustomPrimaryButton
                  dataTestid={'upload-pdf-submit-btn'}
                  label="Upload"
                  bgcolour="#651FFF"
                  additionalStyle={{
                    width: '94%',
                    height: '50px',
                    fontSize: '13px',
                  }}
                  disabled={
                    name === '' ||
                    file === null ||
                    vendorGln.length !== 13 ||
                    customerGln.length !== 13
                  }
                  onClick={handleSubmit}
                />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <GuiForm
                  setIsLoading={setIsLoading}
                  handleClose={handleClose}
                  setPdfs={setPdfs}
                />
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UploadBox;
