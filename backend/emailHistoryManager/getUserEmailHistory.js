const user = require('../models/user');

const getUserEmailHistory = async (req, res) => {
  try {
    const userReal = await user
      .findById(req.user.userId)
      .select('historyEmail');
    if (!userReal) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userReal.historyEmail);
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

module.exports = getUserEmailHistory;
