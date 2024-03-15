import { call, put, takeLatest } from 'redux-saga/effects';
import { getResourcesData } from '../apis/cardApi';
import { getType } from '@reduxjs/toolkit';
import {
  getCardData,
  getCardDataFailed,
  getCardDataSuccess,
} from '../slices/cardSlice';
import { ICard } from '@/shared/types';

export function* getResources() {
  try {
    const result: ICard = yield call(getResourcesData);
    yield put(getCardDataSuccess(result));
  } catch (error) {
    yield put(getCardDataFailed(error as string));
  }
}

export function* watchCardData() {
  yield takeLatest(getType(getCardData), getResources);
}
