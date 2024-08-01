const user = require('../models/user');
const giveAccessPdfUbl = async (req, res) => {
  try {
    const { ublId, validatorId, pdfId, name, validationHtml, validationJson } =
      req.body;

    const email = req.body.email.toLowerCase();

    const User = await user.findOne({ email });

    if (!User) {
      return res.status(404).json({ error: "This user doesn't exist" });
    }

    const ublValidationObject = {
      ublId: ublId,
      validatorId: validatorId,
      pdfId: pdfId,
      name,
      validationHtml,
      validationJson,
    };

    // Check if the ublValidationObject already exists
    const isExistingValidation = User.pdfUblValidation.some(
      (validation) => validation.name === ublValidationObject.name
    );

    if (isExistingValidation) {
      return res
        .status(409)
        .json({ error: 'Validation object with name already exists' });
    }

    const updatedUser = await user.findOneAndUpdate(
      { email },
      { $push: { pdfUblValidation: ublValidationObject } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(500).json({ error: 'Error updating user' });
    }

    return res.status(200).json({ message: 'Access Granted' });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = giveAccessPdfUbl;
