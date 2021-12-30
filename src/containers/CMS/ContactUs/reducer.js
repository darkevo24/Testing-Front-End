import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, put, post } from 'utils/request';

export const getListKontak = createAsyncThunk('cmsContactUs/getListKontak', async (params) => {
  const response = await get(apiUrls.cmsContactUs);
  return response?.data?.content;
});

export const getDetailKontak = createAsyncThunk('cmsContactUs/getDetailKontak', async (params) => {
  const response = await get(`${apiUrls.cmsContactUs}/${params.id}`);
  return response?.data?.content;
});

export const getLogKontak = createAsyncThunk('cmsContactUs/getLogKontak', async (params) => {
  const response = await get(`${apiUrls.cmsContactUs}/${params.id}/logs`);
  return response?.data?.content;
});

export const updateKontak = createAsyncThunk('cmsContactUs/updateKontak', async (params) => {
  const response = await put(`${apiUrls.cmsContactUs}/${params.payload.id}`, params.payload);
  return response?.data?.content;
});

export const updateStatusKontak = createAsyncThunk('cmsContactUs/updateStatusKontak', async (params) => {
  const notes = params.note ? params.note : '';
  const response = await post(`${apiUrls.cmsContactUs}/${params.id}/${params.action}?notes=${notes}`);
  return response?.data?.content;
});

const REDUCER_NAME = 'CONTACT_US';

const INITIAL_STATE = {
  dataset: {
    records: [],
    totalPages: 1,
    page: 1,
    size: 10,
    message: '',
    loading: false,
  },
  detailDataset: {
    loading: false,
    error: '',
    record: {},
  },
  logdataset: {
    loading: false,
    error: '',
    records: [],
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListKontak.pending, (state) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListKontak.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.totalPages = action.payload.totalPages;
      state.dataset.records = action.payload.records;
    });
    builder.addCase(getListKontak.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.message = action.error.message;
    });

    builder.addCase(getDetailKontak.pending, (state) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getDetailKontak.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.record = action.payload;
    });
    builder.addCase(getDetailKontak.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.message = action.error.message;
    });

    builder.addCase(getLogKontak.fulfilled, (state, action) => {
      state.logdataset.records = action.payload.reverse();
    });
    builder.addCase(getLogKontak.rejected, (state, action) => {
      state.logdataset.message = action.error.message;
    });
  },
});

export const contactListSelector = (state) => state.cmsContactUs?.dataset;
export const contactDetailSelector = (state) => state.cmsContactUs?.detailDataset;
export const logDataSelector = (state) => state.cmsContactUs?.logdataset;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
