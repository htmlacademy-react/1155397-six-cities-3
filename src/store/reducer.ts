import { createReducer } from '@reduxjs/toolkit';
import { selectCity, updateOffers } from './action';
import { TOffers } from '../types/offers';
import offers from '../mocks/offers';

type TinitialState = {
    selectedCity: string;
    offers: TOffers;
}

export const initialState: TinitialState = {
  selectedCity: 'Paris',
  offers,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
