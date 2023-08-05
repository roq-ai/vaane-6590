import axios from 'axios';
import queryString from 'query-string';
import { TestRideInterface, TestRideGetQueryInterface } from 'interfaces/test-ride';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTestRides = async (
  query?: TestRideGetQueryInterface,
): Promise<PaginatedInterface<TestRideInterface>> => {
  const response = await axios.get('/api/test-rides', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTestRide = async (testRide: TestRideInterface) => {
  const response = await axios.post('/api/test-rides', testRide);
  return response.data;
};

export const updateTestRideById = async (id: string, testRide: TestRideInterface) => {
  const response = await axios.put(`/api/test-rides/${id}`, testRide);
  return response.data;
};

export const getTestRideById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/test-rides/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTestRideById = async (id: string) => {
  const response = await axios.delete(`/api/test-rides/${id}`);
  return response.data;
};
