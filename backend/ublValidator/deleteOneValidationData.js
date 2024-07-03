const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');

const deleteOneValidationData = async (req, res) => {
  const { userId, dataId } = req.query;
  console.log(userId, dataId);
  try {
    const user = await mongoose.model('User').findById(userId);
    if (!user) throw new Error('User not found');

    const validationEntry = user.ublValidation.id(dataId);
    if (!validationEntry) throw new Error('Validation entry not found');

    const gfs = getGridFSBucket();

    // Delete ublId file
    if (validationEntry.ublId) {
      await deleteFileFromGridFS(gfs, validationEntry.ublId);
    }

    // Delete validatorId file
    if (validationEntry.validatorId) {
      await deleteFileFromGridFS(gfs, validationEntry.validatorId);
    }

    // Remove the validation entry by filtering out the entry with the specified dataId
    user.ublValidation = user.ublValidation.filter(
      (entry) => entry.id !== dataId
    );

    // Save the updated user document
    await user.save();

    console.log('Files and validation entry deleted successfully');
    res
      .status(200)
      .send({ message: 'Files and validation entry deleted successfully' });
  } catch (error) {
    console.error('Error during deletion process:', error);
    res
      .status(401)
      .send({ message: `Error during deletion process: ${error}` });
  }
};

const deleteFileFromGridFS = async (gfs, fileId) => {
  const fileDeletionResult = await gfs.delete(
    new mongoose.Types.ObjectId(fileId)
  );
  console.log(`File deleted successfully: ${fileId}`);
  return fileDeletionResult;
};

module.exports = deleteOneValidationData;
