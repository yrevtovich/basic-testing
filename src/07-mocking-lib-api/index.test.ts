import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: <T extends Function>(cb: T) => (path: string) => cb(path)
}))

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosClientMock = { get: jest.fn().mockResolvedValue({ data: 'text' }) } as unknown as AxiosInstance;  
    const axiosCreateSpy = jest.spyOn(axios, 'create').mockImplementation(jest.fn())
    axiosCreateSpy.mockReturnValue(axiosClientMock);

    await throttledGetDataFromApi('path')

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' })
  });

  test('should perform request to correct provided url', async () => {
    const axiosClientMock = { get: jest.fn().mockResolvedValue({ data: 'text' }) } as unknown as AxiosInstance;  
    const axiosCreateSpy = jest.spyOn(axios, 'create').mockImplementation(jest.fn())
    axiosCreateSpy.mockReturnValue(axiosClientMock);

    await throttledGetDataFromApi('path')

    expect(axiosClientMock.get).toHaveBeenCalledWith('path')
  });

  test('should return response data', async () => {
    const axiosClientMock = { get: jest.fn().mockResolvedValue({ data: 'text' }) } as unknown as AxiosInstance;  
    const axiosCreateSpy = jest.spyOn(axios, 'create').mockImplementation(jest.fn())
    axiosCreateSpy.mockReturnValue(axiosClientMock);

    const response = await throttledGetDataFromApi('path')

    expect(response).toBe('text')
  });
});
