const mongoose = require('mongoose');

// Function to delete a specific validation entry for a user
const deleteOneValidationData = async (req, res) => {
  const { userId, dataId } = req.query; // Extract userId and dataId from query parameters
  try {
    // Find the user by ID in the database
    const user = await mongoose.model('User').findById(userId);
    if (!user) return res.status(409).json({ error: 'User not found' });

    // Find the specific validation entry by ID
    const validationEntry = user.ublValidation.id(dataId);
    if (!validationEntry)
      return res.status(409).json({ error: 'Validation entry not found' });

    // Remove the validation entry from the user's validation list
    user.ublValidation = user.ublValidation.filter(
      (entry) => entry.id !== dataId
    );

    // Save the updated user document to the database
    await user.save();

    // Send a success response
    res.status(200).send({ message: 'Validation entry deleted successfully' });
  } catch (error) {
    // Handle errors during the deletion process
    res.status(401).json({ error: `Error during deletion process: ${error}` });
  }
};

// Export the function to be used in other modules
module.exports = deleteOneValidationData;
