const user = require('../models/user');
const bcrypt = require('bcryptjs');

const deleteUserAccount = async (req, res) => {
  try {
    // let userToDelete = req.user;
    let { password, googleId, username, userId } = req.body;
    console.log('CAME HERE TO DELETE USER', userId, password, googleId);

    const User = await user.findById(userId);

    if (googleId) {
      if (User && username === User.username) {
        await user.deleteOne({ _id: userId });
        res
          .status(200)
          .json({ message: 'Google user account deleted successfully' });
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } else {
      if (User && (await bcrypt.compare(password, User.password))) {
        await user.deleteOne({ _id: userId });
        res.status(200).json({ message: 'User account deleted successfully' });
      } else {
        return res.status(400).json({ error: 'Invalid Password' });
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};

module.exports = deleteUserAccount;
