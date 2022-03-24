const client = require('prom-client');
const buckets = require('./buckets');
const initializeCounter = require('./counter/initializeCounter');

const usersGetHistogram = new client.Histogram({
  name: 'cityUsers_get_time',
  help: 'A histogram that stores data on time taken to call the Get City Users API',
  buckets,
});

const usersGetCounter = new client.Counter({
  name: 'cityUsers_get_get',
  help: 'A counter that indicates whether or not the Get City Users API was successfully called',
  labelNames: ['outcome', 'status'],
});

const successStatuses = ['ok'];
const errorCodes = ['api_error'];
initializeCounter(usersGetCounter, errorCodes, successStatuses);

module.exports = () => {
  const stopTimer = usersGetHistogram.startTimer();
  return (outcome, status) => {
    stopTimer();
    usersGetCounter.inc({
      outcome,
      status,
    });
  };
};
