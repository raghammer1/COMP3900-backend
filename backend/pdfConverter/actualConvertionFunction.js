// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const { create } = require('xmlbuilder2');

// // Veryfi API credentials
// const client_id = 'vrfCmSwXe2kGXlHaG85J5eNk0jfIxo8i0MBHapY';
// const client_secret =
//   'KARbwyHiyt4IbHhUkr2njcctUxBbrJgB6Uuw64a11ReCi1TPLT1MrpGpYoaJK8XzHW1ihiaU2pPXv2XSKFn7oJGcsPUsW85Cm8j3GHSbULgH8Nv01aoe09w2kkbWsf7i';
// const username = 'z5394767';
// const api_key = '8ccdbf65bdf579e001b3529d71b429dc';

// // The endpoint URL for uploading documents
// const url = 'https://api.veryfi.com/api/v7/partner/documents/';

// // The PDF file to convert
// const pdfFilePath = path.resolve(__dirname, 'Invoice_BIG.pdf');

// // Read the PDF file
// const pdfFile = fs.createReadStream(pdfFilePath);

// // Headers
// const headers = {
//   Accept: 'application/json',
//   'CLIENT-ID': client_id,
//   AUTHORIZATION: `apikey ${username}:${api_key}`,
//   'X-Veryfi-Client-Id': client_id,
//   'X-Veryfi-Client-Secret': client_secret,
// };

// // Form data
// const FormData = require('form-data');
// const formData = new FormData();
// formData.append('file', pdfFile);

// // Include headers from formData in the request
// const formHeaders = formData.getHeaders();

// async function uploadInvoice() {
//   try {
//     const response = await axios.post(url, formData, {
//       headers: { ...headers, ...formHeaders },
//     });
//     console.log('Conversion successful!');
//     return response.data; // This will be the JSON representation of your invoice
//   } catch (error) {
//     console.error('Failed to convert PDF to JSON:', error.response.status);
//     console.error(error.response.data);
//     return null;
//   }
// }

// module.exports = uploadInvoice;
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Veryfi API credentials
const client_id = 'vrfCmSwXe2kGXlHaG85J5eNk0jfIxo8i0MBHapY';
const client_secret =
  'KARbwyHiyt4IbHhUkr2njcctUxBbrJgB6Uuw64a11ReCi1TPLT1MrpGpYoaJK8XzHW1ihiaU2pPXv2XSKFn7oJGcsPUsW85Cm8j3GHSbULgH8Nv01aoe09w2kkbWsf7i';
const username = 'z5394767';
const api_key = '8ccdbf65bdf579e001b3529d71b429dc';

// The endpoint URL for uploading documents
const url = 'https://api.veryfi.com/api/v7/partner/documents/';

// Headers
const headers = {
  Accept: 'application/json',
  'CLIENT-ID': client_id,
  AUTHORIZATION: `apikey ${username}:${api_key}`,
  'X-Veryfi-Client-Id': client_id,
  'X-Veryfi-Client-Secret': client_secret,
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
    console.log('Conversion successful!');
    return response.data; // This will be the JSON representation of your invoice
  } catch (error) {
    console.error('Failed to convert PDF to JSON:', error.response.status);
    console.error(error.response.data);
    return null;
  }
}

module.exports = uploadInvoice;
