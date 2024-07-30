const { Readable } = require('stream');
const crypto = require('crypto');
const { getGridFSBucket } = require('../db');
const generateErrorReportPDF = require('./generatePdfErrorReport');
const invalidPdfProvidedPdfCreator = require('./invalidPdfProvidedPdfCreator');

const validateUBL = async (validationErrors, selfFilledIssue = null) => {
  try {
    let pdfBytes = null;

    if (validationErrors.length === 1 && validationErrors[0]?.error === true) {
      console.log('WOW I CAME HERE');
      pdfBytes = await invalidPdfProvidedPdfCreator();
      console.log(pdfBytes);
    } else {
      // Generate PDF
      if (selfFilledIssue === null) {
        pdfBytes = await generateErrorReportPDF(validationErrors);
      } else {
        pdfBytes = await generateErrorReportPDF(
          validationErrors,
          selfFilledIssue
        );
      }
    }

    if (pdfBytes === null) {
      throw new Error('Error validating UBL, failed to generate PDF report');
    }

    // Save PDF to GridFS
    const gridFSBucket = getGridFSBucket();
    const pdfFilename = `UBL_Validation_Error_Report_${crypto
      .randomBytes(8)
      .toString('hex')}.pdf`;
    const pdfStream = new Readable();
    pdfStream.push(pdfBytes);
    pdfStream.push(null);

    const pdfUploadStream = gridFSBucket.openUploadStream(pdfFilename);

    return new Promise((resolve, reject) => {
      pdfStream.pipe(pdfUploadStream);

      pdfUploadStream.on('error', (error) => {
        reject(new Error(`Error uploading PDF file: ${error.message}`));
      });

      pdfUploadStream.on('finish', () => {
        resolve(pdfUploadStream.id);
      });
    });
  } catch (error) {
    console.log(`Error validating UBL file: ${error.message}, error`, error);
    // return res.status(500).json({
    //   error: `Error validating UBL file: ${error.message}`,
    // });

    throw new Error('UBL validation failed');
  }
};

module.exports = validateUBL;
