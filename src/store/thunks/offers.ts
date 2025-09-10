import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { TOffers } from '../../types/offers';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';

export const fetchOffers = createAsyncThunk<TOffers, undefined, {
    state: State;
    extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<TOffers>(APIRoute.Offers);
    return data;
  }
);
