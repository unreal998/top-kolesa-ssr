import { SERVER_URL } from '@/shared/keys';
import axios from 'axios';

export async function getItemDataApi(itemId: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/api/getItemData?id=${itemId}`);

    return response.data;
  } catch (error) {
    const errData = error as string;
    throw new Error('getItemDataApi fail' + errData);
  }
}
