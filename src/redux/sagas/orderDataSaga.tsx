import { ActionType } from 'typesafe-actions';
import { getType } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { OrderData } from '@/shared/types';
import { fetchOrderData, fetchOrderDataFailed, fetchOrderDataSuccess } from '../slices/orderDataSlice';
import { fetchOrderDataApi } from '../apis/orderData';

export function* fetchOrderDataSaga({
  payload,
}: ActionType<typeof fetchOrderData>) {
  try {
    const orderData: OrderData = yield call(fetchOrderDataApi, payload);
    yield put(fetchOrderDataSuccess(orderData));
  } catch (error) {
    yield put(fetchOrderDataFailed(error as string));
  }
}

export function* watchOrderData() {
  yield takeLatest(getType(fetchOrderData), fetchOrderDataSaga);
}
