import { render, screen, fireEvent } from '@testing-library/react';
import Sorting from './sorting';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { changeSort } from '../../store/slices/offers-slice';
import { SortKeys } from '../../utils';
import { PayloadAction } from '@reduxjs/toolkit';

const makeOffersSlice = (currentSort: string) =>
  createSlice({
    name: 'offers',
    initialState: { currentSort },
    reducers: {
      changeSort: (state, action: PayloadAction<string>) => {
        state.currentSort = action.payload;
      }
    }
  });

describe('Component: Sorting', () => {
  it('should render current sort option', () => {
    const offersSlice = makeOffersSlice('Popular');
    const store = configureStore({ reducer: { offers: offersSlice.reducer } });

    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    const currentSort = screen.getByText(/Popular/i);
    expect(currentSort).toBeTruthy();
  });

  it('should open sort options on click', () => {
    const offersSlice = makeOffersSlice('Popular');
    const store = configureStore({ reducer: { offers: offersSlice.reducer } });

    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    const sortType = screen.getByText(/Popular/i);
    fireEvent.click(sortType);

    SortKeys.forEach((key) => {
      expect(screen.getByText(key)).toBeTruthy();
    });
  });

  it('should dispatch changeSort when option clicked', () => {
    const offersSlice = makeOffersSlice('Popular');
    const store = configureStore({ reducer: { offers: offersSlice.reducer } });
    store.dispatch = vi.fn() as unknown as typeof store.dispatch;

    render(
      <Provider store={store}>
        <Sorting />
      </Provider>
    );

    const sortType = screen.getByText(/Popular/i);
    fireEvent.click(sortType);

    const option = screen.getByText(SortKeys[1]);
    fireEvent.click(option);

    expect(store.dispatch).toHaveBeenCalledWith(changeSort(SortKeys[1]));
  });
});
