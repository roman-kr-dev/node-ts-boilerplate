import { MoneyWorker } from './';

jest.setTimeout(1000 * 100);

const mockProvider = (callback: any) => {
  for (let i = 0; i < 200; i++) {
    callback({ from: 'a', to: 'b', currency: 'EUR', amount: 40 });
  }
}

test('MoneyWorker - get notified on 50 calls of under 50 EURO * 3 times within 5 seconds', done => {
  let calls = 0;

  function callback() {
    calls ++;

    if (calls === 3) {
      clearTimeout(timeout);
      done();
    }
  }

  let timeout = setTimeout(() => {
    done('Test fail');
  }, 5000);

  MoneyWorker(mockProvider, callback);
});