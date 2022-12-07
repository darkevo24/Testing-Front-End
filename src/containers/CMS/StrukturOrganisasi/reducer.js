import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, put, post, deleteRequest } from 'utils/request';

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
};

export const STRUKTUR_ORGANISASI_SLICE = 'STRUKTUR_ORGANISASI_SLICE';

export const getStrukturOrganisasi = createAsyncThunk('cms/getStrukturOrganisasi', async (params) => {
  const response = await get(apiUrls.cmsOrganization);
  return response?.data?.content;
});

export const getStrukturOrganisasiById = createAsyncThunk('cms/getStrukturOrganisasiById', async (id) => {
  const response = await get(`${apiUrls.cmsOrganization}/${id}`);
  return response?.data?.content;
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
      state.dataset.records = action.payload;
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
  },
});

export const strukturDatasetSelector = (state) => state.struktur?.dataset;
export const detailDataSelector = (state) => state.struktur?.detaildataSet;
export const { updateResult } = strukturOrganisasiSlice.actions;
export default strukturOrganisasiSlice.reducer;
