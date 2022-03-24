const axios = require('axios');
const cityUsersMeter = require('../metering/meterUsersInCity');

const getUsersInCity = async function getUsersInCity(cityParam) {
  const city = cityParam || 'London';

  // backend service URL
  const cityUsersUrl = process.env.CITY_USERS_URL;
  if (!cityUsersUrl) {
    throw Error('CITY_USERS_URL not defined in env.');
  }

  const meter = cityUsersMeter();
  try {
    const cityUsers = await axios.get(`${cityUsersUrl}/${city}/users`);
    meter('success', 'ok');
    if (cityUsers && cityUsers.data) return cityUsers.data;
  } catch (err) {
    meter('fail', 'api_error');
    throw Error('Backend service error.');
  }
  return [];
};

module.exports = {
  getUsersInCity,
};
