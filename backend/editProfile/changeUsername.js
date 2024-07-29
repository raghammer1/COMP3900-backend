const mongoose = require('mongoose');
const user = require('../models/user');

const changeUsername = async (req, res) => {
  const { newUsername, userId } = req.body;
  if (!newUsername || !userId) {
    return res
      .status(400)
      .json({ error: 'Missing image or userId in request body' });
  }
  try {
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the Username
    User.username = newUsername;
    await User.save();

    return res.status(200).json({ message: 'Username updated successfully' });
  } catch {
    return res
      .status(500)
      .json({ error: 'Server error, Please try again later' });
  }
};

module.exports = changeUsername;
