import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import forOwn from 'lodash/forOwn';
import { apiUrls, post } from 'utils/request';
import { cookieKeys, getCookieByName, setCookie, removeAllCookie } from 'utils/cookie';

export const initialState = {
  loading: false,
  token: getCookieByName(cookieKeys.token) || '',
  user: getCookieByName(cookieKeys.user) || null,
  error: null,
};

export const LOGIN_REDUCER = 'LOGIN_REDUCER';

export const loginUser = createAsyncThunk('login/login', async (credentials) => {
  const response = await post(apiUrls.login, credentials);
  const token = response.headers?.token;
  const user = response.data;
  setCookie(cookieKeys.token, token);
  setCookie(cookieKeys.user, user);
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
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid user details!';
    });
  },
});

export const tokenSelector = (state) => state.auth?.token;
export const userSelector = (state) => state.auth?.user;

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
