import { createSlice } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { TOffers } from '../../types/offers';
import { fetchFavorites, changeFavorite } from '../thunks/favorites';

type TFavoriteState = {
    favorites: TOffers;
};

const initialState: TFavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        if(action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter(
            (item) => item.id !== action.payload.id
          );
        }
      });
  },
});

const getFavoriteOffers = (state: State) => state.favorites.favorites;

export {favoriteSlice, getFavoriteOffers};

