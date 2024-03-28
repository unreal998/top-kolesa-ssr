import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { filterSlice } from './slices/filterSlice';
import { shopPageSlice } from './slices/shopPageSlice';

const slices = [filterSlice, shopPageSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});

export type AppSate = StateType<typeof rootReducer>;
