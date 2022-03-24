const usersByCoords = require('../../apiCalls/UsersByCoords');

jest.mock('axios');
const axios = require('axios');

describe('Test - Get users close to a location by coordinates ', () => {
  it('Should return an error if radius is less than 0', async () => {
    expect.assertions(1);
    try {
      await usersByCoords.getCoordsUsers(-100);
    } catch (err) {
      expect(err.message).toMatch('Radius less than 0.');
    }
  });

  it('Should return an error if centre point has no env coordinates (CENTRE_LAT and CENTRE_LONG)', async () => {
    process.env = {};
    expect.assertions(1);
    try {
      await usersByCoords.getCoordsUsers();
    } catch (err) {
      expect(err.message).toMatch('Center coordinates not defined.');
    }
  });

  it('Should return an error if the ALL_USERS_URL env is ot defined', async () => {
    process.env = {};
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;

    expect.assertions(1);
    try {
      await usersByCoords.getCoordsUsers();
    } catch (err) {
      expect(err.message).toMatch('ALL_USERS_URL not defined in env.');
    }
  });

  it('Should return an error if the backend service call fails', async () => {
    process.env = {};
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;
    process.env.ALL_USERS_URL = 'http:some.url.com/users';

    axios.get.mockRejectedValueOnce();
    expect.assertions(1);
    try {
      await usersByCoords.getCoordsUsers(50);
    } catch (err) {
      expect(err.message).toMatch('Backend service error.');
    }
  });

  it('Should return an empty array when the backend service returns empty data', async () => {
    process.env = {};
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;
    process.env.ALL_USERS_URL = 'http:some.url.com/users';
    axios.get.mockResolvedValueOnce(undefined);

    expect.assertions(1);
    try {
      const users = await usersByCoords.getCoordsUsers(30);
      expect(users.length).toBe(0);
    } catch (err) {
    }
  });

  it('Should return an array of users on success calls', async () => {
    const allUsers = {data: [
      {
        id: 1,
        first_name: 'Maurise',
        last_name: 'Shieldon',
        email: 'mshieldon0@squidoo.com',
        ip_address: '192.57.232.111',
        latitude: 51.5072,
        longitude: 0.1276,
      },
      {
        id: 2,
        first_name: 'Maurise',
        last_name: 'Shieldon',
        email: 'mshieldon0@squidoo.com',
        ip_address: '192.57.232.111',
        latitude: 44.439663,
        longitude: 26.096306,
      },
    ]};

    process.env = {};
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;
    process.env.ALL_USERS_URL = 'http:some.url.com/users';
    axios.get.mockResolvedValueOnce(allUsers);

    expect.assertions(1);
    try {
      const users = await usersByCoords.getCoordsUsers(30);
      expect(users.length).toBe(1);
    } catch (err) {
    }
  });

  it('Should return an empty array when the data returns one user without latitude and longitude', async () => {
    process.env = {};
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;
    process.env.ALL_USERS_URL = 'http:some.url.com/users';
    axios.get.mockResolvedValueOnce(undefined);

    const allUsers = {data: [
      {
        id: 1,
        first_name: 'Maurise',
        last_name: 'Shieldon',
        email: 'mshieldon0@squidoo.com',
        ip_address: '192.57.232.111',
      },
    ]};

    process.env = {};
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;
    process.env.ALL_USERS_URL = 'http:some.url.com/users';
    axios.get.mockResolvedValueOnce(allUsers);

    expect.assertions(1);
    try {
      const users = await usersByCoords.getCoordsUsers(30);
      expect(users.length).toBe(0);
    } catch (err) {
    }
  });
});
