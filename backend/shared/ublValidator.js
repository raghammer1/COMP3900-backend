const axios = require('axios');
const FormData = require('form-data');
const { Readable } = require('stream');
const crypto = require('crypto');
const { getGridFSBucket } = require('../db');
const generateErrorReportPDF = require('./generatePdfErrorReport');
const { getToken } = require('../ublValidator/tokenService');

const validateUBL = async (ublBuffer, originalFilename, mimeType) => {
  const validationUrl =
    'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

  try {
    // Validate the UBL file
    const apiKey = await getToken();

    const form = new FormData();
    const validationFileStream = new Readable();
    validationFileStream.push(ublBuffer);
    validationFileStream.push(null);

    form.append('file', validationFileStream, {
      filename: originalFilename,
      contentType: mimeType,
    });

    const response = await axios.post(validationUrl, form, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        ...form.getHeaders(),
      },
    });

    const validationErrors =
      response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors;

    // Generate PDF
    const pdfBytes = await generateErrorReportPDF(validationErrors);

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
    throw new Error(`Error validating UBL file: ${error.message}`);
  }
};

module.exports = validateUBL;
