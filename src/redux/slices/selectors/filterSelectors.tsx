import { filterReducerState, filterSlice } from '../filterSlice';
import { ShopSliceStore } from '../shopPageSlice';

export type FilterSliceStore = {
  [filterSlice.name]: filterReducerState;
};

export const selectFilterData =
  () =>
  ({ filterSliceData }: FilterSliceStore) => {
    return filterSliceData.filtersParams;
  };
