const user = require('../models/user');

// This function retrieves a user's email history.
const getUserEmailHistory = async (req, res) => {
  try {
    const userReal = await user
      .findById(req.user.userId)
      .select('historyEmail'); // Find user by ID and select only the historyEmail field.
    if (!userReal) {
      return res.status(404).json({ error: 'User not found' }); // Return 404 if user is not found.
    }

    res.status(200).json(userReal.historyEmail); // Respond with the user's email history.
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' }); // Catch and return server errors.
  }
};

module.exports = getUserEmailHistory;
