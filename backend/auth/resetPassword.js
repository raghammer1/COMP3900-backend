const forgotPasswordModel = require('../models/forgotPasswordModel');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const record = await forgotPasswordModel.findOne({ token });

    if (!record || record.tokenExpiration < Date.now()) {
      return res.status(400).send('Invalid or expired token');
    }

    const User = await user.findOne({ email: record.email });

    if (!User) {
      return res.status(400).send('User does not exist');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    User.password = hashedPassword;
    await User.save();

    // Remove the reset record after successful password reset
    await forgotPasswordModel.deleteOne({ token });

    res.status(200).send('Password reset successful');
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
};

module.exports = resetPassword;
