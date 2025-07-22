import { createReducer } from '@reduxjs/toolkit';
import { selectCity, updateOffers, sortOffers } from './action';
import { TOffers, TCity } from '../types/offers';
import offers from '../mocks/offers';
import reviews from '../mocks/reviews';
import { CITIES } from '../const';
import { TReviews } from '../types/reviews';
import { TSortNames } from '../types/sort';

type TinitialState = {
    city: TCity;
    offers: TOffers;
    reviews: TReviews;
    sort: TSortNames;
}

export const initialState: TinitialState = {
  city: CITIES[0],
  offers,
  reviews,
  sort: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
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
