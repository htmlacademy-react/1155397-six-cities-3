import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import {
  initializeOffers,
  loadingApp,
  redirectToRoute,
  updateAuthorization,
  setCurrentOffer,
  setReviews,
  setNearbyOffers
} from './action';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { TOffers, TDetailOffer, TOffer } from '../types/offers';
import { TReviews, TReview } from '../types/reviews';
import { TAuth, TUser } from '../types/auth';
import { removeToken, saveToken } from '../services/token';
import { getRandomSubArray } from '../utils';
import { NearbyOffersCount } from '../const';

export const fetchOffers = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loadingApp());
    const {data} = await api.get<TOffers>(APIRoute.Offers);
    dispatch(initializeOffers({offers: data}));
    dispatch(loadingApp());
  }
);

export const checkAuthorization = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'checkAuthorization',
  async (_arg, {dispatch, extra: api}) => {
    try{
      await api.get(APIRoute.Login);
      dispatch(updateAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
    } catch {
      dispatch(updateAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
    }
  }
);

export const loginUser = createAsyncThunk<void, TAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loginUser',
  async ({ email, password }, {dispatch, extra: api}) => {
    try {
      const {data: { token } } = await api.post<TUser>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(updateAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(updateAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
    }
  }
);

export const logoutUser = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logoutUser',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(updateAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
  }
);

export const fetchOfferById = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferById',
  async (offerId, { dispatch, extra: api}) => {
    try {
      const { data } = await api.get<TDetailOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  });

export const fetchReviews = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchReviews',
    async (offerId, { dispatch, extra: api}) => {
      const { data } = await api.get<TReviews>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setReviews(data));
    });

export const fetchNewReview = createAsyncThunk<TReview | undefined, {
  offerId: string;
  comment: string;
  rating: number;
  disableForm: (status: boolean) => void;}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('loginUser', async ({ offerId, comment, rating, disableForm }, {extra: api}) => {
      try {
        const { data } = await api.post<TReview>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
        disableForm(true);
        return data;
      } catch {
        disableForm(false);
      }
    });

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferById',
  async (offerId, { dispatch, extra: api}) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers(getRandomSubArray<TOffer>(data, NearbyOffersCount)));
  });
