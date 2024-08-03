const user = require('../models/user');

const deleteUser = async (req, res) => {
  try {
    let email = req.params.email;

    email = email.toLowerCase();
    const User = await user.findOneAndDelete({ email });

    if (!User) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};
module.exports = deleteUser;
