const client = require('prom-client');
const request = require('supertest');

jest.mock('prom-client');

const app = require('../../app');

describe('metrics route', () => {
    const { register } = client;

    test('calls prometheus client', () => {

        register.metrics.mockImplementation(() => {
          });
      
        return request(app).get('/v1/metrics').then((response) => {
            expect(response.statusCode).toEqual(200);
            expect(register.metrics)
            .toHaveBeenCalled();  
         });
    });

    test('calls prometheus fail', () => {

        register.metrics.mockImplementation(() => {
            throw new Error('oops - error');
        });
      
        return request(app).get('/v1/metrics').then((res) => {
            expect(res.status).toEqual(500);
         });
    });
    
});        