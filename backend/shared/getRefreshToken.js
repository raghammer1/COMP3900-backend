require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const CLIENT_SECRET = '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';
const CLIENT_ID =
  '968770887167-m6lkh6df3hi8a9ie7pjbacufvjlnrhps.apps.googleusercontent.com';
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

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
  } catch (error) {}
  rl.close();
});
