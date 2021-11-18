import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const initialState = {
  loading: false,
  result: null,
  user: null,
  error: null,
};

export const PERMINTAAN_DATA = 'PERMINTAAN_DATA';

export const getPermintaanData = createAsyncThunk('permintaan-data/list', async (params) => {
  const response = await get(apiUrls.listPermintaanData);
  return response?.result;
});

const permintaanDataDetailSlice = createSlice({
  name: PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermintaanData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPermintaanData.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload;
    });
    builder.addCase(getPermintaanData.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const permintaanDataSelector = (state) => state.permintaanDataDetail?.result;

export default permintaanDataDetailSlice.reducer;
