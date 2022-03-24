const request = require('supertest');


const setEnv = () => {
    process.env.CENTRE_LAT = 51.5072;
    process.env.CENTRE_LONG = 0.1276;
    process.env.ALL_USERS_URL = 'http://some.url.com/users';
    process.env.CITY_USERS_URL = 'http://some.url.com/city';
  };
setEnv();  

jest.mock('../../apiCalls/UsersInCity');
const {getUsersInCity} = require('../../apiCalls/UsersInCity');
jest.mock('../../apiCalls/UsersByCoords');
const {getCoordsUsers} = require('../../apiCalls/UsersByCoords');
const app = require('../../app');

const coordsUsers = [
    {
      id: 266, first_name: 'Ancell', last_name: 'Garnsworthy', email: 'agarnsworthy7d@seattletimes.com', ip_address: '67.4.69.137', latitude: 51.6553959, longitude: 0.0572553,
    },
    {
      id: 322, first_name: 'Hugo', last_name: 'Lynd', email: 'hlynd8x@merriam-webster.com', ip_address: '109.0.153.166', latitude: 51.6710832, longitude: 0.8078532,
    },
    {
      id: 554, first_name: 'Phyllys', last_name: 'Hebbs', email: 'phebbsfd@umn.edu', ip_address: '100.89.186.13', latitude: 51.5489435, longitude: 0.3860497,
    },
    {
      id: 794, first_name: 'Katee', last_name: 'Gopsall', email: 'kgopsallm1@cam.ac.uk', ip_address: '203.138.133.164', latitude: 5.7204203, longitude: 10.901604,
    },
    {
      id: 688, first_name: 'Tiffi', last_name: 'Colbertson', email: 'tcolbertsonj3@vimeo.com', ip_address: '141.49.93.0', latitude: 37.13, longitude: -84.08,
    },
  ];
  
  const inCityUsers = [
    {
      id: 135, first_name: 'Mechelle', last_name: 'Boam', email: 'mboam3q@thetimes.co.uk', ip_address: '113.71.242.187', latitude: -6.5115909, longitude: 105.652983,
    },
    {
      id: 396, first_name: 'Terry', last_name: 'Stowgill', email: 'tstowgillaz@webeden.co.uk', ip_address: '143.190.50.240', latitude: -6.7098551, longitude: 111.3479498,
    },
    {
      id: 520, first_name: 'Andrew', last_name: 'Seabrocke', email: 'aseabrockeef@indiegogo.com', ip_address: '28.146.197.176', latitude: '27.69417', longitude: '109.73583',
    },
    {
      id: 658, first_name: 'Stephen', last_name: 'Mapstone', email: 'smapstonei9@bandcamp.com', ip_address: '187.79.141.124', latitude: -8.1844859, longitude: 113.6680747,
    },
    {
      id: 688, first_name: 'Tiffi', last_name: 'Colbertson', email: 'tcolbertsonj3@vimeo.com', ip_address: '141.49.93.0', latitude: 37.13, longitude: -84.08,
    },
    {
      id: 794, first_name: 'Katee', last_name: 'Gopsall', email: 'kgopsallm1@cam.ac.uk', ip_address: '203.138.133.164', latitude: 5.7204203, longitude: 10.901604,
    },
  ];


describe ('Test - CityUsersControllerv', () => {

    it('Should return a 500 Internal Server Error when the getUsersInCity backend calls is failing.', () => {
        getUsersInCity.mockRejectedValue(new Error('CITY_USERS_URL not defined in env.'));
        getCoordsUsers.mockResolvedValue([]);

        return request(app).get('/v1/users/50').then((response) => {
           expect(response.statusCode).toEqual(500);
        });
   });

   it('Should return a 500 Internal Server Error when the getCoordsUsers backend calls is failing.', () => {
    getCoordsUsers.mockRejectedValue(new Error('Backend error'));
    getUsersInCity.mockResolvedValue([]);

    return request(app).get('/v1/users/50').then((response) => {
       expect(response.statusCode).toEqual(500);
    });
});

    it('Succesfully returns a merges set of users', () => {
        getCoordsUsers.mockResolvedValue(coordsUsers);
        getUsersInCity.mockResolvedValue(inCityUsers);
        return request(app).get('/v1/users/50').then((response) => {
            expect(response.statusCode).toEqual(200);
            expect(response.body.length).toEqual(9);
         });
    });

});