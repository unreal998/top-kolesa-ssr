import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from '@reduxjs/toolkit';
import {
  getFilterDataMini,
  getFilterDataMiniFailure,
  getFilterDataMiniSuccess,
} from '../slices/filterMiniSlice';
import { getFilterDataMiniApi } from '../apis/filterDataMini';
import { FilterParamsResponce } from '@/shared/types';

export function* getFilterDataSaga() {
  try {
    const result: FilterParamsResponce = yield call(getFilterDataMiniApi);
    yield put(getFilterDataMiniSuccess(result));
  } catch (error) {
    yield put(getFilterDataMiniFailure(error as string));
  }
}

export function* watchFilterDataMini() {
  yield takeLatest(getType(getFilterDataMini), getFilterDataSaga);
}
