const meterUsersByCoords = require('../../metering/meterUsersByCoords');

jest.mock('prom-client', () => ({
  Histogram: class Histogram {
    constructor() {
      this.startTimer = jest.fn(() => jest.fn());
    }
  },
  Counter: class Counter {
    constructor() {
      this.inc = (labels) => {
        global.lastIncrement = labels;
      };
    }
  },
}));

function testLabels(outcome, status, expected) {
  const timer = meterUsersByCoords();
  timer(outcome, status);
  expect(global.lastIncrement)
    .toEqual({
      outcome,
      status: expected,
    });
}

describe('meterUsersByCoords', () => {
  test('records success and ok', () => {
    testLabels('success', 'ok', 'ok');
  });

  test('records fail and api_error', () => {
    testLabels('fail', 'api_error', 'api_error');
  });

});