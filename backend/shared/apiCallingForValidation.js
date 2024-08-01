const { getToken } = require('../ublValidator/tokenService');
const axios = require('axios');
const FormData = require('form-data');
const { Readable } = require('stream');

const apiCallingForValidation = async (
  ublBuffer,
  originalFilename,
  mimeType
) => {
  try {
    const validationUrl =
      'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

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

    return validationErrors;
  } catch (  ) {
    throw new Error('API validation failed');
  }
};

module.exports = { apiCallingForValidation };
