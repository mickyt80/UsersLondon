const client = require('prom-client');

const { register } = client;

module.exports.metrics = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500)
      .end(ex);
  }
};
