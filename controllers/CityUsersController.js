const utils = require('../utils/writer');

const usersInCity = require('../apiCalls/UsersInCity');
const usersByCoords = require('../apiCalls/UsersByCoords');

const logger = require('../utils/logger');

/**
 * Controller - returns the merged list of users living in a city
 *              or within a distance from the city in miles.
 * @param {*} req - http request
 * @param {*} res - http response
 * @param {*} _next - next route
 * @param {*} distance - distance in miles
 */
module.exports.usersGET = async function usersGET(req, res, _next, distance) {
  try {
    logger.info(`GET users in radius: ${distance}.`);

    const centreCity = process.env.CENTRE_CITY || 'London';
    // call usersInCity
    const usersCity = await usersInCity.getUsersInCity(centreCity);
    // call  usersByCoords
    const usersCoords = await usersByCoords.getCoordsUsers(distance);

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
