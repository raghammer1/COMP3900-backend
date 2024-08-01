const express = require('express');
const router = express.Router();
const { getGridFSBucket } = require('../db');
const user = require('../models/user');
const { ObjectId } = require('mongoose').Types;

// Function to get GridFS file stream
const getGridFSFile = (fileId) => {
  const gridFSBucket = getGridFSBucket();
  return gridFSBucket.openDownloadStream(fileId);
};

const getUblPdf = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // const ublValidationEntry = userData.ublValidation[0]; // Assuming you want the first entry in the map
    // const ublId = ublValidationEntry.ublId;
    const validatorId = userData.ublValidation[1].ublId;

    // const ublStream = getGridFSFile(ublId);
    const validatorStream = getGridFSFile(validatorId);

    res.set({
      'Content-Type': 'application/xml', // Adjust content type as per your file type
      'Content-Disposition': `attachment; filename="UBL_File.xml"`, // Example filename
    });

    // Pipe the streams to the response
    // ublStream.pipe(res);
    validatorStream.pipe(res);
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = getUblPdf;
