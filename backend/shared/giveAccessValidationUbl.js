const user = require('../models/user');

const giveAccessValidationUbl = async (req, res) => {
  try {
    const { ublId, validatorId, name } = req.body;

    email = req.body.email.toLowerCase();

    const User = await user.findOne({ email });

    if (!User) {
      console.log('User not found');
      return res.status(404).send({ message: "This user doesn't exist" });
    }

    const ublValidationObject = {
      ublId: ublId,
      validatorId: validatorId,
      name,
    };

    // Check if the ublValidationObject already exists
    const isExistingValidation = User.ublValidation.some(
      (validation) => validation.name === ublValidationObject.name
    );

    if (isExistingValidation) {
      return res
        .status(409)
        .send({ message: 'Validation object with name already exists' });
    }

    const updatedUser = await user.findOneAndUpdate(
      { email },
      { $push: { ublValidation: ublValidationObject } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(500).send({ message: 'Error updating user' });
    }

    console.log(req.body);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('Error in giveAccessValidationUbl:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = giveAccessValidationUbl;
