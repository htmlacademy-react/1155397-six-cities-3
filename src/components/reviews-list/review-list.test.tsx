import { render, screen } from '@testing-library/react';
import ReviewsList from './rewies-list';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TReview } from '../../types/reviews';

const testReviews: TReview[] = [
  {
    id: '1',
    comment: 'Nice place',
    date: '2023-06-15T12:00:00.000Z',
    rating: 4,
    user: {
      name: 'Alice',
      avatarUrl: '/img/avatar1.jpg',
      isPro: false,
    }
  },
  {
    id: '2',
    comment: 'Amazing!',
    date: '2023-06-16T12:00:00.000Z',
    rating: 5,
    user: {
      name: 'Bob',
      avatarUrl: '/img/avatar2.jpg',
      isPro: true,
    }
  }
];

const testReviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: testReviews,
    isSubmittingStatus: false,
  },
  reducers: {}
});

describe('Component: ReviewsList', () => {
  it('should render reviews count and list', () => {
    const store = configureStore({
      reducer: { reviews: testReviewsSlice.reducer }
    });

    render(
      <Provider store={store}>
        <ReviewsList offerId="123" />
      </Provider>
    );

    const title = screen.getByText(/Reviews/i);
    const comment1 = screen.getByText(/Nice place/i);
    const comment2 = screen.getByText(/Amazing!/i);

    expect(title).toBeTruthy();
    expect(comment1).toBeTruthy();
    expect(comment2).toBeTruthy();
  });
});
