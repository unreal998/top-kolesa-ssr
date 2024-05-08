import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from '@reduxjs/toolkit';
import { ActionType } from 'typesafe-actions';
import {
  getCartItems,
  getCartItemsFailure,
  getCartItemsSuccess,
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

export function* getCartItemsSaga({
  payload,
}: ActionType<typeof getCartItems>) {
  try {
    const result: ShopData = yield call(getShopPageItems, payload);
    yield put(getCartItemsSuccess(result));
  } catch (error) {
    yield put(getCartItemsFailure(error as string));
  }
}

export function* watchShopGetItems() {
  yield takeLatest(getType(getShopItems), getShopItemsSaga);
  yield takeLatest(getType(getCartItems), getCartItemsSaga);
}
