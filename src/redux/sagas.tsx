import { all } from 'redux-saga/effects';
import { watchFilterData } from './sagas/filterDataSaga';
import { watchShopGetItems } from './sagas/shopDataSaga';

export function* rootSaga() {
  yield all([watchFilterData(), watchShopGetItems()]);
}
