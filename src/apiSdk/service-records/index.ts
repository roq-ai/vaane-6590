import axios from 'axios';
import queryString from 'query-string';
import { ServiceRecordInterface, ServiceRecordGetQueryInterface } from 'interfaces/service-record';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getServiceRecords = async (
  query?: ServiceRecordGetQueryInterface,
): Promise<PaginatedInterface<ServiceRecordInterface>> => {
  const response = await axios.get('/api/service-records', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createServiceRecord = async (serviceRecord: ServiceRecordInterface) => {
  const response = await axios.post('/api/service-records', serviceRecord);
  return response.data;
};

export const updateServiceRecordById = async (id: string, serviceRecord: ServiceRecordInterface) => {
  const response = await axios.put(`/api/service-records/${id}`, serviceRecord);
  return response.data;
};

export const getServiceRecordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/service-records/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServiceRecordById = async (id: string) => {
  const response = await axios.delete(`/api/service-records/${id}`);
  return response.data;
};
