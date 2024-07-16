import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { styled } from '@mui/material/styles';
import { getAnyFile } from '../../../services/api';
import useUserStore from '../../../zustand/useUserStore';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

const StickyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  position: 'sticky',
  top: theme.spacing(2),
  alignSelf: 'flex-end',
  zIndex: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'left',
  marginTop: 0,
}));

const UblBoard = () => {
  const { id } = useParams();
  const [xmlData, setXmlData] = useState(null);
  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  );
  const setLatestData = useValidatorStore((state) => state.setLatestData);
  const { getUser } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = getValidatorDataById(id);
        const file = await getAnyFile({ fileId: data.ublId });
        const fileString =
          typeof file === 'string' ? file : new TextDecoder().decode(file);
        setXmlData(fileString);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    }

    fetchData();
  }, [id, getValidatorDataById, getUser, setLatestData]);

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

  const parseXml = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    return xmlDoc.documentElement;
  };

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
          <StickyButton
            variant="contained"
            color="primary"
            onClick={downloadXml}
          >
            Download XML
          </StickyButton>
          <Title variant="h4">XML Data</Title>
          <XmlContainer>{renderXml(parseXml(xmlData))}</XmlContainer>
        </>
      ) : (
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
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import useValidatorStore from '../../../zustand/useValidatorStore';
// import { styled } from '@mui/material/styles';
// import { getAnyFile } from '../../../services/api';
// import useUserStore from '../../../zustand/useUserStore';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// const BoardContainer = styled('div')(({ theme }) => ({
//   padding: theme.spacing(4),
//   borderRadius: theme.shape.borderRadius,
//   margin: '0 auto',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   height: '80vh',
//   overflow: 'auto',
//   width: '90%',
//   backgroundColor: '#fff',
//   boxShadow: theme.shadows[5],
//   position: 'relative',
// }));

// const XmlContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   marginTop: theme.spacing(4),
//   padding: theme.spacing(2),
//   backgroundColor: '#f5f5f5',
//   borderRadius: theme.shape.borderRadius,
//   overflow: 'auto',
//   maxHeight: '60vh',
//   width: '100%',
//   wordBreak: 'break-word',
// }));

// const StickyButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(2),
//   position: 'sticky',
//   top: theme.spacing(2),
//   alignSelf: 'flex-end',
//   zIndex: 1,
// }));

// const Title = styled(Typography)(({ theme }) => ({
//   color: theme.palette.primary.main,
//   textAlign: 'left',
//   marginTop: 0,
// }));

// const UblBoard = () => {
//   const { id } = useParams();
//   const [xmlData, setXmlData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedXmlData, setEditedXmlData] = useState('');
//   const getValidatorDataById = useValidatorStore(
//     (state) => state.getValidatorDataById
//   );
//   const setLatestData = useValidatorStore((state) => state.setLatestData);
//   const { getUser } = useUserStore();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = getValidatorDataById(id);
//         const file = await getAnyFile({ fileId: data.ublId });
//         const fileString =
//           typeof file === 'string' ? file : new TextDecoder().decode(file);
//         setXmlData(fileString);
//         setEditedXmlData(fileString);
//       } catch (error) {
//         console.error('An unexpected error occurred:', error);
//       }
//     }

//     fetchData();
//   }, [id, getValidatorDataById, getUser, setLatestData]);

//   const renderXml = (node) => {
//     if (!node) return null;
//     if (node.nodeType === Node.TEXT_NODE) {
//       return node.nodeValue.trim() ? <span>{node.nodeValue}</span> : null;
//     }
//     if (node.nodeType === Node.ELEMENT_NODE) {
//       return (
//         <div style={{ marginLeft: '50px' }}>
//           <strong>{node.nodeName}:</strong>
//           {Array.from(node.childNodes).map((childNode, index) => (
//             <div key={index}>{renderXml(childNode)}</div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const parseXml = (xmlString) => {
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
//     return xmlDoc.documentElement;
//   };

//   const downloadXml = () => {
//     const blob = new Blob([xmlData], { type: 'application/xml' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'ubl-file.xml';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setXmlData(editedXmlData);
//     setIsEditing(false);
//   };

//   return (
//     <BoardContainer>
//       {xmlData ? (
//         <>
//           <StickyButton
//             variant="contained"
//             color="primary"
//             onClick={downloadXml}
//           >
//             Download XML
//           </StickyButton>
//           {!isEditing && (
//             <StickyButton
//               variant="contained"
//               color="secondary"
//               onClick={handleEdit}
//             >
//               Edit XML
//             </StickyButton>
//           )}
//           {isEditing ? (
//             <>
//               <TextField
//                 multiline
//                 fullWidth
//                 minRows={10}
//                 maxRows={20}
//                 variant="outlined"
//                 value={editedXmlData}
//                 onChange={(e) => setEditedXmlData(e.target.value)}
//               />
//               <StickyButton
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSave}
//               >
//                 Save
//               </StickyButton>
//             </>
//           ) : (
//             <>
//               <Title variant="h4">XML Data</Title>
//               <XmlContainer>{renderXml(parseXml(xmlData))}</XmlContainer>
//             </>
//           )}
//         </>
//       ) : (
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           height="100%"
//         >
//           <CircularProgress />
//         </Box>
//       )}
//     </BoardContainer>
//   );
// };

// export default UblBoard;
