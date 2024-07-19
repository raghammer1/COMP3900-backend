// // // require('dotenv').config();
// // // const nodemailer = require('nodemailer');

// // // const MailSender = async (mailOptions) => {
// // //   const transporter = nodemailer.createTransport({
// // //     service: 'gmail',
// // //     auth: {
// // //       user: process.env.MY_EMAIL,
// // //       pass: process.env.MY_PASSWORD,
// // //     },
// // //   });

// // //   await transporter.sendMail(mailOptions);
// // //   console.log('Email sent successfully');
// // // };

// // // module.exports = MailSender;
// // require('dotenv').config();
// // const { google } = require('googleapis');
// // const nodemailer = require('nodemailer');
// // const { OAuth2 } = google.auth;

// // const createTransporter = async () => {
// //   const oauth2Client = new OAuth2(
// //     process.env.CLIENT_ID,
// //     process.env.CLIENT_SECRET,
// //     'https://developers.google.com/oauthplayground'
// //   );

// //   oauth2Client.setCredentials({
// //     refresh_token: process.env.REFRESH_TOKEN,
// //   });

// //   try {
// //     // const accessToken = await oauth2Client.getAccessToken();

// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         type: 'OAuth2',
// //         user: process.env.MY_EMAIL,
// //         accessToken: process.env.ACCESS_TOKEN,
// //         clientId: process.env.CLIENT_ID,
// //         clientSecret: process.env.CLIENT_SECRET,
// //         refreshToken: process.env.REFRESH_TOKEN,
// //       },
// //     });

// //     return transporter;
// //   } catch (error) {
// //     console.error('Error creating access token:', error);
// //     throw new Error('Failed to create access token');
// //   }
// // };

// // const MailSender = async (mailOptions) => {
// //   try {
// //     const emailTransporter = await createTransporter();
// //     await emailTransporter.sendMail(mailOptions);
// //     console.log('Email sent successfully');
// //   } catch (error) {
// //     console.error('Failed to send email:', error);
// //     throw new Error('Failed to send email');
// //   }
// // };

// // module.exports = MailSender;
// require('dotenv').config();
// const { google } = require('googleapis');
// const { OAuth2 } = google.auth;

// const oauth2Client = new OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN,
//   access_token: process.env.ACCESS_TOKEN,
// });

// const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// const sendEmailUsingGmailAPI = async (mailOptions) => {
//   const email = [
//     `To: ${mailOptions.to}`,
//     `Subject: ${mailOptions.subject}`,
//     'Content-Type: text/html; charset=UTF-8',
//     'MIME-Version: 1.0',
//     '',
//     `${mailOptions.html || mailOptions.text}`,
//   ].join('\n');

//   const encodedEmail = Buffer.from(email)
//     .toString('base64')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_')
//     .replace(/=+$/, '');

//   const res = await gmail.users.messages.send({
//     userId: 'me',
//     requestBody: {
//       raw: encodedEmail,
//     },
//   });

//   console.log('Email sent successfully:', res.data);
// };

// const MailSender = async (mailOptions) => {
//   try {
//     await sendEmailUsingGmailAPI(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Failed to send email:', error);
//     throw new Error('Failed to send email');
//   }
// };

// module.exports = MailSender;
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
  access_token: process.env.ACCESS_TOKEN,
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
