import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    payload: {},
    loading: false,
    error: null,
    page: 0,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
  },
  error: null,
};

export const FORUM_SDI_SLICE = 'FORUM_SDI_SLICE';

export const getForumSDIData = createAsyncThunk('portal/getForumSDIData', async ({ page, ...rest }) => {
  const response = await get(apiUrls.portalForumSDI, { query: { page: page + 1, size: 10, ...rest } });
  return response?.data?.content;
});

const forumSDISlice = createSlice({
  name: FORUM_SDI_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getForumSDIData.pending, (state, action) => {
      const { page = 0, payload } = action.meta.arg || {};
      state.dataset.page = page || 0;
      state.dataset.payload = payload || {};
      state.dataset.loading = true;
    });
    builder.addCase(getForumSDIData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getForumSDIData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.records = [];
      state.dataset.totalRecords = 0;
      state.dataset.error = 'Error in fetching forum sdi data!';
    });
  },
});

export const forumSDIDatasetSelector = (state) => state.forumSDI?.dataset;
export default forumSDISlice.reducer;
