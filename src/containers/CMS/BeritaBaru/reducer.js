import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const BERITA_CMS_SLICE = 'BERITA_CMS_SLICE';

export const getListBerita = createAsyncThunk('cms/getListBerita', async (params) => {
  const url = new URL(`${apiUrls.cmsBeritaData}/list`);

  url.searchParams.append('size', params.filter.size);
  url.searchParams.append('page', params.filter.page);
  url.searchParams.append('sortDirection', params.filter.sortDirection);
  url.searchParams.append('sortBy', params.filter.sortBy);

  const response = await post(url, {
    judul: params.filter.judul,
    status: params.filter.status,
  });
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

export const setStatusBerita = createAsyncThunk('cms/setStatusBerita', async (params) => {
  const response = await put(`${apiUrls.cmsBeritaData}/status`, params.payload);
  return response?.data?.content;
});

export const deleteBerita = createAsyncThunk('cms/deleteBerita', async (params) => {
  const response = await deleteRequest(`${apiUrls.cmsBeritaData}/${params.id}`);
  return response?.data;
});

export const setPreviewBerita = createAsyncThunk('cms/setPreviewBerita', async (params) => {
  return params;
});

export const getLogBerita = createAsyncThunk('cmsBerita/getLogBerita', async (params) => {
  const response = await get(`${apiUrls.cmsBeritaData}/logs/${params.id}`);
  return response?.data?.content;
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

    builder.addCase(setStatusBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setStatusBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setStatusBerita.rejected, (state) => {
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

    builder.addCase(setPreviewBerita.fulfilled, (state, action) => {
      state.detaildataSet.record = action.payload;
    });

    builder.addCase(getLogBerita.pending, (state) => {
      state.logBerita.loading = true;
    });
    builder.addCase(getLogBerita.fulfilled, (state, action) => {
      state.logBerita.loading = false;
      state.logBerita.records = action.payload;
    });
    builder.addCase(getLogBerita.rejected, (state, action) => {
      state.logBerita.loading = false;
      state.logBerita.error = action.error.message;
    });
  },
});

export const beritaCmsListSelector = (state) => state.cmsBerita?.dataset;
export const detailDataSelector = (state) => state.cmsBerita?.detaildataSet;
export const logBeritaSelector = (state) => state.cmsBerita?.logBerita;

export const { updateResult } = beritaCmsSlice.actions;
export default beritaCmsSlice.reducer;
