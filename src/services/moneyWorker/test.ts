import { MoneyWorker } from './';

jest.setTimeout(1000 * 100);

const mockProvider = (callback: any) => {
  for (let i = 0; i < 60; i++) {
    callback({ from: 'a', to: 'b', currency: 'EUR', amount: 40 });
  }
}

test('MoneyWorker - test get 50 times under 50 within 5 seconds', done => {
  function callback() {
    clearTimeout(timeout);
    done();
  }

  let timeout = setTimeout(() => {
    done('Test fail');
  }, 5000);

  MoneyWorker(mockProvider, callback);
});