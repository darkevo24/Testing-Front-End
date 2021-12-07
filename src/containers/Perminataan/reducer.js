import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post, put } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
  },
  kirimset: {
    loading: false,
    success: false,
    error: null,
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
  user: null,
  error: null,
};

export const PERMINATAAN_DATA_SLICE = 'PERMINATAAN_DATA_SLICE';

export const getPerminataanData = createAsyncThunk('portal/getPerminataanData', async (params) => {
  const response = await get(apiUrls.perminataanData, { data: { page: params.page + 1, size: 10, status: params.status } });
  return response?.data?.content;
});

export const setPerminataanData = createAsyncThunk('portal/setPerminataanData', async (params) => {
  const response = await post(apiUrls.perminataanData, params);
  return response?.data;
});

export const putPerminataanData = createAsyncThunk('portal/putPerminataanData', async (params) => {
  const response = await put(`${apiUrls.perminataanData}/${params.id}`, params);
  return response?.data;
});

export const setKirimPerminataanData = createAsyncThunk('portal/setKirimPerminataanData', async (params) => {
  const response = await post(`${apiUrls.perminataanData}/${params.id}/${params.url}`, params.payload);
  return response?.data;
});

export const getPerminataanDataById = createAsyncThunk('portal/getPerminataanDataById', async (params) => {
  const response = await get(`${apiUrls.perminataanData}/${params}`);
  return response?.data?.content;
});

export const getPerminataanLogDataById = createAsyncThunk('portal/getPerminataanLogDataById', async (params) => {
  const response = await get(`${apiUrls.perminataanData}/${params}/logs`, params);
  return response?.data?.content;
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
      state.dataset.page = action.meta.arg.page;
      state.dataset.status = action.meta.arg.status;
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
    builder.addCase(setPerminataanData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(setPerminataanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
    });
    builder.addCase(setPerminataanData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(putPerminataanData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(putPerminataanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
    });
    builder.addCase(putPerminataanData.rejected, (state, action) => {
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
    builder.addCase(getPerminataanDataById.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(getPerminataanDataById.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(getPerminataanDataById.rejected, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = action.error.message;
    });
    builder.addCase(getPerminataanLogDataById.pending, (state, action) => {
      state.logdataset.loading = true;
    });
    builder.addCase(getPerminataanLogDataById.fulfilled, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.record = action.payload.reverse();
    });
    builder.addCase(getPerminataanLogDataById.rejected, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.error = action.error.message;
    });
  },
});

export const perminataanDatasetSelector = (state) => state.perminataan?.dataset;
export const kirimsetSelector = (state) => state.perminataan?.kirimset;
export const detailDatasetSelector = (state) => state.perminataan?.detaildataSet;
export const logDatasetSelector = (state) => state.perminataan?.logdataset;
export const perminataanForumErrorSelector = (state) => state.perminataan?.error;
export const { updateResult, updateStatus } = perminataanSlice.actions;

export default perminataanSlice.reducer;
