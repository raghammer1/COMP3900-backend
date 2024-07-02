const axios = require('axios');
const FormData = require('form-data');
const { Readable } = require('stream');
const { getToken } = require('./tokenService');
const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const { getGridFSBucket } = require('../db');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const generateErrorReportPDF = async (errors) => {
  try {
    if (!Array.isArray(errors)) {
      throw new TypeError('Expected an array of errors');
    }

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    const marginTop = 50;
    const marginLeft = 50;
    const marginBottom = 50;
    const maxLineWidth = 450; // Maximum width for text lines
    const lineSpacing = 16;
    let y = page.getHeight() - marginTop;

    const wrapText = (text, maxWidth, font, fontSize) => {
      let lines = [];
      let currentLine = '';

      for (let i = 0; i < text.length; i++) {
        const testLine = currentLine + text[i];
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth) {
          lines.push(currentLine);
          currentLine = text[i];
        } else {
          currentLine = testLine;
        }
      }

      lines.push(currentLine);
      return lines;
    };

    const drawText = (text, x, y, size, color, font, page) => {
      const wrappedLines = wrapText(text, maxLineWidth, font, size);
      wrappedLines.forEach((line) => {
        if (y - size < marginBottom) {
          page = pdfDoc.addPage([600, 800]);
          y = page.getHeight() - marginTop;
        }
        page.drawText(line, { x, y, size, color, font });
        y -= lineSpacing;
      });
      return { y, page };
    };

    const drawHeader = (text, x, y, size, color, font, page) => {
      if (y - size < marginBottom) {
        page = pdfDoc.addPage([600, 800]);
        y = page.getHeight() - marginTop;
      }
      page.drawText(text, { x, y, size, color, font });
      y -= lineSpacing;
      return { y, page };
    };

    let drawResult = drawHeader(
      'UBL Validation Error Report',
      marginLeft,
      y,
      20,
      rgb(0, 0, 0),
      font,
      page
    );
    y = drawResult.y - 30; // Adjust spacing after the title
    page = drawResult.page;

    for (const [index, error] of errors.entries()) {
      const errorHeader = `Error ${index + 1}:`;
      const errorDetails = `
ID: ${error.id}
Description: ${error.text}
Test: ${error.test}
Location: ${error.location}
Flag: ${error.flag}
Status: ${error.flag === 'fatal' ? 'Failed' : 'Passed'}
      `;

      drawResult = drawHeader(
        errorHeader,
        marginLeft,
        y,
        fontSize,
        rgb(0, 0, 0),
        font,
        page
      );
      y = drawResult.y;
      page = drawResult.page;

      for (const line of errorDetails.split('\n')) {
        drawResult = drawText(
          line.trim(),
          marginLeft,
          y,
          fontSize,
          rgb(0, 0, 0),
          font,
          page
        );
        y = drawResult.y;
        page = drawResult.page;
      }

      y -= lineSpacing; // Additional space between errors
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (err) {
    console.error('Error generating PDF:', err);
    throw new Error('Error generating PDF');
  }
};

const validateUblFile = async (req, res) => {
  const validationUrl =
    'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

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

        // Step 2: Validate the UBL file
        const apiKey = await getToken();

        const form = new FormData();
        const validationFileStream = new Readable();
        validationFileStream.push(req.file.buffer);
        validationFileStream.push(null);

        form.append('file', validationFileStream, {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        });

        const response = await axios.post(validationUrl, form, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'application/json',
            ...form.getHeaders(),
          },
        });

        const validationErrors =
          response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors;

        // Generate PDF
        const pdfBytes = await generateErrorReportPDF(validationErrors);

        // Save PDF to GridFS
        const pdfFilename = `UBL_Validation_Error_Report_${crypto
          .randomBytes(8)
          .toString('hex')}.pdf`;
        const pdfStream = new Readable();
        pdfStream.push(pdfBytes);
        pdfStream.push(null);

        const pdfUploadStream = gridFSBucket.openUploadStream(pdfFilename);

        pdfStream.pipe(pdfUploadStream);

        pdfUploadStream.on('error', (error) => {
          return res.status(500).json({
            error: 'Error uploading PDF file',
            details: error.message,
          });
        });

        pdfUploadStream.on('finish', async () => {
          try {
            const validatorId = pdfUploadStream.id;

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

            console.log(validatorId, ublId, newlyAddedObject);
            res.status(200).json({
              message:
                'UBL file uploaded, validated, and user updated successfully!',
              ublId,
              validatorId,
              validationReport: validationErrors,
              newObjectId: newlyAddedObject._id,
              name,
            });
          } catch (updateError) {
            res.status(500).json({
              error: 'Error updating user with UBL file ID',
              details: updateError.message,
            });
          }
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
