import React, { useEffect, useState } from 'react';
import { getAnyFile } from '../../services/api';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useAlert } from '../../components/AlertError';

// This is a styled container for the main board
const BoardContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  height: '90vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
}));

// This is the main component for displaying a valid board with a PDF viewer
const ValidBoard = ({ fileId }) => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the URL of the PDF file
  const { showAlert } = useAlert(); // Hook to show alerts

  // useEffect to fetch the PDF file when the component mounts or id changes
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Fetch the file as an ArrayBuffer
        const arrayBuffer = await getAnyFile({ fileId });
        console.log('File Response as ArrayBuffer:', arrayBuffer);

        // Check for errors in the response
        if (arrayBuffer.error) {
          showAlert(
            arrayBuffer.data.error
              ? arrayBuffer.data.error
              : 'Error opening the file',
            'tomato'
          );
        } else {
          // Create a blob from the ArrayBuffer and generate a URL
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setPdfUrl(url); // Set the PDF URL in state
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
        showAlert('Error fetching PDF', 'tomato'); // Show an alert if there is an error
      }
    };

    fetchPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <BoardContainer>
      {pdfUrl ? (
        // Display the PDF in an iframe if the URL is available
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="PDF Viewer"
        ></iframe>
      ) : (
        // Show a loading message while the PDF is being fetched
        <p>Loading PDF...</p>
      )}
    </BoardContainer>
  );
};

export default ValidBoard;
