const { Readable } = require('stream');
const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const { getGridFSBucket } = require('../db');
const validateUBL = require('../shared/ublValidator');

const validateUblFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const userId = req.body.userId;
    const name = req.body.name;
    console.log('name', name);

    const existingUser = await user.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const filename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(req.file.originalname);

    // Step 1: Save the file to GridFS
    const fileStream = new Readable();
    fileStream.push(req.file.buffer);
    fileStream.push(null);

    const gridFSBucket = getGridFSBucket();
    const uploadStream = gridFSBucket.openUploadStream(filename);

    uploadStream.on('error', (error) => {
      return res
        .status(500)
        .json({ error: 'Error uploading file', details: error.message });
    });

    uploadStream.on('finish', async () => {
      try {
        const ublId = uploadStream.id;

        // Step 2: Validate the UBL file and get validatorId
        const validatorId = await validateUBL(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );

        const ublValidationObject = {
          ublId: ublId,
          validatorId: validatorId,
          name,
        };

        const updatedUser = await user.findByIdAndUpdate(
          userId,
          { $push: { ublValidation: ublValidationObject } },
          { new: true, useFindAndModify: false }
        );

        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Find the newly added ublValidationObject with its _id
        const newlyAddedObject = updatedUser.ublValidation.find(
          (obj) =>
            obj.ublId.toString() === ublId.toString() &&
            obj.validatorId.toString() === validatorId.toString()
        );

        res.status(200).json({
          message:
            'UBL file uploaded, validated, and user updated successfully!',
          ublId,
          validatorId,
          newObjectId: newlyAddedObject._id,
          name,
          date: newlyAddedObject.date,
        });
      } catch (updateError) {
        res.status(500).json({
          error: 'Error updating user with UBL file ID',
          details: updateError.message,
        });
      }
    });

    fileStream.pipe(uploadStream);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = validateUblFile;
