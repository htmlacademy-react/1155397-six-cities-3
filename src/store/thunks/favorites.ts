import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { AxiosInstance } from 'axios';
import { TOffers, TOffer } from '../../types/offers';
import { State } from '../../types/state';

type TChangeFavoriteArgs = {
  offerId: string;
  status: number;
};

export const fetchFavorites = createAsyncThunk<TOffers, undefined, {
  state: State;
  extra: AxiosInstance;
  }>(
    'favorites/fetchFavorites',
    async (_args, {extra: api}) => {
      const { data } = await api.get<TOffers>(APIRoute.Favorite);
      return data;
    });

export const changeFavorite = createAsyncThunk<TOffer, TChangeFavoriteArgs ,{
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/changeFavorite', async ({offerId, status}, {extra: api}) => {
    const { data } = await api.post<TOffer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return data;
  });
