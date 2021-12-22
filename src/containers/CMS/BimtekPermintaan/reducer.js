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
};

export const BIMTEK_PERMINTAAN_DATA = 'BIMTEK_PERMINTAAN_DATA';

export const getPermintaanData = createAsyncThunk('permintaan-data/bimtek', async (params) => {
  return await get(apiUrls.cmsBimtekPermintaanData, { query: { page: params.page + 1, size: 10, q: params.q } });
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
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const BimtekPermintaanDataSelector = (state) => state.cmsBimtekPermintaan.dataset;

export default BimtekPermintaanDataDetailSlice.reducer;
