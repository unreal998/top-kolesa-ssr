import axios from 'axios';

export async function getResourcesData() {
  try {
    const response = await axios.get('https://www.boredapi.com/api/activity');

    return response.data;
  } catch (error) {
    throw new Error('getResourcesData fail');
  }
}
