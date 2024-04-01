import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';
import {
  getShopItems,
  getShopItemsFailure,
  getShopItemsSuccess,
  ShopData,
} from '../slices/shopPageSlice';
import { getShopPageItems } from '../apis/shopPageItems';

export function* getShopItemsSaga({
  payload,
}: ActionType<typeof getShopItems>) {
  try {
    const result: ShopData = yield call(getShopPageItems, payload);
    yield put(getShopItemsSuccess(result));
  } catch (error) {
    yield put(getShopItemsFailure(error as string));
  }
}

export function* watchShopGetItems() {
  yield takeLatest(getType(getShopItems), getShopItemsSaga);
}
