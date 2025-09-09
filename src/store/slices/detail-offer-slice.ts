import { createSlice } from '@reduxjs/toolkit';
import { TOffers, TDetailOffer } from '../../types/offers';
import { fetchOfferById, fetchNearbyOffers } from '../thunks/offer';
import { State } from '../../types/state';
import { changeFavorite } from '../thunks/favorites';

export type TOfferState = {
    currentOffer: TDetailOffer | null;
    nearByOffers: TOffers;
    isLoading: boolean;
}

const initialState: TOfferState = {
  currentOffer: null,
  nearByOffers: [],
  isLoading: false,
};

const detailOfferSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearByOffers = action.payload;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        const updated = action.payload;

        if (state.currentOffer && state.currentOffer.id === updated.id) {
          state.currentOffer = { ...state.currentOffer, isFavorite: updated.isFavorite };
        }

        state.nearByOffers = state.nearByOffers.map((offer) =>
          offer.id === updated.id ? { ...offer, isFavorite: updated.isFavorite } : offer
        );
      });
  }
});

const getOffer = (state: State) => state.offer.currentOffer;
const getNearbyOffers = (state: State) => state.offer.nearByOffers;

export {detailOfferSlice, getOffer, getNearbyOffers};
