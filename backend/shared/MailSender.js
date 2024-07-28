require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

const createEmailWithAttachments = (mailOptions) => {
  const boundary = 'boundary';
  const emailParts = [];

  emailParts.push(
    `To: ${mailOptions.to}`,
    `Subject: ${mailOptions.subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary=${boundary}`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    `${mailOptions.html || mailOptions.text}`,
    ''
  );

  mailOptions.attachments.forEach((attachment) => {
    emailParts.push(
      `--${boundary}`,
      `Content-Type: ${attachment.contentType}`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      '',
      attachment.content,
      ''
    );
  });

  emailParts.push(`--${boundary}--`);

  return emailParts.join('\r\n');
};

const sendEmailUsingGmailAPI = async (mailOptions) => {
  const rawEmail = createEmailWithAttachments(mailOptions);

  const encodedEmail = Buffer.from(rawEmail)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedEmail,
    },
  });

  console.log('Email sent successfully:', res.data);
};

const MailSender = async (mailOptions) => {
  try {
    await sendEmailUsingGmailAPI(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = MailSender;
