import { render, screen } from '@testing-library/react';
import PlaceCard from './place-card';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { TOffer } from '../../types/offers';

const testUserSlice = (authorizationStatus: AuthorizationStatus) =>
  createSlice({
    name: 'user',
    initialState: { authorizationStatus },
    reducers: {}
  });

const testOffer: TOffer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  isPremium: true,
  rating: 4.5,
  previewImage: 'img/apartment-01.jpg',
  isFavorite: false,
  city: {
    name: 'Paris',
    location: { latitude: 0, longitude: 0, zoom: 10 }
  },
  location: { latitude: 0, longitude: 0, zoom: 10 },
};

describe('Component: PlaceCard', () => {
  it('should render place card with correct title and price', () => {
    const userSlice = testUserSlice(AuthorizationStatus.NoAuth);

    const store = configureStore({
      reducer: { user: userSlice.reducer }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={testOffer} variant="primary" onPlaceCardHoverChange={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText(/Beautiful apartment/i);
    const price = screen.getByText(/€120/i);
    const type = screen.getByText('apartment');

    expect(title).toBeTruthy();
    expect(price).toBeTruthy();
    expect(type).toBeTruthy();
  });

  it('should show Premium label', () => {
    const userSlice = testUserSlice(AuthorizationStatus.NoAuth);

    const store = configureStore({
      reducer: { user: userSlice.reducer }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={testOffer} variant="primary" onPlaceCardHoverChange={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    const premiumMark = screen.getByText(/Premium/i);
    expect(premiumMark).toBeTruthy();
  });
});
