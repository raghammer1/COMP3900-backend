const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const converterRoutes = require('./routes/converterRoutes');
const validateRouter = require('./routes/validateRouter');
const editProfileRouter = require('./routes/editProfileRouter');
const { connectDB } = require('./db');
const getAnyFileFunction = require('./getAnyFile/getAnyFileFunction');
const FileSender = require('./shared/FileSender');
const getImage = require('./editProfile/getImage');
const bodyParser = require('body-parser');
const getUserEmailHistory = require('./emailHistoryManager/getUserEmailHistory');
require('dotenv').config();
const auth = require('./middleware/auth');
const giveAccessValidationUbl = require('./shared/giveAccessValidationUbl');
const giveAccessPdfUbl = require('./shared/giveAccessPdfUbl');
const getUserEmailHistoryById = require('./emailHistoryManager/getUserEmailHistoryById');

// Set the port for the server
const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

// Create an Express application
const app = express();

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json({ limit: '30mb' })); // Limit the JSON body size to 30MB
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); // Limit the URL-encoded body size to 30MB

// Use CORS middleware to allow requests from the frontend
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies) to be sent with requests
  })
);

// Set custom headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from this origin
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies) to be sent with requests
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE' // Allow these HTTP methods
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type' // Allow these headers
  );
  next(); // Pass control to the next middleware
});

// Use cookie parser middleware to parse cookies
app.use(cookieParser());

// Use express.json middleware to parse JSON request bodies
app.use(express.json());

// Define a test route
app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' }); // Send a JSON response
});

// Define routes for different parts of the application
app.use('/auth', authRoutes); // Authentication routes
app.use('/convert', converterRoutes); // Converter routes
app.use('/validate', validateRouter); // Validation routes
app.use('/edit', editProfileRouter); // Edit profile routes
app.get('/getFile', getAnyFileFunction); // Get file route
app.post('/sendFile', auth, FileSender); // Send file route with authentication
app.get('/api/images/:filename', getImage); // Get image by filename route
app.post('/give-access-validation-ubl', auth, giveAccessValidationUbl); // Give access to UBL validation route with authentication
app.post('/give-access-convertion-ubl', auth, giveAccessPdfUbl); // Give access to PDF UBL conversion route with authentication
app.get('/history-email', auth, getUserEmailHistory); // Get user email history route with authentication
app.get('/get-history-email-by-id', auth, getUserEmailHistoryById); // Get user email history by ID route with authentication

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Connect to the database and start the server
connectDB().then(() => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port:', PORT); // Log the server start
  });
});

module.exports = app;
