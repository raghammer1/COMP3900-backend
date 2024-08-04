const user = require('../models/user');

// This function retrieves conversion data for a specific user
const getConvertionData = async (req, res) => {
  const userId = req.query.userId; // Extract userId from the query parameters

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    // Find the user by ID and select only the pdfUblValidation field
    const User = await user.findById(userId).select('pdfUblValidation');

    // Check if the user exists
    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the conversion data
    res.status(200).json({ pdfUblValidation: User.pdfUblValidation });
  } catch {
    // Handle server errors
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = getConvertionData;
