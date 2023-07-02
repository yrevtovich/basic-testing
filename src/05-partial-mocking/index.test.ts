import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn()
}));

describe('partial mocking', () => {
  const originalConsoleLog = console.log;
  const logMock = jest.fn()
  console.log = logMock;

  afterAll(() => {
    jest.unmock('./index');
    console.log = originalConsoleLog;
  });

  beforeEach(jest.clearAllMocks)

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(logMock).toBeCalledTimes(0)
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(logMock).toHaveBeenCalledWith('I am not mocked')
  });
});
