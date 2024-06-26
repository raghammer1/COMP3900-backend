// const path = require('path');

// const validateUblFile = async (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.file.filename);
//   const validationUrl =
//     'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

//   try {
//     const form = new FormData();
//     form.append('file', fs.createReadStream(filePath), req.file.filename);

//     const apiKey = await getToken(); // Get the current valid token

//     const response = await axios.post(validationUrl, form, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         Accept: 'application/json',
//         ...form.getHeaders(),
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     res.status(error.response ? error.response.status : 500).json({
//       error: error.response ? error.response.data : error.message,
//     });
//   }
// };

// module.exports = validateUblFile;
const axios = require('axios');
const FormData = require('form-data');
const { Readable } = require('stream');
const { getToken } = require('./tokenService');

const validateUblFile = async (req, res) => {
  const validationUrl =
    'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

  console.log('CAME HEREs');
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const form = new FormData();
    const fileStream = new Readable();
    fileStream.push(req.file.buffer);
    fileStream.push(null);

    form.append('file', fileStream, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const apiKey = await getToken(); // Get the current valid token

    const response = await axios.post(validationUrl, form, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        ...form.getHeaders(),
      },
    });

    console.log(
      response.data.report.reports.AUNZ_PEPPOL_1_0_10.firedAssertionErrors
    );

    res.json(response);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = validateUblFile;
