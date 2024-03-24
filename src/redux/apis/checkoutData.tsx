import { API_KEY, NOVA_POSHTA_API } from '@/shared/keys';
import axios, { AxiosResponse } from 'axios';

type WarehouseListData = {
  Ref: string;
  Description: string;
  DescriptionRu: string;
};

export async function fetchCityByInput(inputValue: string) {
  let response: AxiosResponse<any, any>;
  response = await axios.post(`${NOVA_POSHTA_API}/`, {
    apiKey: `${API_KEY}`,
    modelName: 'Address',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName: inputValue,
      Limit: '50',
      Page: '1',
    },
  });
  return response.data;
}

async function fetchWarehouseTypes() {
  let response: AxiosResponse<any, any>;
  response = await axios.post(`${NOVA_POSHTA_API}/`, {
    apiKey: `${API_KEY}`,
    modelName: 'Address',
    calledMethod: 'getWarehouseTypes',
    methodProperties: {},
  });
  return response.data.data;
}

export async function fetchWarehouseByInput(inputValue: string) {
  let response: AxiosResponse<any, any>;
  const warehouseTypes = await fetchWarehouseTypes();
  const cargoWarehouse = warehouseTypes.find((item: WarehouseListData) => {
    return item.Description === 'Вантажне відділення';
  });
  response = await axios.post(`${NOVA_POSHTA_API}/`, {
    apiKey: `${API_KEY}`,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: inputValue,
      TypeOfWarehouseRef: cargoWarehouse.Ref,
    },
  });
  return response.data;
}
