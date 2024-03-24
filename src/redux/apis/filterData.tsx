import { SERVER_URL } from '@/shared/keys';
import axios from 'axios';

export async function getFilterDataApi() {
  try {
    const response = await axios.get(`${SERVER_URL}/api/getFiterData`);

    return response.data;
  } catch (error) {
    const errData = error as string;
    throw new Error('getFiterData fail' + errData);
  }
}
