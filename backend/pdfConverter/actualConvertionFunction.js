const axios = require('axios');
const FormData = require('form-data');

// Veryfi API credentials
// const client_id = 'vrfCmSwXe2kGXlHaG85J5eNk0jfIxo8i0MBHapY';
// const client_secret =
//   'KARbwyHiyt4IbHhUkr2njcctUxBbrJgB6Uuw64a11ReCi1TPLT1MrpGpYoaJK8XzHW1ihiaU2pPXv2XSKFn7oJGcsPUsW85Cm8j3GHSbULgH8Nv01aoe09w2kkbWsf7i';
// const username = 'z5394767';
// const api_key = '8ccdbf65bdf579e001b3529d71b429dc';
const client_id = 'vrfdVb8IO07OG52N78ETJv9ogiAwxWMenyFaboc';
const client_secret =
  'Yl5zanndnCdLDwH750i9G0dUDa3WP7BZJgyuDSFfTYXJ5Xf2f5sCURG1kGOyl9sIAsbbtFaPD3AfO7hcpO2J5m9AdPVc8RFcrj38fwsrZwrB2HUfm2fH26T4JnjAAvJS';
const username = 'unwindingcuriousity';
const api_key = '44d3a7a654bd418fe07a948d7e54e7b2';

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

    return response.data; // This will be the JSON representation of your invoice
  } catch {
    return null;
  }
}

module.exports = uploadInvoice;
