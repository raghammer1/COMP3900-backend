const user = require('../models/user');

const deleteUser = async (req, res) => {
  try {
    let email = req.params.email;
    console.log('CAME HERE TO DELETE USER', email);

    email = email.toLowerCase();
    const User = await user.findOneAndDelete({ email });

    if (!User) {
      console.log('User not found');
      return res.status(404).send({ message: 'User not found' });
    }
    console.log('User deleted successfully');
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};
module.exports = deleteUser;
