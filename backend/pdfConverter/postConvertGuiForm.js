const jsonToUbl = require('./JsonToUBL');
const saveXmlToMongo = require('./saveXmlToMongo');
const user = require('../models/user');
const crypto = require('crypto');
const path = require('path');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');
const mongoose = require('mongoose');
const uploadInvoice = require('./actualConvertionFunction');
const validateUBL = require('../shared/ublValidator');

const postConvertGuiForm = async (req, res) => {
  try {
    const userId = req.body.userId;
    const invoice = req.body.invoice;
    const vendorGln = req.body.vendorGln;
    const customerGln = req.body.customerGln;
    const saveGln = req.body.saveGln;
    const name = req.body.name;
    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the ublValidationObject already exists
    const isExistingValidation = userData.pdfUblValidation.some(
      (validation) => validation.name === name
    );
    if (isExistingValidation) {
      return res
        .status(409)
        .send({ message: 'Validation object with name already exists' });
    }

    if (saveGln !== 'false') {
      console.log('I STILL FUCKING CAME HERE LOL');
      userData.gln = vendorGln;
      await userData.save();
    }

    const ublFilename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(Date.now() + 'makingstring') +
      '.xml';

    console.log(invoice);
    const { missingFields, xml } = jsonToUbl(
      invoice,
      '0000000000000',
      '0000000000001'
    );
    const xmlFile = xml;
    console.log(xmlFile, missingFields, 'LOLOLOLOLOLOLOLOL');

    let validationReportId = undefined;
    try {
      validationReportId = await validateUBL(
        Buffer.from(xmlFile, 'utf-8'),
        ublFilename,
        'text/xml',
        missingFields
      );
      console.log('Validation report ID:', validationReportId);
    } catch (error) {
      console.error('Error validating UBL:', error);
      return res.status(500).json({
        error: 'Error validating UBL',
        details: error.message,
      });
    }

    if (validationReportId === undefined) {
      return res.status(402).json({ error: 'Failed to validate UBL' });
    }

    // const u = saveXmlToMongo(xmlFile, ublFilename);
    let ublId = undefined;
    try {
      ublId = await saveXmlToMongo(xmlFile, ublFilename);
      console.log(ublId);
    } catch (error) {
      console.error('Error saving XML to MongoDB:', error);
      return res.status(500).json({
        message: 'Error saving XML to MongoDB',
        details: error.message,
      });
    }

    if (ublId === undefined) {
      return res.status(402).json({ message: 'Failed to convert PDF to UBL' });
    }

    const pdfUblValidationObject = {
      pdfId: invoice,
      ublId: ublId,
      validatorId: validationReportId, //! THIS WILL ONLY BE GENERATED WHEN USER WANTS TO
      name,
    };

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $push: { pdfUblValidation: pdfUblValidationObject } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the newly added ublValidationObject with its _id
    const newlyAddedObject = updatedUser.pdfUblValidation.find(
      (obj) =>
        obj.ublId.toString() === ublId.toString() &&
        obj.validatorId.toString() === validationReportId.toString()
    );
    console.log(newlyAddedObject);

    res.status(200).json({
      message: 'File converted and user updated successfully!',
      pdfId: invoice,
      ublId,
      name,
      newObjectId: newlyAddedObject._id,
      date: newlyAddedObject.date,
      validatorId: validationReportId,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

module.exports = postConvertGuiForm;
