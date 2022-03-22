/**
 * People who are living in London, or whose current coordinates are within certian miles of London.
 *
 * distance Long Distance to London
 * returns List
 * */
exports.usersDistanceGET = function (distance) {
  return new Promise((resolve, reject) => {
    const examples = {};
    examples['application/json'] = [{
      firstName: 'FirstName',
      lastName: 'LastName',
      ipAddress: '192.57.242.100',
      location: {
        latitude: 34.003135,
        longitude: -117.7228641,
      },
      id: 4,
      email: 'user@example.com',
    }, {
      firstName: 'FirstName',
      lastName: 'LastName',
      ipAddress: '192.57.242.100',
      location: {
        latitude: 34.003135,
        longitude: -117.7228641,
      },
      id: 4,
      email: 'user@example.com',
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
