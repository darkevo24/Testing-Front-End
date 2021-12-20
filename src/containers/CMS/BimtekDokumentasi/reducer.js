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
    records: [],
  },
  list: {
    loading: false,
    records: [],
  },
};

export const BIMTEK_DOKUMENTASI = 'BIMTEK_DOKUMENTASI';

export const getDokumentasi = createAsyncThunk('dokumentasi', async (params) => {
  const response = await get(apiUrls.cmsBimtekDokumentasi, { query: { page: params.page + 1, size: 10, q: params.q } });
  return response;
});

export const getDokumentasiDetail = createAsyncThunk('dokumentasi/detail', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekDokumentasi}/${params}`);
  return response;
});

export const getDokumentasiList = createAsyncThunk('dokumentasi/list', async (params) => {
  const response = await get(apiUrls.cmsBimtekJadwal);
  console.log(response);
  return response;
});

const BimtekDokumentasiSlice = createSlice({
  name: BIMTEK_DOKUMENTASI,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDokumentasi.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getDokumentasi.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page;
      state.dataset.totalPages = action.payload.data.content.totalPages;
      state.dataset.totalRecords = action.payload.data.content.totalRecords;
    });
    builder.addCase(getDokumentasi.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getDokumentasiDetail.pending, (state, action) => {
      state.detail.loading = true;
    });
    builder.addCase(getDokumentasiDetail.fulfilled, (state, action) => {
      state.detail.loading = false;
      state.detail.records = action.payload.data.content;
    });
    builder.addCase(getDokumentasiDetail.rejected, (state, action) => {
      state.detail.loading = false;
      state.detail.error = 'Invalid data';
    });
    builder.addCase(getDokumentasiList.pending, (state, action) => {
      state.list.loading = true;
    });
    builder.addCase(getDokumentasiList.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.records = action.payload.data.content.records;
    });
    builder.addCase(getDokumentasiList.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = 'Invalid data';
    });
  },
});

export const BimtekDokumentasiSelector = (state) => state.cmsBimtekDokumentasi.dataset;
export const BimtekDokumentasiDetailSelector = (state) => state.cmsBimtekDokumentasi.detail;
export const BimtekListSelector = (state) => state.cmsBimtekDokumentasi.list;

export default BimtekDokumentasiSlice.reducer;
