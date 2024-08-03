const user = require('../models/user');

const giveAccessValidationUbl = async (req, res) => {
  try {
    const { ublId, validatorId, name, validationHtml, validationJson } =
      req.body;

    let email = req.body.email.toLowerCase();

    const User = await user.findOne({ email });

    if (!User) {
      return res.status(404).json({ error: "This user doesn't exist" });
    }

    const ublValidationObject = {
      ublId: ublId,
      validatorId: validatorId,
      name,
      validationHtml,
      validationJson,
    };

    // Check if the ublValidationObject already exists
    const isExistingValidation = User.ublValidation.some(
      (validation) => validation.name === ublValidationObject.name
    );

    if (isExistingValidation) {
      return res
        .status(409)
        .json({ error: 'Validation object with name already exists' });
    }

    const updatedUser = await user.findOneAndUpdate(
      { email },
      { $push: { ublValidation: ublValidationObject } },
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

module.exports = giveAccessValidationUbl;
