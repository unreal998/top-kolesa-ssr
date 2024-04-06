import { filterReducerState, filterMiniSlice } from '../filterMiniSlice';

export type FilterSliceStore = {
  [filterMiniSlice.name]: filterReducerState;
};

export const selectFilterMiniData = () => (state: FilterSliceStore) => {
  return state[filterMiniSlice.name].filtersParams;
};
