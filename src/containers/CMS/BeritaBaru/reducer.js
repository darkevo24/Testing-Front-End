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
  tagline: {
    loading: false,
    error: '',
    records: [],
  },
  kategori: {
    loading: false,
    error: '',
    records: [],
  },
  file: {
    loading: false,
    error: '',
    record: {},
  },
  user: null,
  error: null,
};

export const BERITA_CMS_SLICE = 'BERITA_CMS_SLICE';

export const getListBerita = createAsyncThunk('cms/getListBerita', async (params) => {
  const response = await post(`${apiUrls.cmsBeritaData}/list?size=10&page=${params.page}`, { judul: params.judul });
  return response?.data?.content;
});

export const setNewBerita = createAsyncThunk('cms/setNewBerita', async (params) => {
  const response = await post(apiUrls.cmsBeritaData, params.payload);
  return response?.data;
});

export const setDetailBerita = createAsyncThunk('cms/setDetailBerita', async (params) => {
  const response = await get(`${apiUrls.cmsBeritaData}/${params.id}`, {});
  return response?.data?.content;
});

export const setEditBerita = createAsyncThunk('cms/setEditBerita', async (params) => {
  const response = await put(`${apiUrls.cmsBeritaData}/${params.id}`, params.payload);
  return response?.data?.content;
});

export const deleteBerita = createAsyncThunk('cms/deleteBerita', async (params) => {
  const response = await deleteRequest(`${apiUrls.cmsBeritaData}/${params.id}`);
  return response?.data;
});

const beritaCmsSlice = createSlice({
  name: BERITA_CMS_SLICE,
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

    builder.addCase(setNewBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setNewBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setNewBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching create berita data!';
    });

    builder.addCase(setDetailBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setDetailBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setDetailBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching detail berita data!';
    });

    builder.addCase(setEditBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setEditBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setEditBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching edit berita!';
    });

    builder.addCase(deleteBerita.pending, (state) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(deleteBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
    });
    builder.addCase(deleteBerita.rejected, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = action.error.message;
    });
  },
});

export const beritaCmsListSelector = (state) => state.cmsBerita?.dataset;
export const detailDataSelector = (state) => state.cmsBerita?.detaildataSet;

export const { updateResult } = beritaCmsSlice.actions;
export default beritaCmsSlice.reducer;
