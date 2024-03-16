import { all } from 'redux-saga/effects';
import { watchCardData } from './sagas/cardDataSaga';

export function* rootSaga() {
  yield all([watchCardData()]);
}
