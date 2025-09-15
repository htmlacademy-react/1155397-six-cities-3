import { render, screen } from '@testing-library/react';
import Review from './review';
import { describe, expect, it } from 'vitest';
import { TReview } from '../../types/reviews';

const testReview: TReview = {
  id: '1',
  comment: 'User comment',
  date: '2023-06-15T12:00:00.000Z',
  rating: 4,
  user: {
    name: 'Test User',
    avatarUrl: '/img/avatar.jpg',
    isPro: false
  }
};

describe('Component: Review', () => {
  it('should render user name and comment', () => {
    render(<Review review={testReview} />);

    const userName = screen.getByText(/Test User/i);
    const comment = screen.getByText(/User comment/i);

    expect(userName).toBeTruthy();
    expect(comment).toBeTruthy();
  });

  it('should render formatted date', () => {
    render(<Review review={testReview} />);

    const dateElement = screen.getByText(/June/i);
    expect(dateElement).toBeTruthy();
  });
});
