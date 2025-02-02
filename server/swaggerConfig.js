// const swaggerJsDoc = require('swagger-jsdoc');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();

// // Dynamic loading of routes
// const routeFolder = path.join(__dirname, 'Router'); // Adjust the folder where routes are stored
// const routeFiles = fs.readdirSync(routeFolder);

// // Default API URL from environment variable
// const APIURL = process.env.HOST_URL || 'http://localhost:5000/api';

// // OpenAPI definition configuration
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Dynamic API Documentation',
//       version: '1.0.0',
//       description: 'Automatically generated API docs based on route metadata.',
//     },
//     servers: [
//       {
//         url: APIURL,
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT', // Optional: Specify the token format
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [], // Apply security globally for all routes
//       },
//     ],
//     tags:[],
//     basePath: '/',
//   },
//   apis: [path.join(routeFolder, '*.js')], // Dynamically look for all route files
// };

// // Dynamically generate Swagger spec by reading metadata from route files
// const generateSwaggerSpec = () => {
//   const swaggerSpecs = swaggerJsDoc(options);

//   routeFiles.forEach((file) => {
//     if (file.endsWith('.js')) {
//       const route = require(path.join(routeFolder, file));
      
//       // Dynamically add route metadata
//       if (route.meta) {
//         const { path: routePath, method, summary, description, parameters, responses,tags } = route.meta;

//         if (!swaggerSpecs.paths) {
//           swaggerSpecs.paths = {};
//         }

//         if (!swaggerSpecs.paths[routePath]) {
//           swaggerSpecs.paths[routePath] = {};
//         }

//         swaggerSpecs.paths[routePath][method] = {
//           summary,
//           description,
//           parameters,
//           responses,
//           tags,
//         };

//         if (tags && tags.length > 0) {
//           tags.forEach((tag) => {
//             if (!swaggerSpecs.tags.find((t) => t.name === tag)) {
//               swaggerSpecs.tags.push({ name: tag });
//             }
//           });
//         }

//       }
//     }
//   });

//   return swaggerSpecs;
// };

// module.exports = generateSwaggerSpec;
