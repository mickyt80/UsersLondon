const axios = require('axios');

const getUsersInCity = async function getUsersInCity(cityParam) {
  const city = cityParam || 'London';

  // backend service URL
  const cityUsersUrl = process.env.CITY_USERS_URL;
  if (!cityUsersUrl) {
    throw Error('CITY_USERS_URL not defined in env.');
  }

  try {
    const cityUsers = await axios.get(`${cityUsersUrl}/${city}/users`);
    if (cityUsers) return cityUsers;
  } catch (err) {
    throw Error('Backend service error.');
  }
  return [];
};

module.exports = {
  getUsersInCity,
};
