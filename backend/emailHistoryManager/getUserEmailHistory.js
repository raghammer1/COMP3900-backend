const user = require('../models/user');

const getUserEmailHistory = async (req, res) => {
  try {
    const userReal = await user
      .findById(req.user.userId)
      .select('historyEmail');
    if (!userReal) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userReal.historyEmail);
  } catch (  ) {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = getUserEmailHistory;
