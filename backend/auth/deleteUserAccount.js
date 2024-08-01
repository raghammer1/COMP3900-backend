const user = require('../models/user');
const bcrypt = require('bcryptjs');

// Function to delete a user account, handling both Google and regular users
const deleteUserAccount = async (req, res) => {
  try {
    let { password, googleId, username, userId } = req.body; // Extract user details from the request

    console.log('CAME HERE TO DELETE USER', userId, password, googleId); // Log details for debugging

    const User = await user.findById(userId); // Find the user by ID

    if (googleId) {
      // If the user is a Google user, verify username and delete the account
      if (User && username === User.username) {
        await user.deleteOne({ _id: userId });
        res
          .status(200)
          .json({ message: 'Google user account deleted successfully' });
      } else {
        return res.status(401).json({ error: 'Invalid username' }); // Username mismatch
      }
    } else {
      // For regular users, verify password and delete the account
      if (User && (await bcrypt.compare(password, User.password))) {
        await user.deleteOne({ _id: userId });
        res.status(200).json({ message: 'User account deleted successfully' });
      } else {
        return res.status(400).json({ error: 'Invalid Password' }); // Password mismatch
      }
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error, try again later' }); // Handle server errors
  }
};

module.exports = deleteUserAccount; // Export the function for use in other parts of the application
