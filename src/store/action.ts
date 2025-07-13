import { createAction } from '@reduxjs/toolkit';
import { TOffers, TCity } from '../types/offers';

export const selectCity = createAction<TCity>('selectCity');
export const updateOffers = createAction<TOffers>('updateOffers');
