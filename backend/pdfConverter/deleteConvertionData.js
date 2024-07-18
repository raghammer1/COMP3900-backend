const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');

const deleteConvertionData = async (req, res) => {
  const { userId, dataId } = req.query;
  console.log(userId, dataId);
  try {
    const user = await mongoose.model('User').findById(userId);
    if (!user) res.status(409).json({ error: 'User not found' });

    const convertionEntry = user.pdfUblValidation.id(dataId);
    if (!convertionEntry)
      res.status(409).json({ error: 'Validation entry not found' });

    const gfs = getGridFSBucket();

    // Delete ublId file
    if (convertionEntry.ublId) {
      await deleteFileFromGridFS(gfs, convertionEntry.ublId);
    }

    // Delete validatorId file
    if (convertionEntry.validatorId) {
      await deleteFileFromGridFS(gfs, convertionEntry.validatorId);
    }

    // Remove the validation entry by filtering out the entry with the specified dataId
    user.pdfUblValidation = user.pdfUblValidation.filter(
      (entry) => entry.id !== dataId
    );

    // Save the updated user document
    await user.save();

    console.log('Files and convertion entry deleted successfully');
    res
      .status(200)
      .send({ message: 'Files and convertion entry deleted successfully' });
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

module.exports = deleteConvertionData;
