import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { loadOffers, loadingApp } from './action';
import { APIRoute } from '../const';
import { TOffers } from '../types/offers';

export const fetchOffers = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loadingApp());
    const {data} = await api.get<TOffers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(loadingApp());
  }
);
