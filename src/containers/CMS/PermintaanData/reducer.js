import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    instansi: [],
    unitKerja: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
};

export const PERMINTAAN_DATA = 'PERMINTAAN_DATA';

export const getPermintaanData = createAsyncThunk('permintaan-data/list', async (params) => {
  const response = await get(apiUrls.listPermintaanData, {
    query: {
      page: params.page + 1,
      size: 10,
      instansiId: params.instansiId,
      unitKerjaId: params.unitKerjaId,
      status: params.status,
      q: params.q,
    },
  });
  return response;
});

export const getInstansi = createAsyncThunk('permintaan-data/instansi', async (params) => {
  const response = await get(`${apiUrls.instansiData}`);
  return response?.data.content?.records;
});

export const getUnitkerja = createAsyncThunk('permintaan-data/unitkerja', async (params) => {
  const response = await get(`${apiUrls.instansiData}/${params}/unitkerja`);
  return response?.data.content;
});

const permintaanDataDetailSlice = createSlice({
  name: PERMINTAAN_DATA,
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
    builder.addCase(getInstansi.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getInstansi.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.instansi = action.payload;
    });
    builder.addCase(getInstansi.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getUnitkerja.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getUnitkerja.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.unitKerja = action.payload;
    });
    builder.addCase(getUnitkerja.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
  },
});

export const permintaanDataSelector = (state) => state.permintaanData?.dataset;

export default permintaanDataDetailSlice.reducer;
