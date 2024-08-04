// Importing axios for HTTP requests and form-data for handling file uploads
const axios = require('axios');
const FormData = require('form-data');

// Veryfi API endpoint for uploading documents
const url = 'https://api.veryfi.com/api/v7/partner/documents/';

// Setting up the headers with environment variables for security
const headers = {
  Accept: 'application/json',
  'CLIENT-ID': process.env.VERYFI_CLIENT_ID,
  AUTHORIZATION: `apikey ${process.env.VERYFI_USERNAME}:${process.env.VERYFI_API_KEY}`,
  'X-Veryfi-Client-Id': process.env.VERYFI_CLIENT_ID,
  'X-Veryfi-Client-Secret': process.env.VERYFI_CLIENT_SECRET,
};

// Function to upload an invoice to Veryfi
async function uploadInvoice(fileBuffer, fileName) {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, { filename: fileName });

    // Include formData headers in the request
    const formHeaders = formData.getHeaders();

    // Send POST request to upload the document
    const response = await axios.post(url, formData, {
      headers: { ...headers, ...formHeaders },
    });

    // Return the JSON representation of the processed invoice
    return response.data;
  } catch {
    // Return null in case of an error
    return null;
  }
}

module.exports = uploadInvoice;
