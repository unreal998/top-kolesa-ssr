import { FilterParamsResponce } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  filtersParams: FilterParamsResponce;
};

const initialState: FilterState = {
  filtersParams: {
    width: [],
    diametr: [],
    height: [],
    speed: [],
    weight: [],
    brands: [],
    prices: [],
    vechileType: [],
  },
};

export const filterSlice = createSlice({
  name: 'filterSliceData',
  initialState,
  reducers: {
    getFilterData(state) {},
    getFilterDataSuccess(state, { payload }: PayloadAction<FilterParamsResponce>) {
      state.filtersParams = { ...payload };
    },
    getFilterDataFailure(state, { payload }: PayloadAction<string>) {
      console.log(payload);
    },
  },
});

export const { getFilterDataSuccess, getFilterData, getFilterDataFailure } = filterSlice.actions;

export default filterSlice.reducer;

export type filterReducerState = typeof initialState;