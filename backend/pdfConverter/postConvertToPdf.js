const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');
const mongoose = require('mongoose');
const uploadInvoice = require('./actualConvertionFunction');
const jsonToUbl = require('./JsonToUBL');
const saveXmlToMongo = require('./saveXmlToMongo');
const validateUBL = require('../shared/ublValidator');
const {
  apiCallingForValidation,
} = require('../shared/apiCallingForValidation');
const { generateHtml } = require('../shared/htmlGeneratorValidation');
const { defaultHtml } = require('../shared/defaultValidationHTML');
const { defaultJson } = require('../shared/defaultJson');

const postConvertToPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // const { vendorGln, customerGln, saveGln } = req.body;
    const userId = req.body?.userId;
    const vendorGln = req.body?.vendorGln;
    const customerGln = req.body?.customerGln;
    const saveGln = req.body?.saveGln;
    const name = req.body?.name;

    if ((!userId, !vendorGln, !customerGln, !saveGln, !name)) {
      return res.status(401).json({ error: 'All fields are required' });
    }

    // Fetch the user
    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the ublValidationObject already exists
    const isExistingValidation = userData.pdfUblValidation.some(
      (validation) => validation.name === name
    );

    if (isExistingValidation) {
      return res
        .status(401)
        .json({ error: 'Validation object with name already exists' });
    }

    // Update user's GLN if saveGln is true
    console.log(
      '\n\n\n\n\n\n\n',
      userId,
      vendorGln,
      customerGln,
      saveGln,
      name,
      '\n\n\n\n\n\n\n'
    );
    if (saveGln !== 'false') {
      userData.gln = vendorGln;
      await userData.save();
    }

    let html = defaultHtml;
    let json = defaultJson;

    const filename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(req.file.originalname);

    const ublFilename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(Date.now() + req.file.originalname) +
      '.xml';

    const fileStream = new Readable();
    fileStream.push(req.file.buffer);
    fileStream.push(null);

    const gridFSBucket = getGridFSBucket();
    const uploadStream = gridFSBucket.openUploadStream(filename);

    fileStream
      .pipe(uploadStream)
      .on('error', (error) => {
        return res.status(500).json({
          error: 'Error uploading file' + error.message,
          details: error.message,
        });
      })
      .on('finish', async () => {
        try {
          const fileId = uploadStream.id;

          const invoiceData = await uploadInvoice(
            req.file.buffer,
            req.file.originalname
          );

          if (!invoiceData) {
            return res
              .status(500)
              .json({ error: 'Failed to convert PDF to JSON' });
          }

          const { missingFields, xml } = jsonToUbl(
            invoiceData,
            vendorGln,
            customerGln
          );
          const xmlFile = xml;

          let validationReportId = undefined;
          try {
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
            return res.status(500).json({
              error: 'Error validating UBL',
              details: error.message,
            });
          }

          if (validationReportId === undefined) {
            return res.status(402).json({ error: 'Failed to validate UBL' });
          }

          // const ublFileId = saveXmlToMongo(xmlFile, ublFilename);
          let ublId = undefined;
          try {
            ublId = await saveXmlToMongo(xmlFile, ublFilename);
          } catch (error) {
            return res.status(500).json({
              error: 'Error saving XML to MongoDB',
              details: error.message,
            });
          }

          if (ublId === undefined) {
            return res
              .status(402)
              .json({ error: 'Failed to convert PDF to UBL' });
          }

          // return res.status(200).json({ success: 'success' });
          // Dummy UBL and Validator IDs for illustration; replace with actual logic to get these IDs
          // const ublId = new mongoose.Types.ObjectId(
          //   'aa6d47f29abc3c9a48e887f7dde1213e'
          // ); // Replace with actual ID
          // const ublId = undefined;
          // const validatorId = new mongoose.Types.ObjectId(); // Replace with actual ID

          const pdfUblValidationObject = {
            pdfId: fileId,
            ublId: ublId,
            validatorId: validationReportId, //! THIS WILL ONLY BE GENERATED WHEN USER WANTS TO
            name: name,
            validationHtml: html,
            validationJson: json,
          };

          //

          const updatedUser = await user.findByIdAndUpdate(
            userId,
            // { $push: { pdfUblValidation: pdfUblValidationObject } },
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

          if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }

          // Find the newly added ublValidationObject with its _id
          const newlyAddedObject = updatedUser.pdfUblValidation.find(
            (obj) =>
              obj.ublId.toString() === ublId.toString() &&
              obj.pdfId.toString() === fileId.toString()
          );

          // ! THIS IS JUST A SAMPLE RETURN TO MOCK THE ACTUAL RETURN STATEMENT FOR WHEN WE ACTUALLY GET THE API KEY
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
          res.status(500).json({
            error: 'Error updating user with file ID',
            details: updateError.message,
          });
        }
      });

    // Add timeout handling
    uploadStream.on('timeout', () => {
      return res.status(500).json({ error: 'File upload timeout' });
    });

    // Add handling for finish event not being triggered
    setTimeout(() => {
      if (!uploadStream.writableEnded) {
        return res
          .status(500)
          .json({ error: 'File upload did not finish as expected' });
      }
    }, 30000); // Adjust the timeout value as needed
  } catch (  ) {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = postConvertToPdf;
