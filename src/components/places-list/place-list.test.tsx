import { render, screen } from '@testing-library/react';
import PlacesList from './places-list';
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

const testOffers: TOffer[] = [
  {
    id: '1',
    title: 'Test Apartment 1',
    type: 'apartment',
    price: 100,
    isPremium: false,
    rating: 4,
    previewImage: 'img/apartment-01.jpg',
    isFavorite: false,
    city: {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 10 }
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
  {
    id: '2',
    title: 'Test Apartment 2',
    type: 'room',
    price: 80,
    isPremium: true,
    rating: 3.5,
    previewImage: 'img/room.jpg',
    isFavorite: true,
    city: {
      name: 'Cologne',
      location: { latitude: 0, longitude: 0, zoom: 10 }
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  }
];

describe('Component: PlacesList', () => {
  it('should render all offers with primary variant', () => {
    const userSlice = testUserSlice(AuthorizationStatus.NoAuth);

    const store = configureStore({
      reducer: { user: userSlice.reducer }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            offers={testOffers}
            cardVariant="primary"
            onActiveOfferChange={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Apartment 1/i)).toBeTruthy();
    expect(screen.getByText(/Test Apartment 2/i)).toBeTruthy();
  });

  it('should render all offers with non-primary variant', () => {
    const userSlice = testUserSlice(AuthorizationStatus.Auth);

    const store = configureStore({
      reducer: { user: userSlice.reducer }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlacesList
            offers={testOffers}
            cardVariant="favorite"
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Apartment 1/i)).toBeTruthy();
    expect(screen.getByText(/Test Apartment 2/i)).toBeTruthy();
  });
});
