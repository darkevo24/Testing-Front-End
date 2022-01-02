import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import cloneDeep from 'lodash/cloneDeep';
import { apiUrls, get, post } from 'utils/request';

export const initialState = {
  loading: false,
  result: null,
  user: null,
  dataLog: null,
  error: null,
};

export const PERMINTAAN_DATA_DETAIL = 'PERMINTAAN_DATA_DETAIL';

export const getPermintaanDataDetail = createAsyncThunk('/permintaan-data/detail', async (params) => {
  const response = await get(`${apiUrls.detailPermintaanData}/${params}`);
  return response?.data.content;
});

export const getPermintaanDataDetailLog = createAsyncThunk('/permintaan-data/detail/log', async (params) => {
  const response = await get(`${apiUrls.detailPermintaanData}/${params}/logs`);
  return response?.data.content;
});

const permintaanDataDetailSlice = createSlice({
  name: PERMINTAAN_DATA_DETAIL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermintaanDataDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPermintaanDataDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload;
    });
    builder.addCase(getPermintaanDataDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
    builder.addCase(getPermintaanDataDetailLog.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPermintaanDataDetailLog.fulfilled, (state, action) => {
      state.loading = false;
      state.dataLog = action.payload;
    });
    builder.addCase(getPermintaanDataDetailLog.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const permintaanDataDetailSelector = (state) => state?.permintaanDataDetail;

export default permintaanDataDetailSlice.reducer;
