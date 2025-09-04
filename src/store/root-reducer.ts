import { combineReducers } from '@reduxjs/toolkit';
import { offerSlice } from './slices/offers-slice';
import { detailOfferSlice } from './slices/offer-slice';
import { userSlice } from './slices/user-slice';
import { reviewsSlice } from './slices/reviews-slice';
import { favoriteSlice } from './slices/favorite-slice';

export const rootReducer = combineReducers({
  [offerSlice.name]: offerSlice.reducer,
  [detailOfferSlice.name]: detailOfferSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
});
