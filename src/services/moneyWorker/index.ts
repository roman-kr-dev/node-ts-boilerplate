import subscribeToMoneyTransfer from '../../external/moneyService';

enum Errors {
  TOO_MANY_REQUEST = 'too many requests'
}

interface Packet {
  from: string;
  to: string;
  currency: string;
  amount: number;
}

const ALLOWED_CURRENCIES = ['USD', 'EUR', 'GBP'];

let eligableTransactions = 0;

const notifyTransactions = () => {
  console.log('under 50!');
}

export const onMoneyTransfer = (notifyTransactions: Function) => (packet: Packet, error: Error | undefined) => {
  if (error) {
    throw error;
  }
  const { currency, amount } = packet;

  if (currency === 'EUR' && amount <= 50) {
    eligableTransactions ++;
  }

  if (eligableTransactions >= 50) {
    eligableTransactions = 0;

    notifyTransactions();
  }
}

export const MoneyWorker = (provider: any, notify: Function) => {
  try {
    provider(onMoneyTransfer(notify));
  } catch (e) {
  }
}

export const service = () => {
  MoneyWorker(subscribeToMoneyTransfer, notifyTransactions);
}

export default service;