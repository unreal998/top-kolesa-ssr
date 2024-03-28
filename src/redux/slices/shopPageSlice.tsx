import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ShopItemAPI } from '../../shared/types';
import { sortItemsList } from '../utils';

export type ShopSliceStore = {
  [shopPageSlice.name]: shopPageReducerState;
};

export type ShopItem = {
  id: number;
  brand: string;
  name: string;
  width: string;
  height: number;
  diametr: string;
  imgName: string;
  rating: number;
  price: number;
  country: string;
  season: string;
  year: number;
  speed: string;
  weight: string;
  param: string;
};

export type ShopData = {
  tiresList: ShopItemAPI[];
};

export type SortParams = {
  showBy: number;
  sortBy: string;
};

type ShopPageState = {
  currentPage: number;
  itemsList: ShopItemAPI[];
  selectedItemId: string;
  cardView: boolean;
  sortParams: SortParams;
  isFullMenuOpen: boolean;
  activeTabIndex: number;
  searchInput: string;
  selectedVechileType: string;
  selectedWidth: string;
  selectedProfile: string;
  selectedDiametr: string;
  selectedPrice: number[];
  selectedSeason: string[];
  selectedBrand: string[];
  cartItemCount: number;
  selectedStudded: string;
  cartModalWindowOpen: boolean;
  isLoading: boolean;
};

export type FilterParams = {
  price?: string;
  width?: string;
  profile?: string;
  diametr?: string;
  season?: string;
  brand?: string;
  studded?: string;
  vechileType?: string;
};

const initialState: ShopPageState = {
  currentPage: 1,
  itemsList: [],
  selectedItemId: '',
  cardView: true,
  sortParams: {
    showBy: 20,
    sortBy: 'rated',
  },
  isFullMenuOpen: false,
  activeTabIndex: 0,
  searchInput: '',
  selectedWidth: '',
  selectedProfile: '',
  selectedDiametr: '',
  selectedVechileType: '',
  selectedPrice: [0, 0],
  selectedSeason: [],
  selectedBrand: [],
  cartItemCount: 0,
  selectedStudded: '',
  cartModalWindowOpen: false,
  isLoading: false,
};

export const shopPageSlice = createSlice({
  name: 'shopPageSliceData',
  initialState,
  reducers: {
    getShopItems(state, { payload }: PayloadAction<FilterParams | ''>) {
      state.isLoading = true;
    },
    getShopItemsSuccess(state, { payload }: PayloadAction<ShopData>) {
      state.itemsList = sortItemsList(
        state.sortParams.sortBy,
        payload.tiresList,
      );
      state.isLoading = false;
    },
    getShopItemsFailure(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
    },
    setSelectedItemId(state, { payload }: PayloadAction<string>) {
      state.selectedItemId = payload;
    },
    setCardView(state, { payload }: PayloadAction<boolean>) {
      state.cardView = payload;
    },
    setSortParams(state, { payload }: PayloadAction<SortParams>) {
      state.sortParams = payload;
      state.itemsList = sortItemsList(payload.sortBy, state.itemsList);
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    //FILTERS
    toggleFullMenu: (state, action: PayloadAction<number | undefined>) => {
      state.isFullMenuOpen = !state.isFullMenuOpen;
      if (action.payload !== undefined) {
        state.activeTabIndex = action.payload;
      }
    },
    setSearchInput: (
      state,
      action: PayloadAction<React.ChangeEvent<HTMLInputElement>>,
    ) => {
      const inputValue = action.payload.target.value;
      state.searchInput = inputValue;
    },
    setClearSearchInput(state) {
      state.searchInput = '';
    },
    setSelectedWidth(state, action: PayloadAction<string>) {
      state.selectedWidth = action.payload;
    },
    setClearSelectedWidth(state) {
      state.selectedWidth = '';
    },
    setSelectedProfile(state, action: PayloadAction<string>) {
      state.selectedProfile = action.payload;
    },
    setClearSelectedProfile(state) {
      state.selectedProfile = '';
    },
    setSelectedDiametr(state, action: PayloadAction<string>) {
      state.selectedDiametr = action.payload;
    },
    setClearSelectedDiametr(state) {
      state.selectedDiametr = '';
    },
    initializePriceRange: (state, action: PayloadAction<number[]>) => {
      state.selectedPrice = action.payload;
    },
    setPriceChange: (state, action: PayloadAction<number[]>) => {
      state.selectedPrice = action.payload;
    },
    setResetPriceRange: (state) => {
      state.selectedPrice = [0, 0];
    },
    setSeasonChange: (state, action: PayloadAction<string[]>) => {
      state.selectedSeason = action.payload;
    },
    setResetSeason: (state) => {
      state.selectedSeason = [];
    },
    setBrandChange: (state, action: PayloadAction<string[]>) => {
      state.selectedBrand = action.payload;
    },
    setResetBrand: (state) => {
      state.selectedBrand = [];
    },
    setCartItemCount: (state, action: PayloadAction<number>) => {
      state.cartItemCount = action.payload;
    },
    setResetCartItemCount: (state) => {
      state.cartItemCount = 0;
    },
    setStuddedChange: (state, action: PayloadAction<string>) => {
      state.selectedStudded = action.payload;
    },
    setVechileTypeChange: (state, action: PayloadAction<string>) => {
      state.selectedVechileType = action.payload;
    },
    setResetStudded: (state) => {
      state.selectedStudded = '';
    },
    setCartModalWindowOpen: (state, action: PayloadAction<boolean>) => {
      state.cartModalWindowOpen = action.payload;
    },
  },
});

export const selectSortParams =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    return shopPageSliceData?.sortParams;
  };

export const selectPagesCount =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    return Math.ceil(
      shopPageSliceData?.itemsList?.length /
        shopPageSliceData?.sortParams?.showBy,
    );
  };

export const selectCurrentPageItemList =
  () =>
  ({ shopPageSliceData }: ShopSliceStore) => {
    const prevPageValues =
      shopPageSliceData?.currentPage > 0
        ? (shopPageSliceData?.currentPage - 1) *
          shopPageSliceData?.sortParams?.showBy
        : 0;
    const newArray = shopPageSliceData?.itemsList.slice(
      prevPageValues,
      shopPageSliceData?.currentPage * shopPageSliceData?.sortParams?.showBy,
    );
    return newArray;
  };

export const selectCardView = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.cardView;

export const selectIsLoading = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.isLoading;

export const selectIsFullMenuOpen = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.isFullMenuOpen;

export const selectSelectedWidth = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedWidth;

export const selectActiveTabIndex = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.activeTabIndex;

export const selectSearchInput = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.searchInput;

export const selectSelectedProfile = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedProfile;

export const selectSelectedDiametr = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedDiametr;

export const selectSelectedPrice = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedPrice;

export const selectSelectedSeason = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedSeason;

export const selectSelectedBrand = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedBrand;

export const selectCartItemCount = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.cartItemCount;

export const selectSelectedStudded = ({ shopPageSliceData }: ShopSliceStore) =>
  shopPageSliceData?.selectedStudded;

export const selectSelectedVechileType = ({
  shopPageSliceData,
}: ShopSliceStore) => shopPageSliceData?.selectedVechileType;

export const selectCartModalWindowOpen = ({
  shopPageSliceData,
}: ShopSliceStore) => shopPageSliceData?.cartModalWindowOpen;

export const {
  getShopItems,
  getShopItemsSuccess,
  getShopItemsFailure,
  setSelectedItemId,
  setCardView,
  setSortParams,
  setCurrentPage,
  toggleFullMenu,
  setSearchInput,
  setClearSearchInput,
  setSelectedWidth,
  setClearSelectedWidth,
  setSelectedProfile,
  setClearSelectedProfile,
  setSelectedDiametr,
  setClearSelectedDiametr,
  initializePriceRange,
  setPriceChange,
  setResetPriceRange,
  setSeasonChange,
  setResetSeason,
  setBrandChange,
  setResetBrand,
  setCartItemCount,
  setResetCartItemCount,
  setStuddedChange,
  setVechileTypeChange,
  setResetStudded,
  setCartModalWindowOpen,
} = shopPageSlice.actions;

export type shopPageReducerState = typeof initialState;
