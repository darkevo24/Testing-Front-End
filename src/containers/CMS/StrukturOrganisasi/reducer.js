import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, put, post } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 1,
    records: [],
    size: null,
    totalRecords: 0,
    totalPages: 1,
  },
  detaildataSet: {
    loading: false,
    error: '',
    record: {},
  },
  logdataset: {
    loading: false,
    error: '',
    record: [],
  },
};

export const STRUKTUR_ORGANISASI_SLICE = 'STRUKTUR_ORGANISASI_SLICE';

export const getStrukturOrganisasi = createAsyncThunk('cms/getStrukturOrganisasi', async (params) => {
  const response = await get(apiUrls.strukturData, { query: { q: params.q, page: params.page, rows: 10 } });
  return response?.data?.content;
});

export const getStrukturOrganisasiById = createAsyncThunk('cms/getStrukturOrganisasiById', async (id) => {
  const response = await get(`${apiUrls.strukturData}/${id}`);
  return response?.data?.content;
});

export const getStrukturOrganisasiLogs = createAsyncThunk('cms/getStrukturOrganisasiLogs', async (id) => {
  const response = await get(`${apiUrls.strukturData}/${id}/logs`);
  return response?.data?.content;
});

export const setStrukturOrganisasi = createAsyncThunk('cms/setStrukturOrganisasi', async (params) => {
  const response = await put(`${apiUrls.strukturData}/${params.id}`, params.payload);
  return response?.data;
});

export const createStrukturOrganisasi = createAsyncThunk('cms/createStrukturOrganisasi', async (params) => {
  const response = await post(apiUrls.strukturData, params.payload);
  return response?.data;
});

export const updateStatus = createAsyncThunk('cms/updateStatusStruktur', async (params) => {
  const response = await post(`${apiUrls.strukturData}/${params.id}/${params.action}`, {});
  return response?.data;
});

export const setPreviewBidang = createAsyncThunk('cms/setPreviewBidang', async (params) => {
  return params;
});

const strukturOrganisasiSlice = createSlice({
  name: STRUKTUR_ORGANISASI_SLICE,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStrukturOrganisasi.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getStrukturOrganisasi.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
      state.dataset.page = action.payload.page;
    });
    builder.addCase(getStrukturOrganisasi.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching list struktur data!';
    });

    builder.addCase(getStrukturOrganisasiById.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(getStrukturOrganisasiById.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(getStrukturOrganisasiById.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching detail struktur data!';
    });

    builder.addCase(getStrukturOrganisasiLogs.pending, (state, action) => {
      state.logdataset.loading = true;
    });
    builder.addCase(getStrukturOrganisasiLogs.fulfilled, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.record = action.payload.reverse();
    });
    builder.addCase(getStrukturOrganisasiLogs.rejected, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.error = action.error.message;
    });

    builder.addCase(setStrukturOrganisasi.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setStrukturOrganisasi.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setStrukturOrganisasi.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching detail struktur data!';
    });

    builder.addCase(createStrukturOrganisasi.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(createStrukturOrganisasi.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(createStrukturOrganisasi.rejected, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = action.error.message;
    });

    builder.addCase(setPreviewBidang.fulfilled, (state, action) => {
      state.detaildataSet.record = action.payload;
    });
  },
});

export const strukturDatasetSelector = (state) => state.struktur?.dataset;
export const detailDataSelector = (state) => state.struktur?.detaildataSet;
export const logDatasetSelector = (state) => state.struktur?.logdataset;
export const { updateResult } = strukturOrganisasiSlice.actions;
export default strukturOrganisasiSlice.reducer;
