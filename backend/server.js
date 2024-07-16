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
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.use(cookieParser());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const accessGiverSchema = joi.object({
  email: joi.string().email().required(),
  ublId: joi.string().required(),
  validatorId: joi.string().required(),
  name: joi.string().required(),
});

app.use('/auth', authRoutes);
app.use('/convert', converterRoutes);
app.use('/validate', validateRouter);
app.use('/edit', editProfileRouter);
app.use('/getFile', getAnyFileFunction);
app.post('/sendFile', auth, FileSender);
app.get('/api/images/:filename', getImage);
app.get('/history-email', auth, getUserEmailHistory);
app.post(
  '/give-access-validation-ubl',
  auth,
  validator.body(accessGiverSchema),
  giveAccessValidationUbl
);

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;
