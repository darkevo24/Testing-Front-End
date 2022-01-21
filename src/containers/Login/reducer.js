import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';
import { cookieKeys, getCookieByName, setCookie } from 'utils/cookie';

export const initialState = {
  loading: false,
  token: getCookieByName(cookieKeys.token) || '',
  user: getCookieByName(cookieKeys.user) || null,
  error: null,
};

export const LOGIN_REDUCER = 'LOGIN_REDUCER';

export const fetchLoggedInUserInfo = createAsyncThunk('login/fetchLoggedInUserInfo', async (token) => {
  setCookie(cookieKeys.token, token);
  const response = await get(apiUrls.userInfo);
  const user = response.data.content;
  setCookie(cookieKeys.user, user);
  return { token, user };
});

const loginSlice = createSlice({
  name: LOGIN_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoggedInUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoggedInUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
    });
    builder.addCase(fetchLoggedInUserInfo.rejected, (state) => {
      state.loading = false;
      state.error = 'No user found!';
    });
  },
});

export const userSelector = (state) => state.auth?.user;
export const tokenSelector = (state) => state.auth?.token;

export default loginSlice.reducer;
