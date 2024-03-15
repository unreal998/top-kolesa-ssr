import { ICard } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

type CardState = {
  cardDetails: ICard;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: CardState = {
  cardDetails: {
    activity: '',
    type: '',
    participants: 0,
    price: 0,
    link: '',
    key: '',
    accessibility: 0,
  },
  isLoading: false,
  errorMessage: '',
};

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCardData(state) {
      state.isLoading = true;
    },
    getCardDataSuccess(state, { payload }: { payload: ICard }) {
      state.cardDetails = payload;
      state.isLoading = false;
    },
    getCardDataFailed(state, { payload }: { payload: string }) {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const { getCardDataSuccess, getCardData, getCardDataFailed } =
  cardSlice.actions;

export default cardSlice.reducer;
