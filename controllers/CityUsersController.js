const utils = require('../utils/writer.js');

const usersInCity = require('../apiCalls/UsersInCity');
const usersByCoords = require('../apiCalls/UsersByCoords');

const logger = require('../utils/logger');

module.exports.usersGET = async function usersGET(req, res, next, distance) {
  try {
    // call usersInCity
    const usersCity = await usersInCity.getUsersInCity('London');
    // call  usersByCoords
    const usersCoords = await usersByCoords.getCoordsUsers();

    const map = new Map();
    if (usersCity && usersCity.length > 0) {
      usersCity.forEach(
        (user) => map.set(user.id, user),
      );
    }

    if (usersCoords && usersCoords.length > 0) {
      usersCoords.forEach(
        (user) => map.set(user.id, user),
      );
    }
    // merge the user lists
    utils.writeJson(res, [...map.values()]);
    logger.info(`Retrieved ${map.size} users`);
  } catch (err) {
    logger.error(err.message);
    res.status(500).send('Internal Server Error');
  }
};
