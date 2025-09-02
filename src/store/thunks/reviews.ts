import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { AppDispatch, State } from '../../types/state';
import { TReviews, TReview } from '../../types/reviews';

export const fetchReviews = createAsyncThunk<TReviews, string, {
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchReviews',
    async (offerId, {extra: api}) => {
      const { data } = await api.get<TReviews>(`${APIRoute.Comments}/${offerId}`);
      return data;
    });

export const addNewReview = createAsyncThunk<TReview | undefined, {
  offerId: string;
  comment: string;
  rating: number;
  onSuccess: (successMessage: string) => void;
  onFail: (errorMessage: string) => void;
    }, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('loginUser', async ({ offerId, comment, rating, onSuccess, onFail }, {extra: api}) => {
      try {
        const { data } = await api.post<TReview>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
        const successMessage: string = 'Комментарий успешно отправлен!';
        onSuccess(successMessage);
        return data;
      } catch(error) {
        const errorMessage: string = 'Ошибка при отправке комментария';
        onFail(errorMessage);
      }
    });
