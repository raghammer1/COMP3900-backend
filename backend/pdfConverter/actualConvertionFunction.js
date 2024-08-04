const axios = require('axios');
const FormData = require('form-data');

// The endpoint URL for uploading documents
const url = 'https://api.veryfi.com/api/v7/partner/documents/';

// Headers
const headers = {
  Accept: 'application/json',
  'CLIENT-ID': process.env.VERYFI_CLIENT_ID,
  AUTHORIZATION: `apikey ${process.env.VERYFI_USERNAME}:${process.env.VERYFI_API_KEY}`,
  'X-Veryfi-Client-Id': process.env.VERYFI_CLIENT_ID,
  'X-Veryfi-Client-Secret': process.env.VERYFI_CLIENT_SECRET,
};

async function uploadInvoice(fileBuffer, fileName) {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, { filename: fileName });

    // Include headers from formData in the request
    const formHeaders = formData.getHeaders();

    const response = await axios.post(url, formData, {
      headers: { ...headers, ...formHeaders },
    });
    return response.data; // This will be the JSON representation of your invoice
  } catch {
    return null;
  }
}

module.exports = uploadInvoice;
