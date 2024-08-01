const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // check if user exists
    const userExists = await User.exists({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
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

    res.cookie('token', token, {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      googlePicture:
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      gln: user.gln,
    });
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = postRegister;
