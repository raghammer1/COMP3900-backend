require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const MY_EMAIL = 'hexahunks@gmail.com';
const MY_PASSWORD = 'ahor ackk laus fgar';
const CLIENT_SECRET = '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';
const CLIENT_ID =
  '968770887167-m6lkh6df3hi8a9ie7pjbacufvjlnrhps.apps.googleusercontent.com';
const ACCESS_TOKEN =
  'ya29.a0AXooCgtM60QEmKqgO2EbSahQz0NsLKBLbjNeg0_5gImZD5fpprIPPrkgipNnDkvtIPfV9JFAwhs6Q-kYDmMDW1FO2fDnl3DIoTVoQ10waOzoEDMf112uLpL_zFNBOtUH38UAGByoBz6eHQkwLKbFfgl0rnN1YC3JY-FdaCgYKAT4SARASFQHGX2MiGSclZwXkhWfrIOY8l1pyug0171';
const REFRESH_TOKEN =
  '1//04HPXTvDmIwVDCgYIARAAGAQSNwF-L9IrjYSPi5hnJL6IHkE-X58SFu8NA8bWbMViUm3zw9pKfHOqUHW57op4hSRhniaBYFZEaiE';
const REDIRECT_URI = 'http://localhost:3000/';

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this url:', authUrl);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
  rl.close();
});
