const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');
const MailSender = require('./MailSender');

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
  const { email, xmlId, pdfId, validatorPdfId, message } = req.body;

  const attachments = [];

  let htmlBody;
  if (!message) {
    htmlBody = '<div>By HexaHunks</div>';
  } else {
    htmlBody = `<div>${message}</div>`;
  }

  try {
    if (xmlId) {
      const xmlFile = await getFileById(xmlId);
      attachments.push({
        filename: xmlFile.filename,
        content: xmlFile.buffer,
        contentType: xmlFile.contentType,
      });
    }

    if (pdfId) {
      const pdfFile = await getFileById(pdfId);
      attachments.push({
        filename: pdfFile.filename,
        content: pdfFile.buffer,
        contentType: pdfFile.contentType,
      });
    }

    if (validatorPdfId) {
      const validatorPdfFile = await getFileById(validatorPdfId);
      attachments.push({
        filename: validatorPdfFile.filename,
        content: validatorPdfFile.buffer,
        contentType: validatorPdfFile.contentType,
      });
    }

    if (attachments.length === 0) {
      res.status(400).send({ message: 'No valid file IDs provided' });
    }

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'Your Requested Files',
      text: 'Please find your attached files @HexaHunks',
      html: htmlBody,
      attachments: attachments,
    };

    await MailSender(mailOptions);
    res
      .status(200)
      .send({ message: 'Email sent with attachments successfully' });
  } catch (error) {
    console.error('Failed to send email with attachments:', error);
    res.status(400).send({ message: `Failed to send email: ${error.message}` });
  }
};

module.exports = FileSender;
