const jwt = require('jsonwebtoken');
const config = process.env;

// Middleware to check if a token is valid
const verifyToken = (req, res, next) => {
  // Read the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch {
    return res.status(401).send('Invalid Token');
  }

  return next();
};

module.exports = verifyToken;
