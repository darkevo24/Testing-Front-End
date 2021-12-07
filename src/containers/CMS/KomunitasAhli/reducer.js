import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post, deleteRequest } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    q: '',
    status: '',
    loading: false,
    error: null,
    page: 0,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
  },
  error: null,
};

export const CMS_KOMUNITAS_AHLI_SLICE = 'CMS_KOMUNITAS_AHLI_SLICE';

export const getCMSKomunitasAhliData = createAsyncThunk('cms/getCMSKomunitasAhliData', async ({ page, q, status }) => {
  const response = await get(apiUrls.cmsKomunitasAhliData, { data: { page: page + 1, size: 10, q, status } });
  return response?.data?.content;
});

export const setCMSKomunitasAhliData = createAsyncThunk('cms/setCMSKomunitasAhliData', async (params) => {
  const response = await get(apiUrls.cmsKomunitasAhliData, params);
  return response?.data?.content;
});

export const putCMSKomunitasAhliData = createAsyncThunk('cms/putCMSKomunitasAhliData', async (params) => {
  const response = await get(`apiUrls.cmsKomunitasAhliData/${params.id}`, params);
  return response?.data?.content;
});

export const removeCMSKomunitasAhliData = createAsyncThunk('cms/removeCMSKomunitasAhliData', async (id) => {
  const response = await get(`apiUrls.cmsKomunitasAhliData/${id}`);
  return response?.data?.content;
});

const cmsKomunitasAhliSlice = createSlice({
  name: CMS_KOMUNITAS_AHLI_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCMSKomunitasAhliData.pending, (state, action) => {
      const { page = 0, q = '', status = '' } = action.meta.arg || {};
      state.dataset.page = page || 0;
      state.dataset.q = q || '';
      state.dataset.status = status || '';
      state.dataset.loading = true;
    });
    builder.addCase(getCMSKomunitasAhliData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getCMSKomunitasAhliData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching komunitas ahli data!';
    });
    builder.addCase(removeCMSKomunitasAhliData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(removeCMSKomunitasAhliData.fulfilled, (state, action) => {
      state.dataset.loading = false;
    });
    builder.addCase(removeCMSKomunitasAhliData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Failed to delete the data!';
    });
  },
});

export const cmsKomunitasAhliDatasetSelector = (state) => state.cmsKomunitasAhli?.dataset;

export default cmsKomunitasAhliSlice.reducer;
