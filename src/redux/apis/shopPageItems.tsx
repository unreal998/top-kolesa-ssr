import { SERVER_URL } from '@/shared/keys';
import axios, { AxiosResponse } from 'axios';
import { FilterParams } from '../slices/shopPageSlice';

export async function getShopPageItems(params: '' | FilterParams) {
  debugger
  let response: AxiosResponse<any, any>;
  if (params !== '') {
    const {
      price,
      width,
      profile,
      diametr,
      season,
      brand,
      studded,
      vechileType,
    } = params;
    response = await axios.get(
      `${SERVER_URL}/api/getShopData?price=${JSON.stringify(
        JSON.parse(price as string)[0],
      )}-${JSON.stringify(
        JSON.parse(price as string)[1],
      )}&width=${width}&profile=${profile}&diametr=${diametr}&season=${season}&brand=${brand}&studded=${studded}&vechileType=${
        vechileType || ''
      }`,
    );
    return response.data;
  } else {
    response = await axios.get(`${SERVER_URL}/api/getShopData`);
    return response.data;
  }
}
