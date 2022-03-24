const client = require('prom-client');

const { collectDefaultMetrics } = client;

function collect(prefix) {
  collectDefaultMetrics({ prefix });
}

module.exports = collect;
