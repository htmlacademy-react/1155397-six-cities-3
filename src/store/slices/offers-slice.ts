import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCity, TOffers } from '../../types/offers';
import { TSortBy } from '../../types/sort';
import { CITIES } from '../../const';
import { fetchOffers } from '../thunks/offers';
import { State } from '../../types/state';

type TOffersState = {
  city: TCity;
  offers: TOffers;
  sortBy: TSortBy;
  isLoading: boolean;
}

const initialState = {
  city: CITIES[0],
  offers: [],
  sortBy: 'Popular',
  isLoading: false,
} as TOffersState;

const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<TCity>) => {
      state.city = action.payload;
    },
    changeSort: (state, action: PayloadAction<TSortBy>) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

const getOffers = (state: State) => state.offers.offers;
const getLoadingStatus = (state: State) => state.offers.isLoading;
const getCurrentCity = (state: State) => state.offers.city;
const getCurrentSort = (state: State) => state.offers.sortBy;
const {changeCity, changeSort } = offerSlice.actions;

export {offerSlice, getOffers, getLoadingStatus, getCurrentCity, changeCity, changeSort, getCurrentSort};
