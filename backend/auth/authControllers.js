const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const forgotPassword = require('./forgotPassword.js');
const resetPassword = require('./resetPassword.js');
const deleteUser = require('./deleteUser.js');
const googleLogin = require('./googleLogin.js');
const deleteUserAccount = require('./deleteUserAccount.js');

exports.controllers = {
  postLogin,
  postRegister,
  forgotPassword,
  resetPassword,
  deleteUser,
  googleLogin,
  deleteUserAccount,
};
