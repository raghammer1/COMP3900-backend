import React from 'react';
import parse from 'html-react-parser';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';

// This component is used for displaying HTML validation content
const HtmlValidationBoard = ({ htmlContent }) => {
  // Function to handle the download of the HTML content
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'validation.html';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    // Container div with a max height of 80vh
    <div style={{ maxHeight: '80vh' }}>
      {/* Download button */}
      <CustomPrimaryButton
        dataTestid={'download-html'}
        label="Download HTML"
        bgcolour="#651FFF"
        additionalStyle={{ marginBottom: '10px', width: 'fit-content' }}
        onClick={handleDownload}
      />
      {/* Conditionally render parsed HTML content or a loading message */}
      {htmlContent ? <div>{parse(htmlContent)}</div> : <p>Loading...</p>}
    </div>
  );
};

export default HtmlValidationBoard;
