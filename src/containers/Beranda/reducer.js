import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, paginationParams } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    result: null,
    params: {
      'facet.field': ['organization', 'groups', 'tags', 'res_format'],
      ...paginationParams,
    },
  },
  user: null,
  error: null,
};

export const BERANDA_REDUCER = 'BERANDA_REDUCER';

export const getDataSet = createAsyncThunk('beranda/getDataset', async (params) => {
  const response = await get(apiUrls.dataset, params);
  return response?.result;
});

const berandaSlice = createSlice({
  name: BERANDA_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataSet.pending, (state, action) => {
      state.dataset.params = action.meta.arg;
      state.dataset.loading = false;
    });
    builder.addCase(getDataSet.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.result = action.payload;
    });
    builder.addCase(getDataSet.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching dataset details!';
    });
  },
});

export const datasetSelector = (state) => state.beranda?.dataset;

// export const { } = berandaSlice.actions;

export default berandaSlice.reducer;
