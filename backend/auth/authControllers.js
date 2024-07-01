const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const forgotPassword = require('./forgotPassword.js');
const resetPassword = require('./resetPassword.js');

exports.controllers = {
  postLogin,
  postRegister,
  forgotPassword,
  resetPassword,
};
