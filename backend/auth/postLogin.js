const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Check if user exists and password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create a JWT token with user details
      const token = jwt.sign(
        {
          userId: user._id,
          email,
        },
        process.env.TOKEN_KEY, // Secret key from environment variables
        { expiresIn: '24hr' } // Token expires in 24 hours
      );

      // Set token in a cookie
      res.cookie('token', token, {
        secure: false, // Consider true for HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      });

      // Respond with user details
      return res.status(201).json({
        username: user.username,
        email: user.email,
        _id: user._id,
        googlePicture: user.googlePicture,
        gln: user.gln,
      });
    }

    // If credentials are invalid
    return res.status(400).json({ error: 'Invalid Credential' });
  } catch {
    // Handle any server errors
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = postLogin;
