import React from 'react';
import { styled } from '@mui/system';
import GetAppIcon from '@mui/icons-material/GetApp';

// This is the container for displaying the JSON content
const JsonContainer = styled('div')({
  maxWidth: 'fit-content',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#282c34',
  color: '#abb2bf',
  padding: '20px 30px',
  borderRadius: '10px',
  fontFamily: 'Fira Code, monospace',
  fontSize: '16px',
  lineHeight: '1.5',
  border: '1px solid #444',
  margin: '20px auto',
  position: 'relative',
});

// This button is for downloading the JSON content
const DownloadButton = styled('button')({
  top: '10px',
  left: '10px',
  backgroundColor: '#6200ea',
  border: 'none',
  borderRadius: '5px',
  padding: '8px',
  cursor: 'pointer',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#3700b3',
  },
});

// This is the text for the download button
const ButtonText = styled('span')({
  marginLeft: '8px',
  fontSize: '14px',
});

// This function highlights the JSON syntax
const SyntaxHighlight = ({ json }) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  json = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|([{}[\],])/g,
    (match) => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
  return { __html: json };
};

// This function downloads the JSON content as a file
const downloadJson = (jsonContent) => {
  const element = document.createElement('a');
  const file = new Blob([JSON.stringify(jsonContent, null, 2)], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'jsonContent.txt';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element); // Clean up
};

// This is the main component for displaying and downloading JSON validation content
const JsonValidationBoard = ({ jsonContent }) => {
  return (
    <div>
      {/* Here is the button to download the JSON content */}
      <DownloadButton onClick={() => downloadJson(jsonContent)}>
        <GetAppIcon fontSize="small" />
        <ButtonText>Download</ButtonText>
      </DownloadButton>
      {/* This container displays the JSON content with syntax highlighting */}
      <JsonContainer>
        <pre dangerouslySetInnerHTML={SyntaxHighlight({ json: jsonContent })} />
      </JsonContainer>
    </div>
  );
};

export default JsonValidationBoard;

// Here are the global styles for syntax highlighting
const globalStyles = `
  .string { color: #ce9178; }
  .number { color: #b5cea8; }
  .boolean { color: #569cd6; }
  .null { color: #dcdcaa; }
  .key { color: #9cdcfe; }
`;

// This injects the global styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);
