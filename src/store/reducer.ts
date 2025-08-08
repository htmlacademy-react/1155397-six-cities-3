import { createReducer } from '@reduxjs/toolkit';
import { selectCity, updateOffers, sortOffers, loadOffers, loadingApp, updateAuthorization } from './action';
import { TOffers, TCity } from '../types/offers';
import reviews from '../mocks/reviews';
import { AuthorizationStatus, CITIES } from '../const';
import { TReviews } from '../types/reviews';
import { TSortNames } from '../types/sort';

type TinitialState = {
    city: TCity;
    offers: TOffers;
    reviews: TReviews;
    sort: TSortNames;
    isLoading: boolean;
    authorizationStatus: AuthorizationStatus;
}

export const initialState: TinitialState = {
  city: CITIES[0],
  offers: [],
  reviews,
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
    .addCase(loadOffers, (state, action) => {
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
