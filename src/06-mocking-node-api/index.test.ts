import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path'
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

jest.mock('path')
jest.mock('fs/promises')
jest.mock('fs')


const joinMock = join as jest.Mock;
const readFileMock = readFile as jest.Mock;
const existsSyncMock = existsSync as jest.Mock;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const mockedFn = jest.fn()

    doStuffByTimeout(mockedFn, 1000)

    expect(setTimeoutSpy).toHaveBeenCalledWith(mockedFn, 1000)

    setTimeoutSpy.mockRestore()
  });

  test('should call callback only after timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const mockedFn = jest.fn();

    doStuffByTimeout(mockedFn, 1000);

    jest.advanceTimersByTime(1000);

    expect(mockedFn).toHaveBeenCalled();

    setTimeoutSpy.mockRestore();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const mockedFn = jest.fn()

    doStuffByInterval(mockedFn, 1000)

    expect(setIntervalSpy).toHaveBeenCalledWith(mockedFn, 1000)

    setIntervalSpy.mockRestore()
  });

  test('should call callback multiple times after multiple intervals', () => {    
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const mockedFn = jest.fn();

    doStuffByTimeout(mockedFn, 1000);

    jest.advanceTimersByTime(1000);

    expect(mockedFn).toHaveBeenCalled();

    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('path')

    expect(joinMock).toHaveBeenCalledWith(__dirname, 'path')
  });

  test('should return null if file does not exist', async () => {    
    existsSyncMock.mockReturnValueOnce(false);

    const result = await readFileAsynchronously('path');

    expect(result).toBeNull()
  });

  test('should return file content if file exists', async () => {
    existsSyncMock.mockReturnValueOnce(true);
    readFileMock.mockResolvedValueOnce('content');

    const result = await readFileAsynchronously('path');

    expect(result).toBe('content')
  });
});
