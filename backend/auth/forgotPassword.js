const forgotPasswordEmailSender = require('./forgotPasswordEmailSender');

const forgotPassword = (req, res) => {
  forgotPasswordEmailSender(req, res);
};

module.exports = forgotPassword;
