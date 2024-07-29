const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (user && (await bcrypt.compare(password, user.password))) {
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

      console.log(user, 'THIS IS USER');

      return res.status(201).json({
        username: user.username,
        email: user.email,
        _id: user._id,
        googlePicture: user.googlePicture,
        gln: user.gln,
      });
    }
    return res.status(400).json({ error: 'Invalid Credential' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = postLogin;
