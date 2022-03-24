const winston = require('winston');

// configure logging
const myWinstonOptions = {
  transports: [new winston.transports.File({
    filename: 'debug.log',
  })],
};
  /* eslint-disable new-cap */
const logger = new winston.createLogger(myWinstonOptions);

module.exports = logger;
