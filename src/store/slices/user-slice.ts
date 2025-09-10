import { createSlice } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { TUser } from '../../types/auth';
import { checkAuthorization, loginUser, logoutUser } from '../thunks/user';

const INITIAL_USER = null;

type TUserState = {
    authorizationStatus: AuthorizationStatus;
    user: TUser | null;
}

const initialState: TUserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: INITIAL_USER,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = INITIAL_USER;
      });
  }
});

const getAuthStatus = (state: State) => state.user.authorizationStatus;
const getUserData = (state: State) => state.user.user;

export {userSlice, getAuthStatus, getUserData};
