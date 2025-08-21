import { createAction } from '@reduxjs/toolkit';
import { TCity, TOffers, TDetailOffer } from '../types/offers';
import { TSortBy } from '../types/sort';
import { AuthorizationStatus, AppRoute } from '../const';
import { TReviews } from '../types/reviews';

export const loadingApp = createAction('loadingApp');
export const updateOffers = createAction('uploadOffers');
export const initializeOffers = createAction<{offers: TOffers}>('initializeOffers');
export const selectCity = createAction<{city: TCity}>('selectCity');
export const sortOffers = createAction<TSortBy>('sortOffers');
export const updateAuthorization = createAction<{authorizationStatus: AuthorizationStatus}>('authorizationStatus');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
export const setCurrentOffer = createAction<TDetailOffer>('setCurrentOffer');
export const setNearbyOffers = createAction<TOffers>('setNearbyOffers');
export const setReviews = createAction<TReviews>('setReviews');
