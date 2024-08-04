const jsonToUbl = require('./JsonToUBL'); // Converts JSON invoice data to UBL XML
const saveXmlToMongo = require('./saveXmlToMongo'); // Saves XML files to MongoDB
const user = require('../models/user'); // Mongoose user model
const crypto = require('crypto'); // For generating unique filenames
const path = require('path'); // For handling file paths
const validateUBL = require('../shared/ublValidator'); // Validates UBL XML
const {
  apiCallingForValidation,
} = require('../shared/apiCallingForValidation'); // API for UBL validation
const { generateHtml } = require('../shared/htmlGeneratorValidation'); // Generates HTML from validation results
const { defaultHtml } = require('../shared/defaultValidationHTML'); // Default HTML template
const { defaultJson } = require('../shared/defaultJson'); // Default JSON template

// This function handles the conversion of GUI form data to UBL format
const postConvertGuiForm = async (req, res) => {
  try {
    // Extract relevant data from request body
    const userId = req.body.userId;
    const invoice = req.body.invoice;
    const vendorGln = req.body.vendorGln;
    const customerGln = req.body.customerGln;
    const saveGln = req.body.saveGln;
    const name = req.body.name;

    // Retrieve user data from the database
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
        .status(409)
        .json({ error: 'Validation object with name already exists' });
    }

    // Optionally save the vendor GLN to the user's data
    if (saveGln !== 'false') {
      userData.gln = vendorGln;
      await userData.save();
    }

    // Initialize default HTML and JSON for validation results
    let html = defaultHtml;
    let json = defaultJson;

    // Generate a unique filename for the UBL XML
    const ublFilename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(Date.now() + 'makingstring') +
      '.xml';

    // Convert the JSON invoice to UBL XML
    const { missingFields, xml } = jsonToUbl(invoice, vendorGln, customerGln);
    const xmlFile = xml;

    // Perform validation on the UBL XML
    let validationReportId = undefined;
    try {
      let validationErrors = [];
      validationErrors = await apiCallingForValidation(
        Buffer.from(xmlFile, 'utf-8'),
        ublFilename,
        'text/xml'
      );
      validationReportId = await validateUBL(validationErrors, missingFields);

      // Determine the HTML and JSON to return based on validation results
      if (
        validationErrors.length === 1 &&
        validationErrors[0]?.error === true
      ) {
        html = defaultHtml;
        json = defaultJson;
      } else {
        html = generateHtml(validationErrors, missingFields);
        json = { validationErrors: validationErrors };
      }
    } catch (error) {
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
      return res.status(500).json({
        error: 'Error saving XML to MongoDB',
        details: error.message,
      });
    }

    // Check if saving the UBL XML was successful
    if (ublId === undefined) {
      return res.status(402).json({ error: 'Failed to convert PDF to UBL' });
    }

    // Create a new validation object to store in the user's data
    const pdfUblValidationObject = {
      pdfId: invoice,
      ublId: ublId,
      validatorId: validationReportId,
      name,
      validationJson: json,
      validationHtml: html,
    };

    // Update the user's data with the new validation object
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        $push: {
          pdfUblValidation: {
            $each: [pdfUblValidationObject],
            $position: 0, // Insert the new object at the start of the array
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    // Handle the case where the user could not be updated
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Locate the newly added validation object
    const newlyAddedObject = updatedUser.pdfUblValidation.find(
      (obj) =>
        obj.ublId.toString() === ublId.toString() &&
        obj.validatorId.toString() === validationReportId.toString()
    );

    // Respond with success and relevant details
    res.status(200).json({
      message: 'File converted and user updated successfully!',
      pdfId: invoice,
      ublId,
      name,
      newObjectId: newlyAddedObject._id,
      date: newlyAddedObject.date,
      validatorId: validationReportId,
      validationJson: json,
      validationHtml: html,
    });
  } catch {
    // General error handling
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = postConvertGuiForm;
