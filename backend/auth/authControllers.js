// Import the modules handling different authentication functionalities
const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const forgotPassword = require('./forgotPassword.js');
const resetPassword = require('./resetPassword.js');
const deleteUser = require('./deleteUser.js');
const googleLogin = require('./googleLogin.js');
const deleteUserAccount = require('./deleteUserAccount.js');

// Bundle all the controllers into a single export for easy access
exports.controllers = {
  postLogin,
  postRegister,
  forgotPassword,
  resetPassword,
  deleteUser,
  googleLogin,
  deleteUserAccount,
};
