import { createAction } from '@reduxjs/toolkit';
import { TOffers, TCity } from '../types/offers';
import { TSortBy } from '../types/sort';
import { AuthorizationStatus, AppRoute } from '../const';

export const loadingApp = createAction('loadingApp');
export const getOffers = createAction<TOffers>('getOffers');
export const updateOffers = createAction<TOffers>('updateOffers');
export const selectCity = createAction<TCity>('selectCity');
export const sortOffers = createAction<TSortBy>('sortOffers');
export const updateAuthorization = createAction<{authorizationStatus: AuthorizationStatus}>('authorizationStatus');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
