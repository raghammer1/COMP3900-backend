const user = require('../models/user');

const getAllValidationData = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    const User = await user.findById(userId).select('ublValidation');

    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ ublValidation: User.ublValidation });
  } catch (  ) {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};
module.exports = getAllValidationData;
