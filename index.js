const http = require('http');
const app = require('./app');

const serverPort = 7117;

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, () => {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
