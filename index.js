const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');

const serverPort = 7117;

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, () => {
  logger.info(`Your server is listening on port ${serverPort} (http://localhost: ${serverPort})`);
  logger.info(`Swagger-ui is available on http://localhost:${serverPort}/docs`);
});
