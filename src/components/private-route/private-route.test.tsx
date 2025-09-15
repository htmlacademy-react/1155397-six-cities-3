import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';

const testUserSlice = (authStatus: AuthorizationStatus) =>
  createSlice({
    name: 'user',
    initialState: { authorizationStatus: authStatus },
    reducers: {
      setAuthStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
        state.authorizationStatus = action.payload;
      },
    },
  });

describe('Component: PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    const userSlice = testUserSlice(AuthorizationStatus.Auth);
    const store = configureStore({ reducer: { user: userSlice.reducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <span>Protected content</span>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected content/i)).toBeTruthy();
  });

  it('should redirect to login when user is not authorized', () => {
    const userSlice = testUserSlice(AuthorizationStatus.NoAuth);
    const store = configureStore({ reducer: { user: userSlice.reducer } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <PrivateRoute>
            <span>Hidden content</span>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Hidden content/i)).toBeNull();
  });
});
