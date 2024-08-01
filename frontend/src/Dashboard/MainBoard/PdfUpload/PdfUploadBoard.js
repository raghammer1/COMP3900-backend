import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import UploadBox from './UploadBox';
import ShowPdf from './ShowPdf';
import useUserStore from '../../../zustand/useUserStore';
import { getAllPdfInfo, pdfToUblConvert } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';
import usePdfStore from '../../../zustand/usePdfStore';
import CustomInputBox from '../../../components/CustomInputBox';

// This is the main container for the board with styled properties
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

// This is the wrapper for arranging the board content in a grid layout
const BoardWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  width: '100%',
});

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width: 750px)': {
    width: '90%',
  },
});

// Main component for keeping the record of PDFs and converting them to UBL
const PdfUploadBoard = () => {
  // State to keep track of the PDFs
  // eslint-disable-next-line no-unused-vars
  const [pdfs, setPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Here, we are getting the user information from the store
  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  // Function to add PDF data to the store
  const addPdfData = usePdfStore((state) => state.addPdfData);
  const setLatestData = usePdfStore((state) => state.setLatestData);

  // Gets the latest PDF storage from the db for all the ids and stuff
  useEffect(() => {
    const fetchInitialPdfs = async () => {
      try {
        // Gets user data
        const user = getUser();
        const userId = user._id;

        // Sends request to get the latest PDF data
        const result = await getAllPdfInfo({ userId });
        if (result.error) {
          showAlert(
            result.data.error
              ? result.data.error
              : 'Error fetching initial PDFs',
            'tomato'
          );
        } else {
          // Sets the latest data to zustand and state
          setPdfs(result);
          setLatestData(result);
        }
      } catch (error) {
        // Error handling
        showAlert(
          'An unexpected error occurred while fetching initial PDFs. Please try again later.',
          'tomato'
        );
      }
    };

    // Fetches the initial PDFs when the component is mounted
    fetchInitialPdfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // To handle upload of the latest PDF and send for processing in backend
  const handleUpload = async (file, vendorGln, customerGln, saveGln, name) => {
    // Start loading so that user knows something is working in the backend
    setIsLoading(true);
    try {
      // Get user data
      const user = getUser();
      const userId = user._id;

      // Confirm file is of type PDF
      if (file && file.type === 'application/pdf') {
        // Create file data to send to backend
        const formData = new FormData();
        formData.append('file', file);
        formData.append('vendorGln', vendorGln);
        formData.append('customerGln', customerGln);
        formData.append('saveGln', saveGln);
        formData.append('userId', userId);
        formData.append('name', name);

        // Finally send the data to backend for processing
        const result = await pdfToUblConvert(formData);

        if (result.error) {
          showAlert(
            result.data.error
              ? result.data.error
              : 'Error converting/uploading PDF',
            'tomato'
          );
        } else {
          // Show success alert
          showAlert('PDF successfully converted to UBL', 'green');

          // On success save the new PDF data to zustand and the state

          const data = {
            _id: result.newObjectId,
            date: result.date,
            pdfId: result.pdfId,
            ublId: result.ublId,
            validatorId: result.validatorId,
            validationHtml: result.validationHtml,
            validationJson: result.validationJson,
            name,
          };
          setPdfs((prevPdfs) => [...prevPdfs, data]);
          addPdfData(data);
        }
      } else {
        showAlert('Invalid file type. Please upload a PDF file.', 'tomato');
      }
    } catch (error) {
      // Error handling

      showAlert(
        error.data.error ? error.data.error : 'Error converting/uploading PDF',
        'tomato'
      );
    } finally {
      // Close loading
      setIsLoading(false);
    }
  };

  // Here, we return the JSX for rendering the PDF upload board
  return (
    <BoardContainer>
      <Container>
        <CustomInputBox
          value={searchTerm}
          setValue={setSearchTerm}
          label="Search Files"
          placeholder="Search for files by name"
        />
      </Container>
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
        <ShowPdf
          isLoading={isLoading}
          searchTerm={searchTerm}
          filterDate={filterDate}
        />
        <UploadBox
          setIsLoading={setIsLoading}
          handleUpload={handleUpload}
          setPdfs={setPdfs}
        />
      </BoardWrapper>
    </BoardContainer>
  );
};

export default PdfUploadBoard;
