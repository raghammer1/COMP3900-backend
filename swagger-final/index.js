const express = require('express');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggeruiexpress = require('swagger-ui-express');

const app = express();

app.use(express.json());

const option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HexaHunks API Documentation',
      version: '0.1',
      contact: {
        name: 'Author (Raghav Agarwal)',
        email: 'raghagarwal@gmail.com',
      },
    },
    servers: [{ url: 'http://localhost:3005/' }],
  },
  apis: ['./routes/*.js'],
};

const spacs = swaggerjsdoc(option);
app.use('/api-docs', swaggeruiexpress.serve, swaggeruiexpress.setup(spacs));

app.listen(3005, () => {});
