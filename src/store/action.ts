import { createAction } from '@reduxjs/toolkit';
import { TOffers } from '../types/offers';

export const selectCity = createAction<string>('selectCity');
export const updateOffers = createAction<TOffers>('updateOffers');
