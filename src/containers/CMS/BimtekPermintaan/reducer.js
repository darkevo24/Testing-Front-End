import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post, put } from 'utils/request';

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
  instansi: {
    loading: false,
    error: null,
    recordsInstansi: [],
  },
  status: null,
  loading: false,
};

export const BIMTEK_PERMINTAAN_DATA = 'BIMTEK_PERMINTAAN_DATA';

export const getPermintaanData = createAsyncThunk('bimtek-permintaan/getListBimtek', async (params) => {
  const response = await get(apiUrls.cmsBimtekPermintaanData, {
    query: {
      ...params,
      page: params.page + 1,
    },
  });
  return response;
});

export const getPermintaanDataDetail = createAsyncThunk('bimtek-permintaan/getListBimtekDetail', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekPermintaanData}/${params.id}`);
  return response;
});

export const getListLogAktifitas = createAsyncThunk('bimtek-permintaan/getListLogs', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekLogs}/${params.id}`);
  return response;
});

export const getInstansi = createAsyncThunk('bimtek-permintaan-bimtek/getListInstansi', async (params) => {
  const response = await get(`${apiUrls.instansiData}/all`);
  return response?.data.content?.records;
});

const BimtekPermintaanDataDetailSlice = createSlice({
  name: BIMTEK_PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermintaanData.pending, (state, action) => {
      state.dataset.page = 0;
      state.dataset.loading = true;
    });
    builder.addCase(getPermintaanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page - 1;
      state.dataset.totalPages = action.payload.data.content.totalPages;
      state.dataset.totalRecords = action.payload.data.content.totalRecords;
    });
    builder.addCase(getPermintaanData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getInstansi.pending, (state, action) => {
      state.instansi.loading = true;
    });
    builder.addCase(getInstansi.fulfilled, (state, action) => {
      state.instansi.loading = false;
      state.instansi.recordsInstansi = action.payload;
    });
    builder.addCase(getInstansi.rejected, (state, action) => {
      state.instansi.loading = false;
      state.instansi.error = 'Invalid data';
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

export const bimtekPermintaanDataSelector = (state) => state.cmsBimtekPermintaan.dataset;
export const bimtekLogSelector = (state) => state.cmsBimtekPermintaan.logs;
export const bimtekPermintaanDataDetail = (state) => state.cmsBimtekPermintaan?.detail?.records;
export const bimtekInstansi = (state) => state.cmsBimtekPermintaan?.instansi;

export default BimtekPermintaanDataDetailSlice.reducer;
