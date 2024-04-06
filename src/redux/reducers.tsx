import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { filterSlice } from './slices/filterSlice';
import { shopPageSlice } from './slices/shopPageSlice';
import { orderSlice } from './slices/orderDataSlice';
import { checkoutSlice } from './slices/checkoutPageSlice';
import { filterMiniSlice } from './slices/filterMiniSlice';

const slices = [
  filterSlice,
  shopPageSlice,
  orderSlice,
  checkoutSlice,
  filterMiniSlice,
];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});

export type AppSate = StateType<typeof rootReducer>;
