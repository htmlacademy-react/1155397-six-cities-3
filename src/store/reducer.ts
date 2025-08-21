import { createReducer } from '@reduxjs/toolkit';
import { selectCity, updateOffers, sortOffers, loadingApp, updateAuthorization, initializeOffers, setCurrentOffer } from './action';
import { TCity, TDetailOffer, TOffers } from '../types/offers';
import { AuthorizationStatus, CITIES } from '../const';
import { TSortBy } from '../types/sort';
import { sortAndFilterOffers } from '../utils';
import { TReviews } from '../types/reviews';

type TinitialState = {
    city: TCity;
    initialOffers: TOffers;
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
  initialOffers: [],
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
      state.city = action.payload.city;
    })
    .addCase(updateOffers, (state) => {
      if (state.initialOffers) {
        state.offers = sortAndFilterOffers(state.city.name, state.initialOffers);
      }
    })
    .addCase(sortOffers, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(initializeOffers, (state, action) => {
      state.initialOffers = action.payload.offers;
    })
    .addCase(loadingApp, (state) => {
      state.isLoading = !state.isLoading;
    })
    .addCase(updateAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
    })
    .addCase(setCurrentOffer, (state,action) => {
      state.currentOffer = action.payload;
    });
});

export {reducer};
