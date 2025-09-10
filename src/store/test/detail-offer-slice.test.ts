import { describe, it, expect } from 'vitest';
import { detailOfferSlice, getOffer, getNearbyOffers } from '../slices/detail-offer-slice';
import { userSlice } from '../slices/user-slice';
import { offerSlice } from '../slices/offers-slice';
import { reviewsSlice } from '../slices/reviews-slice';
import { fetchOfferById, fetchNearbyOffers } from '../thunks/offer';
import { changeFavorite } from '../thunks/favorites';
import { TDetailOffer } from '../../types/offers';
import { State } from '../../types/state';

const testDetailOffer: TDetailOffer = {
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Heating'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false
  },
  images: [
    'https://url-to-image/image.png'
  ],
  maxAdults: 4,
};

const testNearByOffers = [
  { ...testDetailOffer, id: testDetailOffer.id, isFavorite: false },
  { ...testDetailOffer, id: '2', isFavorite: false },
];

describe('detailOfferSlice', () => {
  const initialState = detailOfferSlice.getInitialState();

  it('Should return Initial state', () => {
    const state = detailOfferSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('fetchOfferById.pending - Should return loading status = true', () => {
    const state = detailOfferSlice.reducer(
      initialState,
      fetchOfferById.pending('', testDetailOffer.id)
    );
    expect(state.isLoading).toBe(true);
  });

  it('fetchOfferById.fulfilled - Should return currentOffer', () => {
    const state = detailOfferSlice.reducer(
      initialState,
      fetchOfferById.fulfilled(testDetailOffer, '', testDetailOffer.id)
    );
    expect(state.currentOffer).toEqual(testDetailOffer);
    expect(state.isLoading).toBe(false);
  });

  it('fetchOfferById.rejected - Should return loading status = false', () => {
    const prev = { ...initialState, isLoading: true };
    const state = detailOfferSlice.reducer(
      prev,
      fetchOfferById.rejected(null, '', testDetailOffer.id)
    );
    expect(state.isLoading).toBe(false);
  });

  it('fetchNearbyOffers.fulfilled - Should return nearByOffers', () => {
    const state = detailOfferSlice.reducer(
      initialState,
      fetchNearbyOffers.fulfilled(testNearByOffers, '', testDetailOffer.id)
    );
    expect(state.nearByOffers).toEqual(testNearByOffers);
  });

  it('changeFavorite.fulfilled → Should return updated currentOffer and nearByOffers', () => {
    let state = detailOfferSlice.reducer(
      initialState,
      fetchOfferById.fulfilled(testDetailOffer, '', testDetailOffer.id)
    );
    state = detailOfferSlice.reducer(
      state,
      fetchNearbyOffers.fulfilled(testNearByOffers, '', testDetailOffer.id)
    );

    const updated = detailOfferSlice.reducer(
      state,
      changeFavorite.fulfilled(
        { ...testDetailOffer, isFavorite: true },
        '',
        { offerId: testDetailOffer.id, status: 1 }
      )
    );

    expect(updated.currentOffer?.isFavorite).toBe(true);
    expect(updated.nearByOffers.find((o) => o.id === testDetailOffer.id)?.isFavorite).toBe(true);
  });
});

describe('selectors', () => {
  const initialState = detailOfferSlice.getInitialState();

  it('Should return currentOffer', () => {
    const state: State = {
      offers: offerSlice.getInitialState(),
      user: userSlice.getInitialState(),
      reviews: reviewsSlice.getInitialState(),
      offer: {
        ...initialState,
        currentOffer: testDetailOffer,
      },
    };

    expect(getOffer(state)).toEqual(testDetailOffer);
  });

  it('Should return nearByOffers', () => {

    const state: State = {
      offers: offerSlice.getInitialState(),
      user: userSlice.getInitialState(),
      reviews: reviewsSlice.getInitialState(),
      offer: {
        ...initialState,
        nearByOffers: testNearByOffers,
      },
    };

    expect(getNearbyOffers(state)).toEqual(testNearByOffers);
  });
});
