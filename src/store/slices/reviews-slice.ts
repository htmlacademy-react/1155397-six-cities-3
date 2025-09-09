import { createSlice, createSelector } from '@reduxjs/toolkit';
import { TReviews } from '../../types/reviews';
import { fetchReviews, addNewReview } from '../thunks/reviews';
import { State } from '../../types/state';
import { sortReviewsByDate } from '../../utils';

export type TReviewsState = {
    reviews: TReviews;
    isSubmittingStatus: boolean;
};

const initialState: TReviewsState = {
  reviews: [],
  isSubmittingStatus: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addNewReview.pending, (state) => {
        state.isSubmittingStatus = true;
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        if(action.payload) {
          state.reviews.push(action.payload);
          state.isSubmittingStatus = false;
        }
      })
      .addCase(addNewReview.rejected, (state) => {
        state.isSubmittingStatus = false;
      });
  }
});

const getReviews = (state: State): TReviews => state.reviews.reviews;
const getReviewSubmittingStatus = (state: State) => state.reviews.isSubmittingStatus;
const getSortedReviews = createSelector([getReviews], (reviews) => sortReviewsByDate(reviews));

export {reviewsSlice, getReviews, getReviewSubmittingStatus, getSortedReviews};
