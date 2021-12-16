import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

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
    totalPages: null,
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
  error: null,
};

export const CMS_KOMUNITAS_AHLI_SLICE = 'CMS_KOMUNITAS_AHLI_SLICE';

export const getCMSKomunitasAhliData = createAsyncThunk('cms/getCMSKomunitasAhliData', async ({ page, q, status }) => {
  const response = await get(apiUrls.cmsKomunitasAhliData, { query: { page: page + 1, size: 5, q, status } });
  return response?.data?.content;
});

export const getCMSKomunitasAhliDataById = createAsyncThunk('cms/getCMSKomunitasAhliDataById', async (param) => {
  const response = await get(`${apiUrls.cmsKomunitasAhliData}/${param}`);
  return response?.data?.content;
});

export const getCMSKomunitasAhliLogById = createAsyncThunk('cms/getCMSKomunitasAhliLogById', async (param) => {
  const response = await get(`${apiUrls.cmsKomunitasAhliData}/${param}/logs`);
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
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getCMSKomunitasAhliData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching komunitas ahli data!';
    });
    builder.addCase(getCMSKomunitasAhliDataById.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(getCMSKomunitasAhliDataById.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(getCMSKomunitasAhliDataById.rejected, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = action.error.message;
    });
    builder.addCase(getCMSKomunitasAhliLogById.pending, (state, action) => {
      state.logdataset.loading = true;
    });
    builder.addCase(getCMSKomunitasAhliLogById.fulfilled, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.record = action.payload.reverse();
    });
    builder.addCase(getCMSKomunitasAhliLogById.rejected, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.error = action.error.message;
    });
  },
});

export const cmsKomunitasAhliDatasetSelector = (state) => state.cmsKomunitasAhli?.dataset;
export const cmsKomunitasAhliDetailDatasetSelector = (state) => state.cmsKomunitasAhli?.detaildataSet;
export const cmsKomunitasAhliLogDatasetSelector = (state) => state.cmsKomunitasAhli?.logdataset;
export default cmsKomunitasAhliSlice.reducer;
