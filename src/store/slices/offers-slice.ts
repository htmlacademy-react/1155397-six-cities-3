import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCity, TOffers } from '../../types/offers';
import { TSortBy } from '../../types/sort';
import { CITIES } from '../../const';
import { fetchOffers } from '../thunks/offers';
import { State } from '../../types/state';
import { fetchFavorites, changeFavorite } from '../thunks/favorites';

type TOffersState = {
  city: TCity;
  offers: TOffers;
  favorites: TOffers;
  sortBy: TSortBy;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  city: CITIES[0],
  offers: [],
  favorites: [],
  sortBy: 'Popular',
  isLoading: false,
  isError: false,
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
    },
    clearFavorites: (state) => {
      state.favorites = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );

        if (updatedOffer.isFavorite) {
          if (!state.favorites.some((favorite) => favorite.id === updatedOffer.id)) {
            state.favorites.push(updatedOffer);
          } else {
            state.favorites = state.favorites.map((favorite) =>
              favorite.id === updatedOffer.id ? updatedOffer : favorite
            );
          }
        } else {
          state.favorites = state.favorites.filter((favorite) => favorite.id !== updatedOffer.id);
        }
      });
  }
});

const getOffers = (state: State) => state.offers.offers;
const getLoadingStatus = (state: State) => state.offers.isLoading;
const getCurrentCity = (state: State) => state.offers.city;
const getCurrentSort = (state: State) => state.offers.sortBy;
const getFavoriteOffers = (state: State) => state.offers.favorites;
const getErrorStatus = (state: State) => state.offers.isError;

const {changeCity, changeSort, clearFavorites } = offerSlice.actions;

export {
  offerSlice,
  getOffers,
  getLoadingStatus,
  getCurrentCity,
  changeCity,
  changeSort,
  getCurrentSort,
  getFavoriteOffers,
  getErrorStatus,
  clearFavorites
};
