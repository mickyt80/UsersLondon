const utils = require('../utils/writer.js');
const Default = require('../service/DefaultService');

module.exports.usersDistanceGET = function usersDistanceGET(req, res, next, distance) {
  Default.usersDistanceGET(distance)
    .then((response) => {
      utils.writeJson(res, response);
    })
    .catch((response) => {
      utils.writeJson(res, response);
    });
};
