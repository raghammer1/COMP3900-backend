const user = require('../models/user');

const getConvertionData = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    const User = await user.findById(userId).select('pdfUblValidation');

    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ pdfUblValidation: User.pdfUblValidation });
  } catch (  ) {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};
module.exports = getConvertionData;
