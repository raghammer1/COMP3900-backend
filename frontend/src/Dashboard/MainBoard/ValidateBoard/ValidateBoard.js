import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import UblUploadBox from './UblUploadBox';
import ShowUblBox from './ShowUblBox';
import useUserStore from '../../../zustand/useUserStore';
import { getAllValidationUblInfo, validateUBL } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';
import useValidatorStore from '../../../zustand/useValidatorStore';
import CustomInputBox from '../../../components/CustomInputBox';

const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  height: '80vh',
  overflow: 'auto',
  width: '80%',
}));

const BoardWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  width: '100%',
});

// Main component for keeping the record of validations of xmls (ubl)
const ValidateBoard = () => {
  const [xmlFiles, setXmlFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  const addValidatorData = useValidatorStore((state) => state.addValidatorData);
  const setLatestData = useValidatorStore((state) => state.setLatestData);

  // Gets the latest file storage from the db for all the ids and stuff
  useEffect(() => {
    const fetchInitialXmlFiles = async () => {
      try {
        // gets user data
        const user = getUser();
        const userId = user._id;

        // sends request to get the latest validation data
        const result = await getAllValidationUblInfo({ userId });
        if (result.error) {
          showAlert('Error fetching initial XML files', 'tomato');
        } else {
          // sets the latest data to zustand and state
          setXmlFiles(result);
          setLatestData(result);
        }
      } catch (error) {
        // Error handling
        showAlert(
          'An unexpected error occurred while fetching initial XML files. Please try again later.',
          'tomato'
        );
      }
    };

    fetchInitialXmlFiles();
  }, [getUser, setLatestData]);

  // To handle upload of the latest xml and send for processing in backend
  const handleUpload = async (file, name) => {
    // Start loading so that user knows something is working in the backend
    setIsLoading(true);
    try {
      // get user data
      const user = getUser();
      const userId = user._id;

      // Confirm file is of type xml
      if (file && file.type === 'text/xml') {
        // Create file data to send to backend
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('name', name);

        // Finally send the data to backend for processing
        const result = await validateUBL(formData);

        if (result.error) {
          showAlert(
            result.data?.error
              ? result.data.error
              : 'Error converting/uploading PDF',
            'tomato'
          );
        } else {
          showAlert('UBL successfully validated', 'green');

          // On success save the new ubl data to zustand and the state
          const data = {
            _id: result.newObjectId,
            ublId: result.ublId,
            validationId: result.validatorId,
            validationReport: result.validationReport,
            name,
          };
          setXmlFiles((prevXmlFiles) => [...prevXmlFiles, data]);
          addValidatorData(data);
        }
      } else {
        showAlert('Invalid file type. Please upload an XML file.', 'tomato');
      }
    } catch (error) {
      // Error handling
      console.error('An unexpected error occurred:', error);
      showAlert(
        'An unexpected error occurred. Please try again later.',
        'tomato'
      );
    } finally {
      // Close loading
      setIsLoading(false);
    }
  };

  // Filter xmlFiles based on search term and filter date
  const filteredXmlFiles = xmlFiles.filter((file) => {
    const matchesSearchTerm = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilterDate = filterDate
      ? new Date(file.date).toDateString() ===
        new Date(filterDate).toDateString()
      : true;
    return matchesSearchTerm && matchesFilterDate;
  });

  console.log(xmlFiles);

  return (
    <BoardContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CustomInputBox
          value={searchTerm}
          setValue={setSearchTerm}
          label="Search Files"
          placeholder="Search for files by name"
        />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{
            marginRight: '10px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <BoardWrapper>
        <ShowUblBox xmlFiles={filteredXmlFiles} isLoading={isLoading} />
        <UblUploadBox handleUpload={handleUpload} />
      </BoardWrapper>
    </BoardContainer>
  );
};

export default ValidateBoard;
