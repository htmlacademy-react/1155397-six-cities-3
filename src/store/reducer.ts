import { createReducer } from '@reduxjs/toolkit';
import { selectCity, updateOffers } from './action';
import { TOffers, TCity } from '../types/offers';
import offers from '../mocks/offers';
import reviews from '../mocks/reviews';
import { CITIES } from '../const';
import { TReviews } from '../types/reviews';

type TinitialState = {
    city: TCity;
    offers: TOffers;
    reviews: TReviews;
}

export const initialState: TinitialState = {
  city: CITIES[0],
  offers,
  reviews,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
