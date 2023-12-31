import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, post } from 'utils/request';

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
    totalPages: null,
  },
  detaildataSet: {
    loading: false,
    error: '',
    record: {},
  },
  logAnalitik: {
    loading: false,
    error: '',
    records: [],
  },
  user: null,
  error: null,
};

export const DATA_ANALYTIC_SLICE = 'DATA_ANALYTIC_SLICE';

export const getListAnalitik = createAsyncThunk('cmsDataAnalytic/getListAnalitik', async (params) => {
  const response = await post(
    `${apiUrls.cmsAnalitikData}/list`,
    {
      title: params.judul,
    },
    {
      query: {
        size: 10,
        page: params.page + 1,
      },
    },
  );
  return response?.data?.content;
});

export const getAllAnalitik = createAsyncThunk('cmsDataAnalytic/getAllAnalitik', async () => {
  const response = await post(
    `${apiUrls.cmsAnalitikData}/public/list`,
    {
      title: '',
    },
    {
      query: {
        size: 1000,
        page: 1,
      },
    },
  );
  return response?.data?.content;
});

export const setNewAnalitik = createAsyncThunk('cmsDataAnalytic/setNewAnalitik', async (params) => {
  const response = await post(`${apiUrls.cmsAnalitikData}/create`, params.payload);
  return response?.data?.content;
});

export const setEditAnalitik = createAsyncThunk('cmsDataAnalytic/setEditAnalitik', async (params) => {
  const response = await post(`${apiUrls.cmsAnalitikData}/update`, params.payload);
  return response?.data?.content;
});

const dataAnalyticSlice = createSlice({
  name: DATA_ANALYTIC_SLICE,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListAnalitik.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListAnalitik.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page - 1;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getListAnalitik.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching analitik!';
    });

    builder.addCase(getAllAnalitik.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getAllAnalitik.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getAllAnalitik.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching analitik!';
    });

    builder.addCase(setNewAnalitik.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setNewAnalitik.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setNewAnalitik.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching create analitik data!';
    });

    builder.addCase(setEditAnalitik.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setEditAnalitik.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setEditAnalitik.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching edit berita!';
    });
  },
});

export const analitikCmsListSelector = (state) => state.cmsDataAnalytic?.dataset;
export const detailDataSelector = (state) => state.cmsDataAnalytic?.detaildataSet;

export const { updateResult } = dataAnalyticSlice.actions;
export default dataAnalyticSlice.reducer;
