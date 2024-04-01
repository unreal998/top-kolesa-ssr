import { ActionType } from 'typesafe-actions';
import { getType } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  BuyItemResponce,
  CityListResponce,
  WarehouseListResponce,
} from '@/shared/types';
import { fetchItemBuy } from '../apis/itemBuy';
import {
  fetchBuyItemAction,
  fetchBuyItemActionFailed,
  fetchBuyItemActionSuccess,
  fetchCityListByInput,
  fetchCityListByInputFailed,
  fetchCityListByInputSuccess,
  fetchWarehouseListByInput,
  fetchWarehouseListByInputFailed,
  fetchWarehouseListByInputSuccess,
} from '../slices/checkoutPageSlice';
import { fetchCityByInput, fetchWarehouseByInput } from '../apis/checkoutData';

export function* fetchCityByInputSaga({
  payload,
}: ActionType<typeof fetchCityListByInput>) {
  try {
    const result: CityListResponce = yield call(fetchCityByInput, payload);
    yield put(fetchCityListByInputSuccess(result));
  } catch (error) {
    yield put(fetchCityListByInputFailed(error as string));
  }
}

export function* fetchWarehouseByInputSaga({
  payload,
}: ActionType<typeof fetchWarehouseListByInput>) {
  try {
    const result: WarehouseListResponce = yield call(
      fetchWarehouseByInput,
      payload,
    );
    yield put(fetchWarehouseListByInputSuccess(result));
  } catch (error) {
    yield put(fetchWarehouseListByInputFailed(error as string));
  }
}

export function* fetchBuyItemSaga({
  payload,
}: ActionType<typeof fetchBuyItemAction>) {
  try {
    const orderId: BuyItemResponce = yield call(fetchItemBuy, payload);
    yield put(fetchBuyItemActionSuccess(orderId));
  } catch (error) {
    yield put(fetchBuyItemActionFailed(error as string));
  }
}

export function* watchAdressByInputSaga() {
  yield takeLatest(getType(fetchCityListByInput), fetchCityByInputSaga);
  yield takeLatest(
    getType(fetchWarehouseListByInput),
    fetchWarehouseByInputSaga,
  );
  yield takeLatest(getType(fetchBuyItemAction), fetchBuyItemSaga);
}
