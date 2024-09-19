import { SERVER_URL } from '@/shared/keys';
import axios, { AxiosResponse } from 'axios';
import { FilterParams } from '../slices/shopPageSlice';

export async function getShopPageItems(params: '' | FilterParams) {
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

    const priceRange = JSON.parse(price as string);

    response = await axios.get(
      `${SERVER_URL}/api/getShopData?price=${encodeURIComponent(
        priceRange[0],
      )}-${encodeURIComponent(
        priceRange[1],
      )}&width=${encodeURIComponent(width)}&profile=${encodeURIComponent(profile)}&diametr=${encodeURIComponent(diametr)}&season=${encodeURIComponent(season)}&brand=${encodeURIComponent(brand)}&studded=${encodeURIComponent(studded)}&vechileType=${encodeURIComponent(vechileType || '')}`,
    );
    return response.data;
  } else {
    response = await axios.get(`${SERVER_URL}/api/getShopData`);
    return response.data;
  }
}
