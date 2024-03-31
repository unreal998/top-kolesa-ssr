import { checkoutReducerState, checkoutSlice } from '../checkoutPageSlice';

export type CheckoutSliceStore = {
  [checkoutSlice.name]: checkoutReducerState;
};

export const selectCityListData =
  () =>
  ({ checkoutSliceData }: CheckoutSliceStore) => {
    return checkoutSliceData?.cityData;
  };

export const selectWarehoutListData =
  () =>
  ({ checkoutSliceData }: CheckoutSliceStore) => {
    return checkoutSliceData?.warehouseData;
  };

export const selectFetchedCityName =
  () =>
  ({ checkoutSliceData }: CheckoutSliceStore) => {
    return checkoutSliceData?.cityDataResponce?.Addresses[0]?.MainDescription;
  };

export const selectCreatedOrderId =
  () =>
  ({ checkoutSliceData }: CheckoutSliceStore) => {
    return checkoutSliceData?.createdOrderId;
  };
