const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // keeping given password first and password from db second is extremely important
    if (user && (await bcrypt.compare(password, user.password))) {
      // send token
      const token = jwt.sign(
        {
          userId: user._id,
          email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: '24hr' }
      );

      // return res.status(201).json({
      //   username: user.username,
      //   token,
      //   email: user.email,
      //   _id: user._id,
      // });
      // Set the token as a cookie
      res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (24 hours)
      });

      return res.status(201).json({
        username: user.username,
        email: user.email,
        _id: user._id,
      });
    }
    return res.status(400).send('Invalid Credential');
  } catch (err) {
    return res.status(500).send('Server error: ' + err.message);
  }
};

module.exports = postLogin;
