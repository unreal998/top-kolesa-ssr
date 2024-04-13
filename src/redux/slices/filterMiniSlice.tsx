import { FilterParamsResponceMini } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  filtersParams: FilterParamsResponceMini;
};

const initialState: FilterState = {
  filtersParams: {
    width: [],
    diametr: [],
    height: [],
    brands: [],
  },
};

export const filterMiniSlice = createSlice({
  name: 'filterSliceDataMini',
  initialState,
  reducers: {
    getFilterDataMini(state) {},
    getFilterDataMiniSuccess(
      state,
      { payload }: PayloadAction<FilterParamsResponceMini>,
    ) {
      state.filtersParams = { ...payload };
    },
    getFilterDataMiniFailure(state, { payload }: PayloadAction<string>) {
      console.log(payload);
    },
  },
});

export const {
  getFilterDataMiniSuccess,
  getFilterDataMini,
  getFilterDataMiniFailure,
} = filterMiniSlice.actions;

export default filterMiniSlice.reducer;

export type filterReducerState = typeof initialState;
