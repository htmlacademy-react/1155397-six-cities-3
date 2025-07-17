import { createAction } from '@reduxjs/toolkit';
import { TOffers, TCity } from '../types/offers';
import { TSortNames } from '../types/sort';

export const selectCity = createAction<TCity>('selectCity');
export const updateOffers = createAction<TOffers>('updateOffers');
export const sortOffers = createAction<TSortNames>('sortOffers');
