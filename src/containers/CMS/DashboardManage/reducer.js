import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, post, put, get, deleteRequest } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 1,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalRecords: 0,
    totalPages: 1,
  },
  detaildataSet: {
    loading: false,
    error: '',
    record: {},
  },
  logBerita: {
    loading: false,
    error: '',
    records: [],
  },
  user: null,
  error: null,
};

export const DATA_ANALYTIC_SLICE = 'DATA_ANALYTIC_SLICE';

export const getListBerita = createAsyncThunk('cms/getListBerita', async (params) => {
  const response = await post(`${apiUrls.cmsBeritaData}/list?size=10&page=${params.page}&sortDirection=DESC`, {
    judul: params.judul,
  });
  return response?.data?.content;
});

const dataAnalyticSlice = createSlice({
  name: DATA_ANALYTIC_SLICE,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListBerita.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListBerita.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getListBerita.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching berita cms!';
    });
  },
});

export const beritaCmsListSelector = (state) => state.cmsBerita?.dataset;

export const { updateResult } = dataAnalyticSlice.actions;
export default dataAnalyticSlice.reducer;
