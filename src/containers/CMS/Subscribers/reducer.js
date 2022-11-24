import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, post } from 'utils/request';

export const getSubscribersData = createAsyncThunk('subcribers/subcribersList', async (params) => {
  const body = {
    size: params.filter.size,
    page: params.filter.page,
    email: params.filter.email,
    startDate: params.filter.startDate,
    endDate: params.filter.endDate,
  };
  const response = await post(`${apiUrls.subcribers}/list-subscribe`, body);
  return response?.data?.content;
});

export const downloadSubscribers = createAsyncThunk('subcribers/subcribersDownload', async (params) => {
  const body = {
    size: params.filter.size,
    page: params.filter.page,
    email: params.filter.email,
    startDate: params.filter.startDate,
    endDate: params.filter.endDate,
  };
  const response = await post(`${apiUrls.subcribers}/download-csv`, body);
  return response?.data;
});

export const INITIAL_STATE = {
  dataset: {
    records: [],
    size: defaultNumberOfRows,
    page: 0,
    startDate: '',
    endDate: '',
    loading: false,
    error: null,
    totalRecords: null,
    totalPages: null,
  },
};

const REDUCER_NAME = 'MANAGEMEN_PENGGUNA_REDUCER';

const subscriberSlice = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscribersData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getSubscribersData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset = action.payload;
    });
    builder.addCase(getSubscribersData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.message = action.error.message;
    });
  },
});

export const subscriberSelector = (state) => state.subscribersList?.dataset;

export default subscriberSlice.reducer;
