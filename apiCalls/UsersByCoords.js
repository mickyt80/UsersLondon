const axios = require('axios');
const haversine = require('haversine');
const coordsUsersMeter = require('../metering/meterUsersByCoords');

/**
 * Returns users within a distance from a centre point specified by a latitude and a longitude.
 * @param {*} radiusParam - distance from the centre point in miles.
 * @returns a list of User objects.
 */
const getCoordsUsers = async function getCoordsUsers(radiusParam) {
  const usersInRadius = [];
  const radius = radiusParam || 50;
  // check radius is defined and greater than 0
  if (radius < 0) {
    throw Error('Radius less than 0.');
  }

  // get centre coordinates
  const centreLat = process.env.CENTRE_LAT;
  const centreLong = process.env.CENTRE_LONG;
  if (!centreLat || !centreLong) {
    throw Error('Center coordinates not defined.');
  }

  // backend service URL
  const allUsersUrl = process.env.ALL_USERS_URL;
  if (!allUsersUrl) {
    throw Error('ALL_USERS_URL not defined in env.');
  }

  // call the backend service
  const meter = coordsUsersMeter();
  try {
    const allUsers = await axios.get(allUsersUrl);
    meter('success', 'ok');
    if (allUsers && allUsers.data) {
      allUsers.data.forEach((user) => {
        if (user.latitude && user.longitude) {
          const points = [{
            latitude: user.latitude,
            longitude: user.longitude,
          },
          {
            latitude: centreLat,
            longitude: centreLong,
          },
          ];
          // calculate haversine distance in miles
          const dist = haversine(points[0], points[1], { unit: 'mile' });
          if (dist < radius) {
            usersInRadius.push(user);
          }
        }
      });
    }
  } catch (err) {
    meter('fail', 'api_error');
    throw Error('Backend service error.');
  }
  return usersInRadius;
};

module.exports = {
  getCoordsUsers,
};
