const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contact importer API',
    description: 'API for contacts information',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');           // Your project's root file
});