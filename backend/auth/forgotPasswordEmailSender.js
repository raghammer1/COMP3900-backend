require('dotenv').config();
const nodemailer = require('nodemailer');
const forgotPasswordModel = require('../models/forgotPasswordModel');
const user = require('../models/user');
const crypto = require('crypto');

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const forgotPasswordEmailSender = async (req, res) => {
  const email = req.body.email;

  const User = await user.findOne({
    email: email.toLowerCase(),
  });

  if (!email) {
    return res.status(400).send('Email is required');
  }

  const record = await forgotPasswordModel.findOne({ email });

  if (record) {
    return res.status(400).send(record.createdAt);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const token = generateToken();
  await forgotPasswordModel.create({ email, token });

  const resetLink = `http://localhost:3000/reset-password/${token}`;

  let emailHTML = null;

  console.log(User);

  if (!User) {
    emailHTML =
      '<h1>Please sign in to continue...</h1> <p>http://localhost:3000/register</p>';
  } else {
    emailHTML = `<div><img src="https://images.pexels.com/photos/15107263/pexels-photo-15107263/free-photo-of-night-sky-above-the-trees.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"/><h1>Your OTP</h1><p>Please reset your password from here: <strong> <a href="${resetLink}">Reset Password</a></strong></p></div>`;
  }

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: 'HexaHunks Reset Password',
    text: `Reset your Password`,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send(`OTP SENT TO ${email}`);
  } catch (error) {
    console.error('Failed to send email', error);
    res.status(403).send('Unable to send email error: ' + error.message);
  }
};

module.exports = forgotPasswordEmailSender;
