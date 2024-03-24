import { SERVER_URL } from '@/shared/keys';
import axios, { AxiosResponse } from 'axios';

export async function fetchOrderDataApi(orderId: string) {
  let response: AxiosResponse<any, any>;
  response = await axios.get(`${SERVER_URL}/api/getOrderData?id=${orderId}`);
  return response.data;
}
