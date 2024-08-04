const user = require('../models/user');

// Function to retrieve all validation data for a specific user
const getAllValidationData = async (req, res) => {
  const userId = req.query.userId; // Extract userId from the query parameters

  // Validate that userId is provided
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    // Find the user by ID and select only the ublValidation field
    const User = await user.findById(userId).select('ublValidation');

    // Check if the user exists
    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the validation data
    res.json({ ublValidation: User.ublValidation });
  } catch {
    // Handle server errors
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

// Export the function to be used in other modules
module.exports = getAllValidationData;
