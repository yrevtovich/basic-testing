import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';


describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueToBeResolved = 11
    const result = await resolveValue(valueToBeResolved)

    expect(result).toBe(valueToBeResolved)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'error message';

    try {
      throwError(message)
    } catch(error: unknown) {
      expect((error as Error).message).toBe(message)
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError()
    } catch(error: unknown) {
      expect((error as Error).message).toBe('Oops!')
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
     try {
      throwCustomError()
    } catch(error: unknown) {
      expect((error as Error).message).toBe('This is my awesome custom error!')
      expect(error).toBeInstanceOf(MyAwesomeError)
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError()
    } catch(error: unknown) {
      expect((error as Error).message).toBe('This is my awesome custom error!')
      expect(error).toBeInstanceOf(MyAwesomeError)
    }
  });
});
