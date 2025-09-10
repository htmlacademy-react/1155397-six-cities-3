import { describe, it, expect } from 'vitest';
import { AuthorizationStatus } from '../../const';
import { checkAuthorization, loginUser, logoutUser } from '../thunks/user';
import { TUser } from '../../types/auth'; // поправь путь, если у тебя другой
import { userSlice } from '../slices/user-slice';

const testUser: TUser = {
  name: 'Test User',
  avatarUrl: 'https://example.com/test-user-avatar.jpg',
  isPro: false,
  email: 'test-user@example.com',
  token: 'test-token'
};

describe('userSlice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  it('Should return Initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('checkAuthorization.fulfilled - Should return Auth and user', () => {
    const action = { type: checkAuthorization.fulfilled.type, payload: testUser };
    const state = userSlice.reducer(initialState, action);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(testUser);
  });

  it('checkAuthorization.rejected - Should return NoAuth', () => {
    const action = { type: checkAuthorization.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('loginUser.fulfilled - Should return Auth and user', () => {
    const newUser: TUser = {
      name: 'Test User2',
      avatarUrl: 'https://example.com/test-user2-avatar.jpg',
      isPro: true,
      email: 'test-user2@example.com',
      token: 'test2-token'
    };
    const action = { type: loginUser.fulfilled.type, payload: newUser };
    const state = userSlice.reducer(initialState, action);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(newUser);
  });

  it('loginUser.rejected - Should return NoAuth', () => {
    const action = { type: loginUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('logoutUser.fulfilled - Should return reset user and NoAuth', () => {
    const prevState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: testUser,
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(prevState, action);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.user).toEqual(null);
  });
});
