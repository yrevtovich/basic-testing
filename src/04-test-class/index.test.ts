import { BankAccount, getBankAccount } from '.';
import lodash from 'lodash';


describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(123)

    expect(bankAccount.getBalance()).toBe(123)
    expect(bankAccount).toBeInstanceOf(BankAccount)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(123)

    try {
      bankAccount.withdraw(1234)
    } catch(error: unknown) {
      expect((error as Error).message).toBe('Insufficient funds: cannot withdraw more than 123')
    }
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(123)

    try {
      bankAccount.transfer(1234, new BankAccount(144))
    } catch(error: unknown) {
      expect((error as Error).message).toBe('Insufficient funds: cannot withdraw more than 123')
    }
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(123)

    try {
      bankAccount.transfer(12, bankAccount)
    } catch(error: unknown) {
      expect((error as Error).message).toBe('Transfer failed')
    }
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(123)

    bankAccount.deposit(13)

    expect(bankAccount.getBalance()).toBe(136)
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(123)

    bankAccount.withdraw(13)

    expect(bankAccount.getBalance()).toBe(110)
  });

  test('should transfer money', () => {
    const firstBankAccount = getBankAccount(123)
    const secondBankAccount = getBankAccount(100)

    firstBankAccount.transfer(13, secondBankAccount)

    expect(firstBankAccount.getBalance()).toBe(110)
    expect(secondBankAccount.getBalance()).toBe(113)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomSpy = jest.spyOn(lodash, 'random')
    const bankAccount = getBankAccount(100)

    const balance = await bankAccount.fetchBalance();

    const isRejected = randomSpy.mock.results[1]?.value === 0

    if(isRejected) {
      expect(balance).toBeNull()
    } else {
      expect(balance).toEqual(expect.any(Number))
    }

    randomSpy.mockRestore()
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100)

    bankAccount.fetchBalance = jest.fn().mockResolvedValueOnce(120);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(120);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100)
    bankAccount.fetchBalance = jest.fn().mockResolvedValueOnce(null);

    try {
    await bankAccount.synchronizeBalance();
    } catch (error: unknown) {
      expect((error as Error).message).toBe('Synchronization failed')
    }
  });
});
