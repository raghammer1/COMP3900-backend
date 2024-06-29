// // const path = require('path');

// // const validateUblFile = async (req, res) => {
// //   const filePath = path.join(__dirname, 'uploads', req.file.filename);
// //   const validationUrl =
// //     'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

// //   try {
// //     const form = new FormData();
// //     form.append('file', fs.createReadStream(filePath), req.file.filename);

// //     const apiKey = await getToken(); // Get the current valid token

// //     const response = await axios.post(validationUrl, form, {
// //       headers: {
// //         Authorization: `Bearer ${apiKey}`,
// //         Accept: 'application/json',
// //         ...form.getHeaders(),
// //       },
// //     });

// //     res.json(response.data);
// //   } catch (error) {
// //     res.status(error.response ? error.response.status : 500).json({
// //       error: error.response ? error.response.data : error.message,
// //     });
// //   }
// // };

// // module.exports = validateUblFile;
// const axios = require('axios');
// const FormData = require('form-data');
// const { Readable } = require('stream');
// const { getToken } = require('./tokenService');
// const crypto = require('crypto');
// const path = require('path');
// const user = require('../models/user');
// const { getGridFSBucket } = require('../db');

// const validateUblFile = async (req, res) => {
//   const validationUrl =
//     'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

//   console.log('CAME HEREs');
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const userId = req.body.userId;
//     const filename =
//       crypto.randomBytes(16).toString('hex') +
//       path.extname(req.file.originalname);

//     const form = new FormData();
//     const fileStream = new Readable();
//     fileStream.push(req.file.buffer);
//     fileStream.push(null);

//     form.append('file', fileStream, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     console.log(filename);
//     const gridFSBucket = getGridFSBucket();
//     const uploadStream = gridFSBucket.openUploadStream(filename);

//     fileStream
//       .pipe(uploadStream)
//       .on('error', (error) => {
//         return res
//           .status(500)
//           .json({ error: 'Error uploading file', details: error.message });
//       })
//       .on('finish', async () => {
//         try {
//           const fileId = uploadStream.id;

//           // Dummy UBL and Validator IDs for illustration; replace with actual logic to get these IDs
//           const validatorId = new mongoose.Types.ObjectId(); // Replace with actual ID

//           const ublValidationObject = {
//             ublId: fileId,
//             validatorId,
//             // name: 'NEW',
//           };

//           console.log(fileId._id, ublValidationObject, 'FIRLDWDWEW');

//           const updatedUser = await user.findByIdAndUpdate(
//             userId,
//             { $push: { ublValidation: ublValidationObject } },
//             { new: true, useFindAndModify: false }
//           );

//           if (!updatedUser) {
//             return res.status(404).json({ error: 'User not found' });
//           }

//           console.log(fileId);

//           res.json({
//             message: 'File uploaded and user updated successfully!',
//             fileId,
//           });
//         } catch (updateError) {
//           res.status(500).json({
//             error: 'Error updating user with file ID',
//             details: updateError.message,
//           });
//         }
//       });

//     const apiKey = await getToken(); // Get the current valid token

//     const response = await axios.post(validationUrl, form, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         Accept: 'application/json',
//         ...form.getHeaders(),
//       },
//     });

//     console.log(
//       response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors
//     );

//     res.json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(error.response ? error.response.status : 500).json({
//       error: error.response ? error.response.data : error.message,
//     });
//   }
// };

// // module.exports = validateUblFile;
// const axios = require('axios');
// const FormData = require('form-data');
// const { Readable } = require('stream');
// const { getToken } = require('./tokenService');
// const crypto = require('crypto');
// const path = require('path');
// const user = require('../models/user');
// const mongoose = require('mongoose');
// const { getGridFSBucket } = require('../db');

// const validateUblFile = async (req, res) => {
//   const validationUrl =
//     'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const userId = req.body.userId;
//     const filename =
//       crypto.randomBytes(16).toString('hex') +
//       path.extname(req.file.originalname);

//     // Step 1: Save the file to GridFS
//     const fileStream = new Readable();
//     fileStream.push(req.file.buffer);
//     fileStream.push(null);

//     const gridFSBucket = getGridFSBucket();
//     const uploadStream = gridFSBucket.openUploadStream(filename);

//     uploadStream.on('error', (error) => {
//       return res
//         .status(500)
//         .json({ error: 'Error uploading file', details: error.message });
//     });

//     uploadStream.on('finish', async () => {
//       try {
//         const ublId = uploadStream.id;

//         // Step 2: Validate the UBL file
//         const apiKey = await getToken();

//         const form = new FormData();
//         const validationFileStream = new Readable();
//         validationFileStream.push(req.file.buffer);
//         validationFileStream.push(null);

//         form.append('file', validationFileStream, {
//           filename: req.file.originalname,
//           contentType: req.file.mimetype,
//         });

//         const response = await axios.post(validationUrl, form, {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             Accept: 'application/json',
//             ...form.getHeaders(),
//           },
//         });

//         console.log(
//           response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors
//         );

//         await generateErrorReportPDF(
//           response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors
//         );

//         const validatorId = new mongoose.Types.ObjectId();
//         const ublValidationObject = {
//           ublId: ublId,
//           validatorId: validatorId,
//           // validationReport:
//           //   response.data.report.reports.AUNZ_PEPPOL_1_0_10
//           //     .firedAssertionErrors,
//         };

//         const updatedUser = await user.findByIdAndUpdate(
//           userId,
//           { $push: { ublValidation: ublValidationObject } },
//           { new: true, useFindAndModify: false }
//         );

//         if (!updatedUser) {
//           return res.status(404).json({ error: 'User not found' });
//         }

//         res.json({
//           message:
//             'UBL file uploaded, validated, and user updated successfully!',
//           ublId,
//           validationReport:
//             response.data.report.reports.AUNZ_PEPPOL_1_0_10
//               .firedAssertionErrors,
//         });
//       } catch (updateError) {
//         res.status(500).json({
//           error: 'Error updating user with UBL file ID',
//           details: updateError.message,
//         });
//       }
//     });

//     fileStream.pipe(uploadStream);
//   } catch (error) {
//     res.status(error.response ? error.response.status : 500).json({
//       error: error.response ? error.response.data : error.message,
//     });
//   }
// };

// const { PDFDocument, rgb } = require('pdf-lib');
// const fs = require('fs');
// const generateErrorReportPDF = async (errors) => {
//   try {
//     if (!Array.isArray(errors)) {
//       throw new TypeError('Expected an array of errors');
//     }

//     console.log(errors);
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);

//     page.drawText('UBL Validation Error Report', {
//       x: 50,
//       y: 750,
//       size: 20,
//       color: rgb(0, 0, 0),
//     });

//     let y = 720;
//     const textSize = 12;
//     const lineSpacing = 16;

//     errors.forEach((error, index) => {
//       const errorHeader = `Error ${index + 1}:`;
//       const errorDetails = `
//       ID: ${error.id}
//       Description: ${error.text}
//       Test: ${error.test}
//       Location: ${error.location}
//       Flag: ${error.flag}
//       Status: ${error.flag === 'fatal' ? 'Failed' : 'Passed'}
//       `;
//       const textHeight = textSize * 1.2; // Adjust this factor to suit your needs

//       page.drawText(errorHeader, {
//         x: 50,
//         y: y,
//         size: textSize,
//         color: rgb(0, 0, 0),
//       });

//       y -= textHeight;

//       errorDetails.split('\n').forEach((line) => {
//         page.drawText(line.trim(), {
//           x: 50,
//           y: y,
//           size: textSize,
//           color: rgb(0, 0, 0),
//         });
//         y -= textHeight;
//       });

//       y -= lineSpacing; // Additional space between errors
//     });

//     const pdfBytes = await pdfDoc.save();
//     fs.writeFileSync('UBL_Validation_Error_Report.pdf', pdfBytes);
//     console.log('PDF generated successfully');
//   } catch (err) {
//     console.error('Error generating PDF:', err);
//     throw new Error('Error generating PDF');
//   }
// };

// module.exports = validateUblFile;
const axios = require('axios');
const FormData = require('form-data');
const { Readable } = require('stream');
const { getToken } = require('./tokenService');
const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

const generateErrorReportPDF = async (errors) => {
  try {
    if (!Array.isArray(errors)) {
      throw new TypeError('Expected an array of errors');
    }

    console.log(errors);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    page.drawText('UBL Validation Error Report', {
      x: 50,
      y: 750,
      size: 20,
      color: rgb(0, 0, 0),
    });

    let y = 720;
    const textSize = 12;
    const lineSpacing = 16;

    errors.forEach((error, index) => {
      const errorHeader = `Error ${index + 1}:`;
      const errorDetails = `
      ID: ${error.id}
      Description: ${error.text}
      Test: ${error.test}
      Location: ${error.location}
      Flag: ${error.flag}
      Status: ${error.flag === 'fatal' ? 'Failed' : 'Passed'}
      `;
      const textHeight = textSize * 1.2; // Adjust this factor to suit your needs

      page.drawText(errorHeader, {
        x: 50,
        y: y,
        size: textSize,
        color: rgb(0, 0, 0),
      });

      y -= textHeight;

      errorDetails.split('\n').forEach((line) => {
        page.drawText(line.trim(), {
          x: 50,
          y: y,
          size: textSize,
          color: rgb(0, 0, 0),
        });
        y -= textHeight;
      });

      y -= lineSpacing; // Additional space between errors
    });

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
        console.log(validationErrors);

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
            const pdfId = pdfUploadStream.id;

            const ublValidationObject = {
              ublId: ublId,
              pdfId: pdfId,
            };

            const updatedUser = await user.findByIdAndUpdate(
              userId,
              { $push: { ublValidation: ublValidationObject } },
              { new: true, useFindAndModify: false }
            );

            if (!updatedUser) {
              return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({
              message:
                'UBL file uploaded, validated, and user updated successfully!',
              ublId,
              pdfId,
              validationReport: validationErrors,
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
