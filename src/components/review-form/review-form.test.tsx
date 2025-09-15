import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const testSlice = () =>
  createSlice({
    name: 'mock',
    initialState: {},
    reducers: {}
  });

describe('Component: ReviewForm', () => {
  it('should render textarea, rating inputs and submit button', () => {
    const slice = testSlice();
    const store = configureStore({ reducer: { mock: slice.reducer } });

    render(
      <Provider store={store}>
        <ReviewForm offerId="123" />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i);
    const button = screen.getByText(/Submit/);
    const ratingInputs = screen.getAllByRole('radio');

    expect(textarea).toBeTruthy();
    expect(button).toBeTruthy();
    expect(ratingInputs.length).toBeGreaterThan(0);
  });

});
