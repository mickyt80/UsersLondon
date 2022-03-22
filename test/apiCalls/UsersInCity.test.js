jest.mock('axios');
const axios = require('axios');

const usersInCity = require('../../apiCalls/UsersInCity');

describe('Test - Get users living in a city', () => {
  it('Should return an error if CITY_USERS_URL is not defined as an env var', async () => {
    process.env = {};

    expect.assertions(1);
    try {
      await usersInCity.getUsersInCity();
    } catch (err) {
      expect(err.message).toMatch('CITY_USERS_URL not defined in env.');
    }
  });

  it('Should return an error if the backend call fails', async () => {
    process.env = {};
    process.env.CITY_USERS_URL = 'https://some.url.com';

    axios.get.mockRejectedValueOnce();

    expect.assertions(1);
    try {
      await usersInCity.getUsersInCity('Paris');
    } catch (err) {
      expect(err.message).toMatch('Backend service error.');
    }
  });

  it('Should return an empty array in case backend service reply is empty', async () => {
    process.env = {};
    process.env.CITY_USERS_URL = 'https://some.url.com';

    axios.get.mockResolvedValueOnce(undefined);
    expect.assertions(1);
    try {
      const cityUsers = await usersInCity.getUsersInCity('Paris');
      expect(cityUsers.length).toBe(0);
    } catch (err) {
    }
  });

  it('Should return a non-empty array when backend service replies with users in city', async () => {
    process.env = {};
    process.env.CITY_USERS_URL = 'https://some.url.com';

    const cityUsersList = [
      {
        id: 135,
        first_name: 'Mechelle',
        last_name: 'Boam',
        email: 'mboam3q@thetimes.co.uk',
        ip_address: '113.71.242.187',
        latitude: -6.5115909,
        longitude: 105.652983,
      },
      {
        id: 396,
        first_name: 'Terry',
        last_name: 'Stowgill',
        email: 'tstowgillaz@webeden.co.uk',
        ip_address: '143.190.50.240',
        latitude: -6.7098551,
        longitude: 111.3479498,
      },
    ];
    axios.get.mockResolvedValueOnce(cityUsersList);

    expect.assertions(1);
    try {
      const cityUsers = await usersInCity.getUsersInCity('Paris');
      expect(cityUsers.length).toBe(2);
    } catch (err) {
    }
  });
});
