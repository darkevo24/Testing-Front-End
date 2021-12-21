import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
  detail: {
    loading: false,
    error: null,
    records: [],
  },
  logs: {
    loading: false,
    error: null,
    records: [],
  },
};

export const BIMTEK_PERMINTAAN_DATA = 'BIMTEK_PERMINTAAN_DATA';

export const getPermintaanData = createAsyncThunk('permintaan-data/bimtek', async (params) => {
  const response = await get(apiUrls.cmsBimtekPermintaanData, { query: { page: params.page + 1, size: 10, q: params.q } });
  return response;
});

export const getPermintaanDataDetail = createAsyncThunk('permintaan-data/detail', async (params) => {
  const response = await get(apiUrls.cmsBimtekPermintaanData + '/' + params.id);
  console.log(response);
  return response;
});

export const getListLogAktifitas = createAsyncThunk('permintaan-data/logs', async (params) => {
  const response = await get(apiUrls.cmsBimtekLogs + '/' + params.id);
  return response;
});

const BimtekPermintaanDataDetailSlice = createSlice({
  name: BIMTEK_PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermintaanData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getPermintaanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page;
      state.dataset.totalPages = action.payload.data.content.totalPages;
      state.dataset.totalRecords = action.payload.data.content.totalRecords;
    });
    builder.addCase(getPermintaanData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getListLogAktifitas.pending, (state, action) => {
      state.logs.loading = true;
    });
    builder.addCase(getListLogAktifitas.fulfilled, (state, action) => {
      state.logs.loading = false;
      state.logs.records = action.payload.data.content.records;
    });
    builder.addCase(getListLogAktifitas.rejected, (state, action) => {
      state.logs.loading = false;
      state.logs.error = 'Invalid data';
    });
    builder.addCase(getPermintaanDataDetail.pending, (state, action) => {
      state.detail.loading = true;
    });
    builder.addCase(getPermintaanDataDetail.fulfilled, (state, action) => {
      state.detail.loading = false;
      state.detail.records = action.payload.data.content;
    });
    builder.addCase(getPermintaanDataDetail.rejected, (state, action) => {
      state.detail.loading = false;
      state.detail.error = 'Invalid data';
    });
  },
});

export const BimtekPermintaanDataSelector = (state) => state.cmsBimtekPermintaan.dataset;
export const BimtekLogSelector = (state) => state.cmsBimtekPermintaan.logs;
export const BimtekPermintaanDataDetail = (state) => state.cmsBimtekPermintaan?.detail?.records;

export default BimtekPermintaanDataDetailSlice.reducer;
