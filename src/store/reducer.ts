import { createReducer } from '@reduxjs/toolkit';
import { selectCity,
  sortOffers,
  loadingApp,
  updateAuthorization,
  initializeOffers,
  setCurrentOffer,
  setReviews,
  addNewReview } from './action';
import { TCity, TDetailOffer, TOffers } from '../types/offers';
import { AuthorizationStatus, CITIES } from '../const';
import { TSortBy } from '../types/sort';
import { TReviews } from '../types/reviews';

type TinitialState = {
    city: TCity;
    offers: TOffers;
    sort: TSortBy;
    isLoading: boolean;
    authorizationStatus: AuthorizationStatus;
    currentOffer: TDetailOffer | null;
    nearByOffers: TOffers;
    reviews: TReviews;
}

export const initialState: TinitialState = {
  city: CITIES[1],
  offers: [],
  sort: 'Popular',
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: null,
  nearByOffers: [],
  reviews: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(initializeOffers, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(loadingApp, (state) => {
      state.isLoading = !state.isLoading;
    })
    .addCase(updateAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
    })
    .addCase(setCurrentOffer, (state,action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setReviews, (state,action) => {
      state.reviews = action.payload;
    })
    .addCase(addNewReview, (state, action) => {
      if (state.reviews) {
        state.reviews.push(action.payload);
      } else {
        state.reviews = [action.payload];
      }
    });
});

export {reducer};
