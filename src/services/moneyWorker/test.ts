import * as service from './';

jest.setTimeout(1000 * 100);

const notifyTransactions = jest.spyOn(service, 'notifyTransactions');

const mockProvider = (callback: any) => {
  for (let i = 0; i < 155; i++) {
    callback({ from: 'a', to: 'b', currency: 'EUR', amount: 40 });
  }
}

test('MoneyWorker - get notified on 50 calls of under 50 EURO * 3 times', done => {
  service.MoneyWorker(mockProvider);

  function callback() {
    expect(notifyTransactions).toHaveBeenCalledTimes(3);
    done();
  }

  setTimeout(callback, 100);
});