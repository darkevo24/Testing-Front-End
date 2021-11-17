import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import forOwn from 'lodash/forOwn';
import { apiUrls, post } from 'utils/request';
import { cookieKeys, getCookieByName, setCookie, removeAllCookie } from 'utils/cookie';

export const initialState = {
  loading: false,
  token: getCookieByName(cookieKeys.token) || '',
  user: null,
  error: null,
};

export const LOGIN_REDUCER = 'LOGIN_REDUCER';

export const loginUser = createAsyncThunk('login/login', async (credentials) => {
  const response = await post(apiUrls.login, credentials);
  const token = response.headers?.token;
  setCookie(cookieKeys.token, token);
  // TODO: make use of expiry details from decoded token.
  // eslint-disable-next-line no-unused-vars
  const user = jwtDecode(token);
  return { token, user };
});

const loginSlice = createSlice({
  name: LOGIN_REDUCER,
  initialState,
  reducers: {
    logout: (state) => {
      removeAllCookie();
      forOwn(initialState, (value, key) => {
        state[key] = value;
      });
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = 'Invalid user details!';
    });
  },
});

export const tokenSelector = (state) => state.auth?.token;

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
