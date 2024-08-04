const crypto = require('crypto'); // For generating unique file names
const path = require('path'); // For handling file paths
const user = require('../models/user'); // Mongoose user model
const { getGridFSBucket } = require('../db'); // For accessing the GridFS bucket
const { Readable } = require('stream'); // For creating readable streams
const uploadInvoice = require('./actualConvertionFunction'); // Function to upload and convert invoices
const jsonToUbl = require('./JsonToUBL'); // Converts JSON invoice data to UBL XML
const saveXmlToMongo = require('./saveXmlToMongo'); // Saves XML files to MongoDB
const validateUBL = require('../shared/ublValidator'); // Validates UBL XML
const {
  apiCallingForValidation,
} = require('../shared/apiCallingForValidation'); // API for UBL validation
const { generateHtml } = require('../shared/htmlGeneratorValidation'); // Generates HTML from validation results
const { defaultHtml } = require('../shared/defaultValidationHTML'); // Default HTML template
const { defaultJson } = require('../shared/defaultJson'); // Default JSON template

// Function to handle conversion of uploaded PDF to UBL
const postConvertToPdf = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Extract fields from the request body
    const userId = req.body?.userId;
    const vendorGln = req.body?.vendorGln;
    const customerGln = req.body?.customerGln;
    const saveGln = req.body?.saveGln;
    const name = req.body?.name;

    // Validate that all required fields are present
    if (!userId || !vendorGln || !customerGln || !saveGln || !name) {
      return res.status(401).json({ error: 'All fields are required' });
    }

    // Fetch user data from the database
    const userData = await user.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if a validation object with the same name already exists
    const isExistingValidation = userData.pdfUblValidation.some(
      (validation) => validation.name === name
    );

    if (isExistingValidation) {
      return res
        .status(401)
        .json({ error: 'Validation object with name already exists' });
    }

    // Update user's GLN if saveGln is not set to 'false'
    if (saveGln !== 'false') {
      userData.gln = vendorGln;
      await userData.save();
    }

    // Initialize default HTML and JSON for validation results
    let html = defaultHtml;
    let json = defaultJson;

    // Generate unique filenames for the uploaded PDF and UBL XML
    const filename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(req.file.originalname);
    const ublFilename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(Date.now() + req.file.originalname) +
      '.xml';

    // Create a readable stream from the uploaded file buffer
    const fileStream = new Readable();
    fileStream.push(req.file.buffer);
    fileStream.push(null);

    // Get the GridFS bucket for file storage
    const gridFSBucket = getGridFSBucket();
    const uploadStream = gridFSBucket.openUploadStream(filename);

    // Pipe the file stream to the GridFS upload stream
    fileStream
      .pipe(uploadStream)
      .on('error', (error) => {
        // Handle errors during file upload
        return res.status(500).json({
          error: 'Error uploading file' + error.message,
          details: error.message,
        });
      })
      .on('finish', async () => {
        try {
          // Retrieve the uploaded file ID
          const fileId = uploadStream.id;

          // Convert the uploaded PDF to JSON using the Veryfi API
          const invoiceData = await uploadInvoice(
            req.file.buffer,
            req.file.originalname
          );
          if (!invoiceData) {
            return res
              .status(500)
              .json({ error: 'Failed to convert PDF to JSON' });
          }

          // Convert the JSON data to UBL XML
          const { missingFields, xml } = jsonToUbl(
            invoiceData,
            vendorGln,
            customerGln
          );
          const xmlFile = xml;

          // Initialize validation report ID
          let validationReportId = undefined;
          try {
            // Call API for UBL validation and process validation errors
            let validationErrors = [];
            validationErrors = await apiCallingForValidation(
              Buffer.from(xmlFile, 'utf-8'),
              ublFilename,
              'text/xml'
            );
            validationReportId = await validateUBL(
              validationErrors,
              missingFields
            );

            // Generate HTML and JSON for validation results
            if (
              validationErrors.length === 1 &&
              validationErrors[0]?.error === true
            ) {
              html = defaultHtml;
              json = defaultJson;
            } else {
              html = generateHtml(validationErrors, missingFields);
              json = { validationErrors: validationErrors, missingFields };
            }
          } catch (error) {
            // Handle errors during UBL validation
            return res.status(500).json({
              error: 'Error validating UBL',
              details: error.message,
            });
          }

          // Check if validation was successful
          if (validationReportId === undefined) {
            return res.status(402).json({ error: 'Failed to validate UBL' });
          }

          // Save the UBL XML to MongoDB
          let ublId = undefined;
          try {
            ublId = await saveXmlToMongo(xmlFile, ublFilename);
          } catch (error) {
            // Handle errors during XML saving
            return res.status(500).json({
              error: 'Error saving XML to MongoDB',
              details: error.message,
            });
          }

          // Check if UBL XML was saved successfully
          if (ublId === undefined) {
            return res
              .status(402)
              .json({ error: 'Failed to convert PDF to UBL' });
          }

          // Create a new validation object to store in the user's data
          const pdfUblValidationObject = {
            pdfId: fileId,
            ublId: ublId,
            validatorId: validationReportId,
            name: name,
            validationHtml: html,
            validationJson: json,
          };

          // Update the user's data with the new validation object
          const updatedUser = await user.findByIdAndUpdate(
            userId,
            {
              $push: {
                pdfUblValidation: {
                  $each: [pdfUblValidationObject],
                  $position: 0,
                },
              },
            },
            { new: true, useFindAndModify: false }
          );

          // Handle the case where the user could not be updated
          if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }

          // Find the newly added validation object
          const newlyAddedObject = updatedUser.pdfUblValidation.find(
            (obj) =>
              obj.ublId.toString() === ublId.toString() &&
              obj.pdfId.toString() === fileId.toString()
          );

          // Respond with success and relevant details
          res.status(200).json({
            message: 'File converted and user updated successfully!',
            pdfId: fileId,
            ublId,
            name,
            newObjectId: newlyAddedObject._id,
            date: newlyAddedObject.date,
            validatorId: validationReportId,
            validationHtml: html,
            validationJson: json,
          });
        } catch (updateError) {
          // Handle errors during user update
          res.status(500).json({
            error: 'Error updating user with file ID',
            details: updateError.message,
          });
        }
      });

    // Add timeout handling for the upload stream
    uploadStream.on('timeout', () => {
      return res.status(500).json({ error: 'File upload timeout' });
    });

    // Ensure the upload finishes as expected, with a timeout safeguard
    setTimeout(() => {
      if (!uploadStream.writableEnded) {
        return res
          .status(500)
          .json({ error: 'File upload did not finish as expected' });
      }
    }, 30000); // Adjust the timeout value as needed
  } catch {
    // General server error handling
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = postConvertToPdf;
