import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { getAnyFile } from '../../../services/api';
import useUserStore from '../../../zustand/useUserStore';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAlert } from '../../../components/AlertError';

// Styled container for the main board
const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '80vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  boxShadow: theme.shadows[5],
  position: 'relative',
}));

// Styled container for the XML content
const XmlContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
  maxHeight: '60vh',
  width: '100%',
  wordBreak: 'break-word',
}));

// Styled button for downloading the XML
const StickyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  position: 'sticky',
  top: theme.spacing(2),
  alignSelf: 'flex-end',
  zIndex: 1,
}));

// Styled title for the XML data
const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'left',
  marginTop: 0,
}));

// Main component for displaying the UBL board with XML content
const UblBoard = ({ getValidatorDataById, setLatestData }) => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [xmlData, setXmlData] = useState(null); // State to store the XML data
  const { getUser } = useUserStore(); // Hook to get the current user
  const navigate = useNavigate(); // Hook for navigation
  const { showAlert } = useAlert(); // Hook to show alerts

  // Effect to fetch data when the component mounts or id changes
  useEffect(() => {
    async function fetchData() {
      try {
        const data = getValidatorDataById(id); // Get validator data by ID
        if (data === undefined) {
          navigate('/error/not-found'); // Navigate to not-found page if data is undefined
          return;
        }

        const file = await getAnyFile({ fileId: data.ublId }); // Fetch the file using the file ID
        if (file.error) {
          showAlert(
            file.data.error ? file.data.error : 'Error opening the file',
            'tomato'
          );
        } else {
          const fileString =
            typeof file === 'string' ? file : new TextDecoder().decode(file); // Decode the file content
          setXmlData(fileString); // Set the XML data state
        }
      } catch (error) {
        showAlert('Error opening the file', 'tomato');
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getValidatorDataById, getUser, setLatestData]); // Dependencies for the effect

  // Function to render XML content recursively
  const renderXml = (node) => {
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue.trim() ? <span>{node.nodeValue}</span> : null;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      return (
        <div style={{ marginLeft: '50px' }}>
          <strong>{node.nodeName}:</strong>
          {Array.from(node.childNodes).map((childNode, index) => (
            <div key={index}>{renderXml(childNode)}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Function to parse the XML string into a document
  const parseXml = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    return xmlDoc.documentElement;
  };

  // Function to download the XML content as a file
  const downloadXml = () => {
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ubl-file.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BoardContainer>
      {xmlData ? (
        <>
          {/* Button to download the XML file */}
          <StickyButton
            variant="contained"
            color="primary"
            onClick={downloadXml}
          >
            Download XML
          </StickyButton>
          {/* Title for the XML data */}
          <Title variant="h4">XML Data</Title>
          {/* Container for displaying the parsed XML content */}
          <XmlContainer>{renderXml(parseXml(xmlData))}</XmlContainer>
        </>
      ) : (
        // Loading indicator while the XML data is being fetched
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      )}
    </BoardContainer>
  );
};

export default UblBoard;
