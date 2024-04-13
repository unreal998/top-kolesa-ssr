import { all } from 'redux-saga/effects';
import { watchFilterData } from './sagas/filterDataSaga';
import { watchShopGetItems } from './sagas/shopDataSaga';
import { watchAdressByInputSaga } from './sagas/checkoutDataSaga';
import { watchOrderData } from './sagas/orderDataSaga';
import { watchFilterDataMini } from './sagas/filterDataMiniSaga';

export function* rootSaga() {
  yield all([
    watchFilterData(),
    watchShopGetItems(),
    watchAdressByInputSaga(),
    watchOrderData(),
    watchFilterDataMini(),
  ]);
}
