import { AutocompleateData, BuyItemResponce, CityListResponce, CityListResponceData, OrderItemProps, WarehouseListResponce } from '@/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CheckoutPage = {
  cityInputData: string;
  warehouseInputData: string;
  cityData: AutocompleateData[];
  warehouseData: AutocompleateData[];
  error: string;
  createdOrderId: string;
  cityDataResponce: CityListResponceData;
};

const initialState: CheckoutPage = {
  cityInputData: '',
  warehouseInputData: '',
  cityData: [],
  warehouseData: [],
  error: '',
  cityDataResponce: {
    TotalCount: 0,
    Addresses: [],
  },
  createdOrderId: '',
};

export const checkoutSlice = createSlice({
  name: 'checkoutSliceData',
  initialState,
  reducers: {
    fetchCityListByInput(state, { payload }: PayloadAction<string>) {
      state.cityInputData = payload;
    },
    fetchCityListByInputSuccess(
      state,
      { payload }: PayloadAction<CityListResponce>,
    ) {
      state.cityDataResponce = payload.data[0];
      state.cityData = payload.data[0].Addresses.map((item) => {
        return { title: item.Present };
      });
    },
    fetchCityListByInputFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    fetchWarehouseListByInput(state, { payload }: PayloadAction<string>) {
      state.warehouseInputData = payload;
    },
    fetchWarehouseListByInputSuccess(
      state,
      { payload }: PayloadAction<WarehouseListResponce>,
    ) {
      state.warehouseData = payload.data.map((item) => {
        return { title: item.Description };
      });
    },
    fetchWarehouseListByInputFailed(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
    fetchBuyItemAction(state, { payload }: PayloadAction<OrderItemProps[]>) {},
    fetchBuyItemActionSuccess(
      state,
      { payload }: PayloadAction<BuyItemResponce>,
    ) {
      state.createdOrderId = payload.orderId.toString();
    },
    fetchBuyItemActionFailed(state, { payload }: PayloadAction<string>) {},
  },
});

export const { 
    fetchCityListByInput, 
    fetchCityListByInputSuccess, 
    fetchCityListByInputFailed,
    fetchWarehouseListByInput,
    fetchWarehouseListByInputSuccess,
    fetchWarehouseListByInputFailed,
    fetchBuyItemAction,
    fetchBuyItemActionSuccess,
    fetchBuyItemActionFailed
} = checkoutSlice.actions;

export type checkoutReducerState = typeof initialState;
