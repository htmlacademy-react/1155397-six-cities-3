import { createAction } from '@reduxjs/toolkit';
import { TOffers, TCity } from '../types/offers';
import { TSortNames } from '../types/sort';
import { AuthorizationStatus, RoutePath } from '../const';

export const selectCity = createAction<TCity>('selectCity');
export const updateOffers = createAction<TOffers>('updateOffers');
export const sortOffers = createAction<TSortNames>('sortOffers');
export const loadOffers = createAction<TOffers>('data/loadOffers');
export const loadingApp = createAction('loadingApp');
export const updateAuthorization = createAction<{authorizationStatus: AuthorizationStatus}>('authorizationStatus');
export const redirectToRoute = createAction<RoutePath>('redirectToRoute');
