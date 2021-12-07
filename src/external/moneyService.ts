function subscribeToMoneyTransfer(callback: Function) {
  const CURRENCIES = ['USD', 'EUR', 'GBP'];
  while (true) {
      callback({
          from: 'anonymous', 
          to: 'anonymous', 
          currency: CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)], 
          amount: Math.floor(Math.random() * 100000)  
      });
  }
}

export default subscribeToMoneyTransfer;