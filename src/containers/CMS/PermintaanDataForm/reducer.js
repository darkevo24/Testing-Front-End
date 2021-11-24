import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, post } from 'utils/request';
import cloneDeep from 'lodash/cloneDeep';

export const initialState = {
  loading: false,
  result: null,
  user: null,
  error: null,
};

export const PERMINTAAN_DATA_DETAIL = 'PERMINTAAN_DATA_DETAIL';

export const getPermintaanDataDetail = createAsyncThunk('permintaan-data/detail', async (params) => {
  let data = cloneDeep(params);
  const response = await get(apiUrls.detailPermintaanData + data);
  return response?.result;
});

export const postPermintaanDataTolak = createAsyncThunk('permintaan-data/tolak', async (params, data) => {
  const response = await post(apiUrls.detailPermintaanData + data + '/tolak', params);
  return response?.result;
});

export const postPermintaanDataProses = createAsyncThunk('permintaan-data/proses', async (params, data) => {
  const response = await post(apiUrls.detailPermintaanData + data + '/proses', params);
  return response?.result;
});

export const postPermintaanDataSelesai = createAsyncThunk('permintaan-data/selesai', async (params, data) => {
  const response = await post(apiUrls.detailPermintaanData + data + '/selesai', params);
  return response?.result;
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
  },
});

export const permintaanDataDetailSelector = (state) => state.permintaanData?.result;

export default permintaanDataDetailSlice.reducer;
