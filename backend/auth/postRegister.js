const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  // res.send('register route');
  try {
    const { username, password, email } = req.body;

    console.log('REQUEST CAME', username);

    // check if user exists
    const userExists = await User.exists({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(409).send('Email already in use');
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user documnet and save in the db
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    });

    //! create the jwt token so that user can be logged in and when token expires user is logged out
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
      // httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: false, // Ensures the cookie is sent over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (24 hours)
    });

    return res.status(201).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      gln: user.gln,
    });
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
};

module.exports = postRegister;
