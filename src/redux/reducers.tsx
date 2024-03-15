import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { cardSlice } from './slices/cardSlice';

const slices = [cardSlice];

const toolkitReducers = Object.fromEntries(
  slices.map(({ name, reducer }) => [name, reducer]),
);

export const rootReducer = combineReducers({
  ...toolkitReducers,
});

export type AppSate = StateType<typeof rootReducer>;
