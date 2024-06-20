const path = require('path');

const validateUblFile = async (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const validationUrl =
    'https://services.ebusiness-cloud.com/ess-schematron/v1/web/validate/single?rules=Au-Nz%20peppol-1.0.10';

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), req.file.filename);

    const apiKey = await getToken(); // Get the current valid token

    const response = await axios.post(validationUrl, form, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        ...form.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = validateUblFile;
