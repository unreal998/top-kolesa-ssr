import { filterReducerState, filterSlice } from "../filterSlice";

export type FilterSliceStore = {
  [filterSlice.name]: filterReducerState;
};

export const selectFilterData =
  () =>
  ({ filterSliceData }: FilterSliceStore) => {
    return filterSliceData.filtersParams;
  };
