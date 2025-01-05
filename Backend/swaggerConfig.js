const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const APIURL = process.env.URL;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Project API',
      version: '1.0.0',
      description: 'Before Using any API first login and generate token for authentication.',
    },
    servers: [
      {
        url: APIURL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional: Specify the token format
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./Routers/*.js'],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = swaggerSpecs;
