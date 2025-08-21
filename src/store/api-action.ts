import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { initializeOffers, updateOffers, loadingApp, redirectToRoute, updateAuthorization, setCurrentOffer } from './action';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { TOffers, TDetailOffer } from '../types/offers';
import { TAuth, TUser } from '../types/auth';
import { removeToken, saveToken } from '../services/token';

export const uploadOffers = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'uploadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loadingApp());
    const {data} = await api.get<TOffers>(APIRoute.Offers);
    dispatch(initializeOffers({offers: data}));
    dispatch(updateOffers());
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
export const uploadOfferById = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'uploadOfferInfoById',
  async (offerId, { dispatch, extra: api}) => {
    try {
      const { data } = await api.get<TDetailOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setCurrentOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }

  });
