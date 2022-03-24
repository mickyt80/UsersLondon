# City Users API

## Overview
This API returns people who are listed as either living in a specified city, or whose current coordinates are within a radius in miles of that city.
This service calls https://bpdts-test-app.herokuapp.com/ to return the users living within a certain radius from a city.

### Configuration - environment variables
```
CENTRE_LAT = City centre latitude
CENTRE_LONG = City centre longitude
CENTRE_CITY = City centre
ALL_USERS_URL = backend API called to retrieve users by coordinates distance 
CITY_USERS_URL = backend API called to retrieve users living within the city
```

### Running the server
To run the server from a terminal, run:

```
npm start
```

To run the server in docker, first build the image:

```
docker build -t users-city . 
```

then run the container specifying all the environment variables needed:

```
docker run -dit -p 7117:7117 -e CENTRE_LAT=<city_lat> -e CENTRE_LONG=<city_long> -e ALL_USERS_URL=https://bpdts-test-app.herokuapp.com/users -e CITY_USERS_URL=https://bpdts-test-app.herokuapp.com/city  --name CityUsers docker.io/library/users-city
```

### Running the unit tests

```
npm test
```

### Postman tests

Postman directory contains a Postman collection with a set of tests for the API.

### Monitoring

Prometheus is used to expose metrics on /metrics endpoint.

### Logging
Debug.log file contains the application logging.

### API documentation
To view the Swagger UI interface:

```
open http://localhost:7117/docs
```

### Contact

```
mickyt@gmail.com
```
