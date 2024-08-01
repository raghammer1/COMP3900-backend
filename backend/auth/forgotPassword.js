const MailSender = require('../shared/MailSender'); // Importing mail sender utility
const forgotPasswordModel = require('../models/forgotPasswordModel'); // Importing model for password reset requests
const user = require('../models/user'); // Importing user model
const crypto = require('crypto'); // Importing crypto for token generation
const sendMail = require('./sendPasswordResetMail'); // Importing function to send password reset emails

// Function to generate a random token for password reset
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex'); // Generate a 32-byte random token and convert it to a hex string
};

// Main function to handle forgot password logic
const forgotPassword = async (req, res) => {
  const email = req.body.email; // Extract the email from the request body

  console.log(email); // Log the email for debugging

  if (!email) {
    // Check if email is provided
    return res.status(400).json({ error: 'Email is required' }); // Return an error if email is missing
  }
  console.log(email);

  try {
    // Try to process the password reset request
    const User = await user.findOne({ email: email.toLowerCase() }); // Find the user by email

    const record = await forgotPasswordModel.findOne({ email }); // Check if there is already a reset request for this email
    console.log(email);

    if (record) {
      // If a reset request already exists, calculate the remaining wait time
      const currentTime = new Date();
      const createdAt = record.createdAt;
      const expirationTime = new Date(createdAt.getTime() + 90 * 1000); // 90 seconds expiration
      const remainingTime = Math.max(
        0,
        Math.ceil((expirationTime - currentTime) / 1000)
      );

      return res
        .status(400)
        .json({ error: `Retry after ${remainingTime} seconds` }); // Inform the user to retry later
    }
    console.log(email);

    const token = generateToken(); // Generate a new token
    await forgotPasswordModel.create({ email, token }); // Save the token in the database
    console.log(email);

    const resetLink = `http://localhost:3000/reset-password/${token}`; // Create a password reset link
    console.log(email);

    let emailHTML = null; // Initialize the HTML content for the email

    console.log(User);

    // Prepare different email content based on user type
    if (!User) {
      // If the user is not found, suggest signing up
      emailHTML =
        '<h1>You are not a hex member yet, please sign in to continue...</h1> <p>http://localhost:3000/register</p>';
    } else if (User.googleId) {
      // If the user uses Google login, inform them accordingly
      emailHTML =
        '<h1>You are a hex member using google account, please log in using google to continue...</h1> <p>http://localhost:3000/login</p>';
    } else {
      // For regular users, provide the reset link
      emailHTML = `<div><img src="https://images.pexels.com/photos/15107263/pexels-photo-15107263/free-photo-of-night-sky-above-the-trees.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"/><h1>Your OTP</h1><p>Please reset your password from here: <strong> <a href="${resetLink}">Reset Password</a></strong></p></div>`;
    }
    console.log(email);

    // Set up mail options
    const mailOptions = {
      from: process.env.MY_EMAIL, // Sender's email address
      to: email, // Recipient's email address
      subject: 'HexaHunks Reset Password', // Subject line
      text: `Reset your Password`, // Plain text message
      html: emailHTML, // HTML content
    };
    console.log(email);

    await sendMail(mailOptions); // Send the email
    res.status(200).send(`OTP SENT TO ${email}`); // Respond with a success message
  } catch (err) {
    return res.status(500).json({ error: 'Server error, try again later' }); // Handle server errors
  }
};

module.exports = forgotPassword; // Export the forgotPassword function
