import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import UploadBox from './UploadBox';
import ShowPdf from './ShowPdf';
import useUserStore from '../../../zustand/useUserStore';
import { getAllPdfInfo, pdfToUblConvert } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';
import usePdfStore from '../../../zustand/usePdfStore';

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

// Main component for keeping the record of PDFs and converting them to UBL
const PdfUploadBoard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  const addPdfData = usePdfStore((state) => state.addPdfData);
  const setLatestData = usePdfStore((state) => state.setLatestData);

  // Gets the latest PDF storage from the db for all the ids and stuff
  useEffect(() => {
    const fetchInitialPdfs = async () => {
      try {
        // gets user data
        const user = getUser();
        const userId = user._id;

        // sends request to get the latest PDF data
        const result = await getAllPdfInfo({ userId });
        if (result.error) {
          showAlert('Error fetching initial PDFs', 'tomato');
        } else {
          // sets the latest data to zustand and state
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

    fetchInitialPdfs();
  }, []);

  // To handle upload of the latest PDF and send for processing in backend
  const handleUpload = async (file, name) => {
    // Start loading so that user knows something is working in the backend
    setIsLoading(true);
    try {
      // get user data
      const user = getUser();
      const userId = user._id;

      // Confirm file is of type PDF
      if (file && file.type === 'application/pdf') {
        // Create file data to send to backend
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('name', name);

        // Finally send the data to backend for processing
        const result = await pdfToUblConvert(formData);

        if (result.error) {
          showAlert('Error converting/uploading PDF', 'tomato');
        } else {
          showAlert('PDF successfully converted to UBL', 'green');

          // On success save the new PDF data to zustand and the state
          console.log(result, 'RESULT');
          const data = {
            _id: result._id,
            pdfId: result.pdfId,
            ublId: result.ublId,
            validatorId: result.validatorId,
            conversionReport: result.conversionReport,
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

  return (
    <BoardContainer>
      <BoardWrapper>
        <ShowPdf pdfs={pdfs} isLoading={isLoading} />
        <UploadBox handleUpload={handleUpload} />
      </BoardWrapper>
    </BoardContainer>
  );
};

export default PdfUploadBoard;
