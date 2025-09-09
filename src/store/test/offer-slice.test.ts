import { describe, it, expect } from 'vitest';
import { offerSlice } from '../slices/offers-slice';
import { fetchOffers } from '../thunks/offers';
import { TOffers } from '../../types/offers';

describe('offerSlice', () => {
  const initialState = offerSlice.getInitialState();

  const testOffers: TOffers = [
    {
      id: '1',
      title: 'Beautiful studio',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8,
        },
      },
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8,
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'img/apartment-01.jpg',
    },
  ];

  it('Should return Initial state', () => {
    expect(offerSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('fetchOffers.pending  Should return loading status = true', () => {
    const action = { type: fetchOffers.pending.type };
    const state = offerSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('fetchOffers.fulfilled - Should return offers, loading status = false', () => {
    const action = { type: fetchOffers.fulfilled.type, payload: testOffers };
    const state = offerSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.offers).toEqual(testOffers);
  });

  it('fetchOffers.rejected - Should return loading status = false', () => {
    const action = { type: fetchOffers.rejected.type };
    const state = offerSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });
});
