const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  try {
    const { googleId, email, username, googlePicture } = req.body;

    // Check if a user with the Google ID exists in the database
    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId,
        email: email.toLowerCase(),
        username,
        googlePicture,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '24hr' }
    );

    // Set the token in a cookie
    res.cookie('token', token, {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (24 hours)
    });

    // Return user data in the response
    return res.status(200).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      googlePicture: user.googlePicture,
      googleId: user.googleId,
      gln: user.gln,
    });
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = googleLogin;
