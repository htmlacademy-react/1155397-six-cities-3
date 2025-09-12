import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { TCity, TOffers } from '../../types/offers';
import { TSortBy } from '../../types/sort';
import { CITIES } from '../../const';
import { fetchOffers } from '../thunks/offers';
import { State } from '../../types/state';
import { changeFavorite, fetchFavorites } from '../thunks/favorites';
import { SortDictionary } from '../../utils';

type TOffersState = {
  city: TCity;
  offers: TOffers;
  sortBy: TSortBy;
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  city: CITIES[0],
  offers: [],
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
    resetFavorites: (state) => {
      state.offers = state.offers.map((offer) => ({ ...offer, isFavorite: false }));
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
      .addCase(changeFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updated.id ? { ...offer, isFavorite: updated.isFavorite } : offer
        );
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        const favorites = action.payload || [];
        const favoritesId = new Set(favorites.map((favorite) => favorite.id));

        if (state.offers.length > 0) {
          state.offers = state.offers.map((offer) => ({
            ...offer,
            isFavorite: favoritesId.has(offer.id),
          }));
        }
      });
  }
});

const getOffers = (state: State) => state.offers.offers;
const getLoadingStatus = (state: State) => state.offers.isLoading;
const getCurrentCity = (state: State) => state.offers.city;
const getCurrentSort = (state: State) => state.offers.sortBy;
const getErrorStatus = (state: State) => state.offers.isError;

const getCityOffers = createSelector(
  [getOffers, getCurrentCity],
  (offers, currentCity) => offers.filter(({ city }) => city.name === currentCity.name)
);

export const getSortedCityOffers = createSelector(
  [getCityOffers, getCurrentSort],
  (cityOffers, currentSort) => {
    if (currentSort === 'Popular') {
      return cityOffers;
    }
    return [...cityOffers].sort(SortDictionary[currentSort]);
  }
);

const {changeCity, changeSort, resetFavorites } = offerSlice.actions;

export {
  offerSlice,
  getOffers,
  getLoadingStatus,
  getCurrentCity,
  changeCity,
  changeSort,
  getCurrentSort,
  getErrorStatus,
  getCityOffers,
  resetFavorites
};
