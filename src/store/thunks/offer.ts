import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { TDetailOffer, TOffers } from '../../types/offers';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';

export const fetchOfferById = createAsyncThunk<TDetailOffer, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferById',
  async (offerId, {extra: api}) => {
    const { data } = await api.get<TDetailOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  });

export const fetchNearbyOffers = createAsyncThunk<TOffers, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearbyOffers',
  async (offerId, { extra: api}) => {
    const { data } = await api.get<TOffers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  });
