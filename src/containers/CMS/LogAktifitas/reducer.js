import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    status: 'idel',
    q: '',
    startDate: '',
    endDate: '',
    loading: false,
    error: null,
    page: 1,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
    totalPages: null,
  },
  error: null,
};
export const getCMSLogActifitasData = createAsyncThunk('cms/getAditTrial', async ({ page, q, startDate, endDate }) => {
  const params = { page };
  if (q) params.q = q;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  const response = await get(apiUrls.cmsAuditTrialData, {
    query: params,
  });
  return response?.data?.content;
});

export const CMS_LOG_AKTIFITAS_SLICE = 'CMS_LOG_AKTIFITAS_SLICE';

const cmsLogAktifitasSlice = createSlice({
  name: CMS_LOG_AKTIFITAS_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCMSLogActifitasData.pending, (state, action) => {
      const { page = 1, q = '', startDate = '', endDate = '' } = action.meta.arg || {};
      state.dataset.page = page || 1;
      state.dataset.q = q || '';
      state.dataset.startDate = startDate || '';
      state.dataset.endDate = endDate || '';
      state.dataset.loading = true;
      state.dataset.status = 'loading';
    });
    builder.addCase(getCMSLogActifitasData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
      state.dataset.status = 'success';
    });
    builder.addCase(getCMSLogActifitasData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
      state.dataset.status = 'error';
    });
  },
});

export const cmsLogAktifitasDataSelector = (state) => state.cmsLogActifitias?.dataset;
export default cmsLogAktifitasSlice.reducer;
