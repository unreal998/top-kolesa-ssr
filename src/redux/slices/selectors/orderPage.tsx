import { orderReducerState, orderSlice } from '../orderDataSlice';

export type OrderSliceStore = {
  [orderSlice.name]: orderReducerState;
};

export const selectOrderData =
  () =>
  ({ orderSliceData }: OrderSliceStore) => {
    return orderSliceData?.orderData;
  };
