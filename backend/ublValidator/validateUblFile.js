const { Readable } = require('stream');
const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const { getGridFSBucket } = require('../db');
const validateUBL = require('../shared/ublValidator');
const { defaultHtml } = require('../shared/defaultValidationHTML');
const { generateHtml } = require('../shared/htmlGeneratorValidation');
const {
  apiCallingForValidation,
} = require('../shared/apiCallingForValidation');
const { defaultJson } = require('../shared/defaultJson');

// Function to validate a UBL file uploaded by the user
const validateUblFile = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Extract userId and name from the request body
    const userId = req.body?.userId;
    const name = req.body?.name;

    // Validate that userId and name are provided
    if (!userId || !name) {
      return res.status(404).json({ error: 'Name not provided.' });
    }

    // Find the user in the database
    const User = await user.findOne({ _id: userId });

    // Check if the user exists
    if (!User) {
      return res.status(404).json({ error: 'Invalid/Corrupt User' });
    }

    // Check if a validation object with the same name already exists
    const isExistingValidation = User.ublValidation.some(
      (validation) => validation.name === name
    );

    if (isExistingValidation) {
      return res
        .status(409)
        .json({ error: 'Validation object with name already exists' });
    }

    // Retrieve the existing user data from the database
    const existingUser = await user.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique filename for the uploaded file
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
        const ublId = uploadStream.id; // Get the file ID after upload

        // Step 2: Validate the UBL file
        let validationErrors = [];
        validationErrors = await apiCallingForValidation(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );

        // Get the validator ID from the validation result
        const validatorId = await validateUBL(validationErrors);

        // Generate HTML and JSON for the validation results
        let html = defaultHtml;
        let json = defaultJson;
        if (
          validationErrors.length === 1 &&
          validationErrors[0]?.error === true
        ) {
          html = defaultHtml;
          json = defaultJson;
        } else {
          html = generateHtml(validationErrors, []);
          json = { validationErrors: validationErrors };
        }

        // Create a validation object to store in the user's data
        const ublValidationObject = {
          ublId: ublId,
          validatorId: validatorId,
          name,
          validationHtml: html,
          validationJson: json,
        };

        // Update the user's data with the new validation object
        const updatedUser = await user.findByIdAndUpdate(
          userId,
          {
            $push: {
              ublValidation: { $each: [ublValidationObject], $position: 0 },
            },
          },
          { new: true, useFindAndModify: false }
        );

        // Handle the case where the user could not be updated
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Find the newly added validation object
        const newlyAddedObject = updatedUser.ublValidation.find(
          (obj) =>
            obj.ublId.toString() === ublId.toString() &&
            obj.validatorId.toString() === validatorId.toString()
        );

        // Respond with success and relevant details
        res.status(200).json({
          message:
            'UBL file uploaded, validated, and user updated successfully!',
          ublId,
          validatorId,
          newObjectId: newlyAddedObject._id,
          name,
          date: newlyAddedObject.date,
          validationHtml: html,
          validationJson: json,
        });
      } catch (updateError) {
        // Handle errors during user update
        res
          .status(updateError.response ? updateError.response.status : 500)
          .json({
            error: updateError.response
              ? updateError.response.data
              : 'Server Error',
          });
      }
    });

    // Pipe the file stream to the upload stream
    fileStream.pipe(uploadStream);
  } catch {
    // General server error handling
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

// Export the function to be used in other modules
module.exports = validateUblFile;
