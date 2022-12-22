import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, post, put, get, deleteRequest } from 'utils/request';

const REDUCER_NAME = 'BERITA_KATEGORI_REDUCER';

const INITIAL_STATE = {
  kategoriBerita: {
    loading: false,
    records: [],
    page: 1,
    size: 10,
    message: null,
  },
};

export const getBeritaListKategori = createAsyncThunk('cms/getListBeritaKategori', async (params) => {
  const url = new URL(`${apiUrls.beritaKategori}/list`);

  url.searchParams.append('size', params.filter.size);
  url.searchParams.append('page', params.filter.page);
  url.searchParams.append('query', params.filter.query);
  url.searchParams.append('sortBy', params.filter.sortBy);
  url.searchParams.append('sortDirection', params.filter.sortDirection);

  const response = await get(url);
  return response?.data?.content;
});

export const createBeritaKategori = createAsyncThunk('cms/createBeritaKategori', async (payload) => {
  const response = await post(`${apiUrls.beritaKategori}/add`, payload);
  return response?.data;
});

export const deleteBeritaKategori = createAsyncThunk('cms/deleteBeritaKategori', async (payload) => {
  const response = await deleteRequest(`${apiUrls.beritaKategori}/${payload.id}`, payload);
  return response?.data;
});

export const editBeritaKategori = createAsyncThunk('cms/editBeritaKategori', async (payload) => {
  const response = await put(`${apiUrls.beritaKategori}/update`, payload);
  return response?.data;
});

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBeritaListKategori.pending, (state, action) => {
      state.kategoriBerita.loading = true;
    });
    builder.addCase(getBeritaListKategori.fulfilled, (state, action) => {
      state.kategoriBerita.loading = false;
      state.kategoriBerita.page = action.payload.page;
      state.kategoriBerita.size = action.payload.size;
      state.kategoriBerita.records = action.payload.records;
      state.kategoriBerita.totalRecords = action.payload.totalRecords;
      state.kategoriBerita.totalPages = action.payload.totalPages;
    });
    builder.addCase(getBeritaListKategori.rejected, (state, action) => {
      state.kategoriBerita.loading = false;
      state.kategoriBerita.message = action.error.message;
    });
  },
});

export const beritaKategoriCmsListSelector = (state) => state.cms.beritaKategori.kategoriBerita;

export default SLICE_OBJ.reducer;
