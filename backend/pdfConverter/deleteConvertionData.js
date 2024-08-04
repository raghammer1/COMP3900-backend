const mongoose = require('mongoose');

// This function deletes a specific conversion entry for a user
const deleteConvertionData = async (req, res) => {
  const { userId, dataId } = req.query; // Extract userId and dataId from query parameters
  try {
    // Find the user by ID
    const user = await mongoose.model('User').findById(userId);
    if (!user) return res.status(409).json({ error: 'User not found' });

    // Locate the conversion entry within the user's data
    const convertionEntry = user.pdfUblValidation.id(dataId);
    if (!convertionEntry)
      return res.status(409).json({ error: 'Validation entry not found' });

    // Filter out the entry with the specified dataId
    user.pdfUblValidation = user.pdfUblValidation.filter(
      (entry) => entry.id !== dataId
    );

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(200).send({ message: 'Convertion entry deleted successfully' });
  } catch (error) {
    // Handle errors during the deletion process
    res.status(401).json({ error: `Error during deletion process: ${error}` });
  }
};

module.exports = deleteConvertionData;
