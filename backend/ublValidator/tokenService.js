const axios = require('axios');
const qs = require('qs');

let token = null;
let tokenExpiry = null;

const fetchToken = async () => {
  try {
    const response = await axios.post(
      'https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token',
      qs.stringify({
        grant_type: process.env.VALIDATE_TOKEN_GRANT_TYPE,
        client_id: process.env.VALIDATE_TOKEN_CLIENT_ID,
        client_secret: process.env.VALIDATE_TOKEN_CLIENT_SECRET,
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
    throw new Error(error);
  }
};

const getToken = async () => {
  if (!token || Date.now() >= tokenExpiry) {
    return await fetchToken();
  }
  return token;
};

module.exports = { getToken };
