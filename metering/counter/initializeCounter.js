// prom

function initializeCounter(counter, errorCodes, successStatuses) {
  successStatuses.forEach((status) => {
    counter.inc({
      outcome: 'success',
      status,
    }, 0);
  });
  errorCodes.forEach((code) => {
    counter.inc({
      outcome: 'failed',
      status: code,
    }, 0);
  });
}

module.exports = initializeCounter;
