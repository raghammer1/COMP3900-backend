const forgotPasswordModel = require('../models/forgotPasswordModel'); // Import forgot password model
const user = require('../models/user'); // Import user model
const crypto = require('crypto'); // Import crypto module for token generation
const sendMail = require('./sendPasswordResetMail'); // Import email sending utility

// Function to generate a random token
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Handle forgot password request
const forgotPassword = async (req, res) => {
  const email = req.body.email; // Extract email from request body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' }); // Validate email presence
  }

  try {
    const User = await user.findOne({ email: email.toLowerCase() }); // Find user by email

    // Check for existing password reset record
    const record = await forgotPasswordModel.findOne({ email });

    if (record) {
      const currentTime = new Date();
      const createdAt = record.createdAt;
      const expirationTime = new Date(createdAt.getTime() + 90 * 1000); // Token expiration (90 seconds)
      const remainingTime = Math.max(
        0,
        Math.ceil((expirationTime - currentTime) / 1000)
      ); // Calculate remaining time

      // Inform user to retry after cooldown period
      return res
        .status(400)
        .json({ error: `Retry after ${remainingTime} seconds` });
    }

    const token = generateToken(); // Generate a new token
    await forgotPasswordModel.create({ email, token }); // Save token in the database

    const resetLink = `http://localhost:3000/reset-password/${token}`; // Construct reset link

    let emailHTML = null; // Initialize email HTML content

    // Determine email content based on user account type
    if (!User) {
      emailHTML =
        '<h1>You are not a hex member yet, please sign in to continue...</h1> <p>http://localhost:3000/register</p>';
    } else if (User.googleId) {
      emailHTML =
        '<h1>You are a hex member using google account, please log in using google to continue...</h1> <p>http://localhost:3000/login</p>';
    } else {
      emailHTML = `<div><img src="https://images.pexels.com/photos/15107263/pexels-photo-15107263/free-photo-of-night-sky-above-the-trees.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"/><h1>Your OTP</h1><p>Please reset your password from here: <strong> <a href="${resetLink}">Reset Password</a></strong></p></div>`;
    }

    // Define email options
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'HexaHunks Reset Password',
      text: `Reset your Password`,
      html: emailHTML,
    };

    await sendMail(mailOptions); // Send password reset email
    res.status(200).send(`OTP SENT TO ${email}`); // Send success response
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' }); // Handle server errors
  }
};

module.exports = forgotPassword; // Export forgotPassword function
