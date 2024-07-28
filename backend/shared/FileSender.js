require('dotenv').config();
const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');
const MailSender = require('./MailSender');
const user = require('../models/user');

const MY_EMAIL = process.env.MY_EMAIL;

// Helper function to retrieve a file by its ID
const getFileById = async (fileId) => {
  try {
    const _id = new mongoose.Types.ObjectId(fileId);
    const gfs = getGridFSBucket();
    const cursor = gfs.find({ _id });
    const files = await cursor.toArray();

    if (!files || files.length === 0) {
      throw new Error('File not found');
    }

    const file = files[0];
    const downloadStream = gfs.openDownloadStream(_id);

    let fileBuffer = Buffer.from('');
    for await (const chunk of downloadStream) {
      fileBuffer = Buffer.concat([fileBuffer, chunk]);
    }

    return {
      filename: file.filename,
      contentType: file.contentType,
      buffer: fileBuffer,
    };
  } catch (error) {
    throw new Error(
      `Error retrieving file with ID ${fileId}: ${error.message}`
    );
  }
};

const FileSender = async (req, res) => {
  const {
    email,
    xmlId,
    pdfId,
    validatorPdfId,
    message,
    emailSubject,
    sharedObjId,
    process,
    fileTypes,
    userId,
  } = req.body;

  const attachments = [];

  let htmlBody;
  if (!message) {
    htmlBody = '<div>By HexaHunks</div>';
  } else {
    htmlBody = `<div>${message}</div>`;
  }

  let sub;
  if (!emailSubject) {
    sub = 'Your Requested Files';
  } else {
    sub = emailSubject;
  }

  try {
    if (xmlId) {
      const xmlFile = await getFileById(xmlId);
      attachments.push({
        filename: xmlFile.filename,
        content: xmlFile.buffer.toString('base64'),
        contentType: xmlFile.contentType,
      });
    }

    if (pdfId) {
      const pdfFile = await getFileById(pdfId);
      attachments.push({
        filename: pdfFile.filename,
        content: pdfFile.buffer.toString('base64'),
        contentType: pdfFile.contentType,
      });
    }

    if (validatorPdfId) {
      const validatorPdfFile = await getFileById(validatorPdfId);
      attachments.push({
        filename: validatorPdfFile.filename,
        content: validatorPdfFile.buffer.toString('base64'),
        contentType: validatorPdfFile.contentType,
      });
    }

    if (attachments.length === 0) {
      return res.status(400).send({ message: 'No valid file IDs provided' });
    }

    if (!MY_EMAIL) {
      return res.status(500).send({ message: `Server Error` });
    }

    const mailOptions = {
      from: MY_EMAIL,
      to: email,
      subject: sub,
      text: 'Please find your attached files @HexaHunks',
      html: htmlBody,
      attachments: attachments,
    };

    await MailSender(mailOptions);

    console.log(sharedObjId);
    const newHistoryObj = {
      email: email,
      subject: sub,
      fileTypes: fileTypes,
      process: process,
      sharedObjId,
    };

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $push: { historyEmail: newHistoryObj } },
      { new: true, useFindAndModify: false }
    );

    res
      .status(200)
      .send({ message: 'Email sent with attachments successfully' });
  } catch (error) {
    console.error('Failed to send email with attachments:', error);
    res.status(400).send({ message: `Failed to send email: ${error.message}` });
  }
};

module.exports = FileSender;
