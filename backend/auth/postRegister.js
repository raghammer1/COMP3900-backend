const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if a user already exists with the given email
    const userExists = await User.exists({ email: email.toLowerCase() });

    if (userExists) {
      // If email is already in use, send a 400 response
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Encrypt the password with bcrypt
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new user document and save it to the database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });

    // Create a JWT token for the newly registered user
    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.TOKEN_KEY, // Secret key for signing the token
      { expiresIn: '24hr' } // Token expires in 24 hours
    );

    // Set the JWT token in a cookie to log the user in
    res.cookie('token', token, {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
    });

    // Respond with the user's data upon successful registration
    return res.status(201).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      gln: user.gln, // Note: Make sure this is correctly handled if it's a required field
    });
  } catch {
    // Send a 500 error response if there is a server error
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = postRegister;
