import { createReducer } from '@reduxjs/toolkit';
import { selectCity, updateOffers, sortOffers, getOffers, loadingApp, updateAuthorization } from './action';
import { TOffers, TCity } from '../types/offers';
import { AuthorizationStatus, CITIES } from '../const';
import { TSortBy } from '../types/sort';

type TinitialState = {
    city: TCity;
    offers: TOffers | null;
    sort: TSortBy;
    isLoading: boolean;
    authorizationStatus: AuthorizationStatus;
}

export const initialState: TinitialState = {
  city: CITIES[1],
  offers: null,
  sort: 'Popular',
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadingApp, (state) => {
      state.isLoading = !state.isLoading;
    })
    .addCase(updateAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sort = action.payload;
    });
});

export {reducer};
