import { render, screen } from '@testing-library/react';
import ErrorScreen from './error-screen';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const makeMockSlice = () =>
  createSlice({
    name: 'mock',
    initialState: {},
    reducers: {}
  });

describe('Component: ErrorScreen', () => {
  it('should render error message, button and link', () => {
    const slice = makeMockSlice();
    const store = configureStore({ reducer: { mock: slice.reducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorScreen />
        </MemoryRouter>
      </Provider>
    );

    const message = screen.getByText(/При загрузке произошла ошибка/i);
    const button = screen.getByText(/Попробовать еще раз/i);
    const link = screen.getByText(/На главную/i);

    expect(message).toBeTruthy();
    expect(button).toBeTruthy();
    expect(link).toBeTruthy();
  });
});
