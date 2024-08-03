const forgotPasswordModel = require('../models/forgotPasswordModel');
const user = require('../models/user');
const crypto = require('crypto');
const sendMail = require('./sendPasswordResetMail');

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const User = await user.findOne({ email: email.toLowerCase() });

    const record = await forgotPasswordModel.findOne({ email });

    if (record) {
      const currentTime = new Date();
      const createdAt = record.createdAt;
      const expirationTime = new Date(createdAt.getTime() + 90 * 1000); // 90 seconds
      const remainingTime = Math.max(
        0,
        Math.ceil((expirationTime - currentTime) / 1000)
      ); // in seconds

      return res
        .status(400)
        .json({ error: `Retry after ${remainingTime} seconds` });
    }

    const token = generateToken();
    await forgotPasswordModel.create({ email, token });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    let emailHTML = null;

    if (!User) {
      emailHTML =
        '<h1>You are not a hex member yet, please sign in to continue...</h1> <p>http://localhost:3000/register</p>';
    } else if (User.googleId) {
      emailHTML =
        '<h1>You are a hex member using google account, please log in using google to continue...</h1> <p>http://localhost:3000/login</p>';
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

    await sendMail(mailOptions);
    res.status(200).send(`OTP SENT TO ${email}`);
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = forgotPassword;
