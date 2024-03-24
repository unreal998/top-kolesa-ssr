import { SERVER_URL } from '@/shared/keys';
import { OrderItemProps } from '@/shared/types';
import axios, { AxiosResponse } from 'axios';

export async function fetchItemBuy(itemData: OrderItemProps[]) {
  const response: AxiosResponse<any, any> = await axios.post(
    `${SERVER_URL}/api/createOrder`,
    itemData,
  );
  return response.data;
}
