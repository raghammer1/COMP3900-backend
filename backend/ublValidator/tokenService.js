const axios = require('axios');
const qs = require('qs');

let token = null;
let tokenExpiry = null;

const fetchToken = async () => {
  try {
    const response = await axios.post(
      'https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token',
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: '7d30bi87iptegbrf2bp37p42gg',
        client_secret: '880tema3rvh3h63j4nquvgoh0lgts11n09bq8597fgrkvvd62su',
        scope: 'eat/read',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    token = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000; // expires_in is in seconds

    return token;
  } catch (error) {
    throw error;
  }
};

const getToken = async () => {
  if (!token || Date.now() >= tokenExpiry) {
    return await fetchToken();
  }
  return token;
};

module.exports = { getToken };
