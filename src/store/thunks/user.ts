import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { TUser, TAuth } from '../../types/auth';
import { APIRoute } from '../../const';
import { saveToken, removeToken } from '../../services/token';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

export const checkAuthorization = createAsyncThunk< TUser, undefined, {
  state: State;
  extra: AxiosInstance;
}> (
  'checkAuthorization', async (_arg, {extra: api}) => {
    const {data} = await api.get<TUser>(APIRoute.Login);
    return data;
  });

export const loginUser = createAsyncThunk<TUser, TAuth, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loginUser', async ({ email, password }, {dispatch, extra: api}) => {
    const { data } = await api.post<TUser>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  });

export const logoutUser = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'logoutUser', async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    removeToken();
  }
);
