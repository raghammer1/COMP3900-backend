require('dotenv').config();
const nodemailer = require('nodemailer');

const MailSender = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  await transporter.sendMail(mailOptions);
  console.log('Email sent successfully');
};

module.exports = MailSender;
