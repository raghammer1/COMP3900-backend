const jwt = require('jsonwebtoken');
const config = process.env;

// Middleware to check if a token is valid
const verifyToken = (req, res, next) => {
  // Read the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    // If no token is present, respond with a 403 status
    return res.status(403).send('A token is required for authentication');
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded; // Attach decoded user information to the request object
  } catch {
    // If token verification fails, respond with a 401 status
    return res.status(401).send('Invalid Token');
  }

  return next(); // Call the next middleware or route handler
};

module.exports = verifyToken;
