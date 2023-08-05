import axios from 'axios';
import queryString from 'query-string';
import { SalesRecordInterface, SalesRecordGetQueryInterface } from 'interfaces/sales-record';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSalesRecords = async (
  query?: SalesRecordGetQueryInterface,
): Promise<PaginatedInterface<SalesRecordInterface>> => {
  const response = await axios.get('/api/sales-records', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSalesRecord = async (salesRecord: SalesRecordInterface) => {
  const response = await axios.post('/api/sales-records', salesRecord);
  return response.data;
};

export const updateSalesRecordById = async (id: string, salesRecord: SalesRecordInterface) => {
  const response = await axios.put(`/api/sales-records/${id}`, salesRecord);
  return response.data;
};

export const getSalesRecordById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales-records/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalesRecordById = async (id: string) => {
  const response = await axios.delete(`/api/sales-records/${id}`);
  return response.data;
};
