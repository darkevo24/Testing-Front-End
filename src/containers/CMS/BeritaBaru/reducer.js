import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
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

export const getListKategori = createAsyncThunk('cms/getListKategori', async (params) => {
  const response = await get('/api-be/v1/settings/key/' + params);
  return response?.data?.content;
});

export const getListTagline = createAsyncThunk('cms/getListTagline', async () => {
  const response = await get('/api-be/v1/tagline');
  return response?.data?.content;
});

export const uploadFile = createAsyncThunk('cms/uploadFile', async (params) => {
  const response = await post('/api-be/file/public-upload', params);
  return response?.data;
});

export const getListBerita = createAsyncThunk('cms/getListBerita', async (params) => {
  const response = await get(apiUrls.cmsBeritaData, { data: { size: 10, page: params.page } });
  return response?.data?.content;
});

export const setNewBerita = createAsyncThunk('cms/setNewBerita', async (params) => {
  const response = await post(apiUrls.cmsBeritaData, params.payload);
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
      state.dataset.page = action.meta.arg.page;
      state.dataset.status = action.meta.arg.status;
      state.dataset.loading = true;
    });
    builder.addCase(getListBerita.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
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

    builder.addCase(getListKategori.pending, (state, action) => {
      state.kategori.loading = true;
    });
    builder.addCase(getListKategori.fulfilled, (state, action) => {
      state.kategori.loading = false;
      state.kategori.records = action.payload;
    });
    builder.addCase(getListKategori.rejected, (state) => {
      state.kategori.loading = false;
      state.kategori.error = 'Error in fetching kategori!';
    });

    builder.addCase(getListTagline.pending, (state, action) => {
      state.tagline.loading = true;
    });
    builder.addCase(getListTagline.fulfilled, (state, action) => {
      state.tagline.loading = false;
      state.tagline.records = action.payload.records;
    });
    builder.addCase(getListTagline.rejected, (state) => {
      state.tagline.loading = false;
      state.tagline.error = 'Error in fetching tagline!';
    });

    builder.addCase(uploadFile.pending, (state, action) => {
      state.file.loading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.file.loading = false;
      state.file.record = action.payload;
    });
    builder.addCase(uploadFile.rejected, (state) => {
      state.file.loading = false;
      state.file.error = 'Error in upload file!';
    });
  },
});

export const beritaCmsListSelector = (state) => state.cmsBerita?.dataset;
export const detailDataSelector = (state) => state.cmsBerita?.detaildataSet;

export const kategoriSelector = (state) => state.cmsBerita?.kategori;
export const taglineSelector = (state) => state.cmsBerita?.tagline;
export const fileSelector = (state) => state.cmsBerita?.file;

export const { updateResult } = beritaCmsSlice.actions;
export default beritaCmsSlice.reducer;
