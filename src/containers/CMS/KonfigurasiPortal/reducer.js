import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, post, put, get, deleteRequest } from 'utils/request';

export const KONFIGURASI_PORTAL = 'KONFIGURASI_PORTAL';
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
};

export const getListKonfigurasiPortal = createAsyncThunk('cms/getKonfigurasiPortal', async (params) => {
  const response = await get(`${apiUrls.konfigurasiPortal}`, {});
  return response?.data?.content;
});

const KonfigurasiPortalSlice = createSlice({
  name: KONFIGURASI_PORTAL,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListKonfigurasiPortal.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListKonfigurasiPortal.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getListKonfigurasiPortal.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching berita cms!';
    });
  },
});

export const konfiguasiPortalCmsListSelector = (state) => state.konfigurasiPortal?.dataset;
export const detailDataSelector = (state) => state.konfigurasiPortal?.detaildataSet;

export default KonfigurasiPortalSlice.reducer;
