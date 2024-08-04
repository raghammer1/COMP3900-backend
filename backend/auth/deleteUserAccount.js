const user = require('../models/user');
const bcrypt = require('bcryptjs');

// Function to delete a user account based on credentials
const deleteUserAccount = async (req, res) => {
  try {
    let { password, googleId, username, userId } = req.body;

    const User = await user.findById(userId); // Find user by ID

    if (googleId) {
      // Handle deletion for Google users
      if (User && username === User.username) {
        await user.deleteOne({ _id: userId });
        res
          .status(200)
          .json({ message: 'Google user account deleted successfully' });
      } else {
        return res.status(401).json({ error: 'Invalid username' });
      }
    } else {
      // Handle deletion for standard users
      if (User && (await bcrypt.compare(password, User.password))) {
        await user.deleteOne({ _id: userId });
        res.status(200).json({ message: 'User account deleted successfully' });
      } else {
        return res.status(400).json({ error: 'Invalid Password' });
      }
    }
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = deleteUserAccount; // Export the function
