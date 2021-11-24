import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 0,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
    newRecord: {},
  },
  kirimset: {
    loading: false,
    success: false,
    error: null,
  },
  instansiData: [],
  instansiLoading: false,
  user: null,
  error: null,
};

export const PERMINATAAN_DATA_SLICE = 'PERMINATAAN_DATA_SLICE';

export const getPerminataanData = createAsyncThunk('portal/getPerminataanData', async (params) => {
  const response = await get(apiUrls.perminataanData, { data: { page: params + 1, size: 10 } });
  return response?.data?.content;
});

export const setPerminataanData = createAsyncThunk('portal/setPerminataanData', async (params) => {
  const response = await post(apiUrls.perminataanData, params);
  return response?.data;
});

export const setKirimPerminataanData = createAsyncThunk('portal/setKirimPerminataanData', async (params) => {
  const response = await post(`${apiUrls.perminataanData}/${params.id}/kirim`, params.payload);
  return response?.data;
});

export const getInstansiData = createAsyncThunk('portal/getInstansiData', async (params) => {
  const response = await get(apiUrls.instansiData);
  return response?.data?.content?.records;
});

const perminataanSlice = createSlice({
  name: PERMINATAAN_DATA_SLICE,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
    updateStatus: (state) => {
      state.kirimset.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPerminataanData.pending, (state, action) => {
      state.dataset.page = action.meta.arg;
      state.dataset.loading = true;
    });
    builder.addCase(getPerminataanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getPerminataanData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching perminataan data!';
    });
    builder.addCase(getInstansiData.pending, (state, action) => {
      state.instansiLoading = true;
    });
    builder.addCase(getInstansiData.fulfilled, (state, action) => {
      state.instansiLoading = false;
      state.instansiData = action.payload;
    });
    builder.addCase(getInstansiData.rejected, (state) => {
      state.instansiLoading = false;
    });
    builder.addCase(setPerminataanData.pending, (state, action) => {
      state.dataset.loading = true;
      state.dataset.newRecord = {};
    });
    builder.addCase(setPerminataanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.newRecord = action.payload.content;
    });
    builder.addCase(setPerminataanData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(setKirimPerminataanData.pending, (state, action) => {
      state.kirimset.loading = true;
      state.kirimset.success = false;
    });
    builder.addCase(setKirimPerminataanData.fulfilled, (state, action) => {
      state.kirimset.loading = false;
      state.kirimset.success = true;
    });
    builder.addCase(setKirimPerminataanData.rejected, (state, action) => {
      state.kirimset.loading = false;
      state.kirimset.error = action.error.message;
    });
  },
});

export const perminataanDatasetSelector = (state) => state.perminataan?.dataset;
export const kirimsetSelector = (state) => state.perminataan?.kirimset;
export const perminataanForumErrorSelector = (state) => state.perminataan?.error;
export const instansiiDatasetSelector = (state) => ({
  instansiData: state.perminataan?.instansiData,
  loading: state.perminataan?.instansiLoading,
});
export const { updateResult, updateStatus } = perminataanSlice.actions;

export default perminataanSlice.reducer;
