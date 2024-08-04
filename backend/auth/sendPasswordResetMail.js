const nodemailer = require('nodemailer');
require('dotenv').config();

// We set up the email transporter using Gmail, utilizing environment variables for security.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL, // This is our email address stored in environment variables.
    pass: process.env.MY_PASSWORD, // This is our email password or app password from environment variables.
  },
});

// This function sends an email with the provided mail options.
const sendMail = async (mailOptions) => {
  try {
    // We send the email using the transporter we configured.
    await transporter.sendMail(mailOptions);
  } catch {
    // If there's an error, we throw an exception to indicate the email wasn't sent.
    throw new Error('Failed to send email');
  }
};

module.exports = sendMail;
