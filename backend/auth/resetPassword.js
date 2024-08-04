const forgotPasswordModel = require('../models/forgotPasswordModel');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

// This function handles resetting a user's password using a token from a password reset request.
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body; // Extract token and new password from the request body

  try {
    // Look for a password reset record with the given token
    const record = await forgotPasswordModel.findOne({ token });

    // Check if the token is valid and not expired
    if (!record || record.tokenExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid/Expired token' });
    }

    // Find the user associated with the reset token
    const User = await user.findOne({ email: record.email });

    // Check if the user exists in the database
    if (!User) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    User.password = hashedPassword;
    await User.save();

    // Remove the reset record after a successful password reset
    await forgotPasswordModel.deleteOne({ token });

    res.status(200).send('Password reset successful');
  } catch {
    // Handle any server errors that occur
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = resetPassword;
