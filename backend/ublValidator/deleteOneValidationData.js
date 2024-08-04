const mongoose = require('mongoose');

const deleteOneValidationData = async (req, res) => {
  const { userId, dataId } = req.query;
  try {
    const user = await mongoose.model('User').findById(userId);
    if (!user) return res.status(409).json({ error: 'User not found' });

    const validationEntry = user.ublValidation.id(dataId);
    if (!validationEntry)
      return res.status(409).json({ error: 'Validation entry not found' });

    // Remove the validation entry by filtering out the entry with the specified dataId
    user.ublValidation = user.ublValidation.filter(
      (entry) => entry.id !== dataId
    );

    // Save the updated user document
    await user.save();

    res.status(200).send({ message: 'Validation entry deleted successfully' });
  } catch (error) {
    res.status(401).json({ error: `Error during deletion process: ${error}` });
  }
};

module.exports = deleteOneValidationData;
