const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/auth', authRoutes);

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;
