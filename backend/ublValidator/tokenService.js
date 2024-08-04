const axios = require('axios');
const qs = require('qs');

let token = null; // Variable to store the access token
let tokenExpiry = null; // Variable to store the token expiry time

// Function to fetch a new access token
const fetchToken = async () => {
  try {
    const response = await axios.post(
      'https://dev-eat.auth.eu-central-1.amazoncognito.com/oauth2/token', // URL to request a token from
      qs.stringify({
        grant_type: process.env.VALIDATE_TOKEN_GRANT_TYPE, // Grant type for the OAuth2 token request
        client_id: process.env.VALIDATE_TOKEN_CLIENT_ID, // Client ID from environment variables
        client_secret: process.env.VALIDATE_TOKEN_CLIENT_SECRET, // Client secret from environment variables
        scope: 'eat/read', // The scope of the access token
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Content type for the request
        },
      }
    );

    // Store the access token and calculate the expiry time
    token = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000; // expires_in is in seconds

    return token; // Return the new access token
  } catch (error) {
    // Throw an error if the token request fails
    throw new Error(error);
  }
};

// Function to get a valid access token
const getToken = async () => {
  // Check if the token is expired or not set
  if (!token || Date.now() >= tokenExpiry) {
    return await fetchToken(); // Fetch a new token if needed
  }
  return token; // Return the existing valid token
};

// Export the getToken function for use in other modules
module.exports = { getToken };
