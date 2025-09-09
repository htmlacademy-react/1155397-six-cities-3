import { describe, it, expect } from 'vitest';
import { reviewsSlice, getReviews, getReviewSubmittingStatus, getSortedReviews, TReviewsState } from '../slices/reviews-slice';
import { fetchReviews, addNewReview } from '../thunks/reviews';
import { sortReviewsByDate } from '../../utils';
import { TReviews, TReview } from '../../types/reviews';
import { State } from '../../types/state';

const testReviews: TReviews = [
  {
    id: '1',
    comment: 'Test review 1',
    rating: 4,
    date: '2023-01-01T00:00:00.000Z',
    user: {
      name: 'Test user 1',
      avatarUrl: 'https://example.com/avatar1.jpg',
      isPro: false,
    },
  },
  {
    id: '2',
    comment: 'Test review 2',
    rating: 2,
    date: '2023-02-01T00:00:00.000Z',
    user: {
      name: 'Test user 2',
      avatarUrl: 'https://example.com/avatar2.jpg',
      isPro: true,
    },
  },
];


type TestReviewState = Pick<State, 'reviews'>;

describe('reviewsSlice', () => {
  const initialState: TReviewsState = {
    reviews: [],
    isSubmittingStatus: false,
  };

  it('Should return Initial state', () => {
    expect(reviewsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('fetchReviews.fulfilled - Should return reviews', () => {
    const action = { type: fetchReviews.fulfilled.type, payload: testReviews };
    const state = reviewsSlice.reducer(initialState, action);
    expect(state.reviews).toEqual(testReviews);
    expect(state.isSubmittingStatus).toBe(false);
  });

  it('addNewReview.pending - Should return submiting status = true', () => {
    const action = { type: addNewReview.pending.type };
    const state = reviewsSlice.reducer(initialState, action);
    expect(state.isSubmittingStatus).toBe(true);
  });

  it('addNewReview.fulfilled - Should return new review reset submiting status', () => {
    const newReview: TReview = {
      id: '3',
      comment: 'Test review 3',
      rating: 3,
      date: '2023-03-01T00:00:00.000Z',
      user: {
        name: 'Test user 3',
        avatarUrl: 'https://example.com/avatar3.jpg',
        isPro: false,
      },
    };

    const prevState: TReviewsState = {
      reviews: [...testReviews],
      isSubmittingStatus: true,
    };
    const action = { type: addNewReview.fulfilled.type, payload: newReview };
    const state = reviewsSlice.reducer(prevState, action);

    expect(state.reviews).toContainEqual(newReview);
    expect(state.isSubmittingStatus).toBe(false);
  });

  it('addNewReview.rejected - Should return reset submiting status', () => {
    const prevState: TReviewsState = { reviews: [], isSubmittingStatus: true };
    const action = { type: addNewReview.rejected.type };
    const state = reviewsSlice.reducer(prevState, action);
    expect(state.isSubmittingStatus).toBe(false);
  });

  describe('selectors', () => {
    it('getReviews - Should return review list', () => {
      const state: TestReviewState = {
        reviews: {
          reviews: testReviews,
          isSubmittingStatus: false,
        },
      };
      expect(getReviews(state as State)).toEqual(testReviews);
    });

    it('getReviewSubmittingStatus - Should return submitting status = true', () => {
      const state: TestReviewState = {
        reviews: {
          reviews: [],
          isSubmittingStatus: true,
        },
      };
      expect(getReviewSubmittingStatus(state as State)).toBe(true);
    });

    it('getSortedReviews - Should return sorted reviews', () => {
      const state: TestReviewState = {
        reviews: {
          reviews: testReviews,
          isSubmittingStatus: false,
        },
      };
      const sorted = getSortedReviews(state as State);
      expect(sorted).toEqual(sortReviewsByDate(testReviews));
    });
  });
});
