const oas3Tools = require('oas3-tools');
const path = require('path');
const collect = require('./metering/defaultMetrics');

// swaggerRouter configuration
const options = {
  routing: {
    controllers: path.join(__dirname, './controllers'),
  },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

collect('default_');
module.exports = app;
