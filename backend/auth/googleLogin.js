const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  try {
    const { googleId, email, username, googlePicture } = req.body; // Extract Google user data from request

    // Look for a user in the database with the provided Google ID
    let user = await User.findOne({ googleId });

    // If no user is found by Google ID, check if a user exists with the given email
    if (!user) {
      user = await User.findOne({ email });
    }

    // If the user is not found, let's create a new user with the provided details
    if (!user) {
      user = new User({
        googleId,
        email: email.toLowerCase(), // Save email in lowercase for consistency
        username,
        googlePicture,
      });
      await user.save(); // Save the new user to the database
    }

    // Create a JWT token to authenticate the user session
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '24hr' }
    );

    // Set the JWT token in a cookie for client-side use
    res.cookie('token', token, {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send back user information in the response
    return res.status(200).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      googlePicture: user.googlePicture,
      googleId: user.googleId,
      gln: user.gln,
    });
  } catch {
    // Handle any errors that occur during the process
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = googleLogin;
