import { SERVER_URL } from '@/shared/keys';
import axios from 'axios';

export async function getFilterDataMiniApi() {
  try {
    const response = await axios.get(`${SERVER_URL}/api/getFilterDataMini`);

    return response.data;
  } catch (error) {
    const errData = error as string;
    throw new Error('getFiterDataMini fail' + errData);
  }
}
