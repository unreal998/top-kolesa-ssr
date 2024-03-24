import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from '@reduxjs/toolkit';
import {
  getFilterData,
  getFilterDataFailure,
  getFilterDataSuccess,
} from '../slices/filterSlice';
import { getFilterDataApi } from '../apis/filterData';
import { FilterParamsResponce } from '@/shared/types';

export function* getFilterDataSaga() {
  try {
    const result: FilterParamsResponce = yield call(getFilterDataApi);
    yield put(getFilterDataSuccess(result));
  } catch (error) {
    yield put(getFilterDataFailure(error as string));
  }
}

export function* watchFilterData() {
  yield takeLatest(getType(getFilterData), getFilterDataSaga);
}
