import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AboutUs } from 'services/CMS';
import { apiUrls, get, put, post } from 'utils/request';

export const filterAboutUs = createAsyncThunk('cms/aboutUs/filterList', async ({ page, size }) => {
  return AboutUs.filterTentang(page, size);
});

export const getListTentang = createAsyncThunk('cms/getListTentang', async (params) => {
  const response = await get(apiUrls.cmsAboutUs, { query: { page: params.page } });
  return response?.data?.content;
});

export const getAboutUs = createAsyncThunk('cms/aboutUs/getDetail', async (id) => {
  const response = await get(`${apiUrls.cmsAboutUs}/${id}`);
  return response?.data?.content;
});

export const getAboutUsLogs = createAsyncThunk('cms/aboutUs/getDetailLogs', async (id) => {
  const response = await get(`${apiUrls.cmsAboutUs}/${id}/logs`);
  return response?.data?.content;
});

export const doAboutUs = createAsyncThunk('cms/aboutUs/doAboutUs', async ({ id, action }) => {
  const response = await post(`${apiUrls.cmsAboutUs}/${id}/${action}`, {});
  return response?.data?.content;
});

export const updateAboutUs = createAsyncThunk('cms/aboutUs/updateAboutUs', async (params) => {
  const response = await put(`${apiUrls.cmsAboutUs}/${params.id}`, params);
  return response?.data?.content;
});

const REDUCER_NAME = 'ABOUT_US_REDUCER';

const INITIAL_STATE = {
  dataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    message: null,
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
    builder.addCase(filterAboutUs.pending, (state, action) => {
      state.dataset.status = 'loading';
    });
    builder.addCase(filterAboutUs.fulfilled, (state, action) => {
      state.dataset.status = 'idle';
      state.dataset.page = action.payload.page;
      state.dataset.size = action.payload.size;
      state.dataset.records = action.payload.records;
    });
    builder.addCase(filterAboutUs.rejected, (state, action) => {
      state.dataset.status = 'error';
      state.dataset.message = action.error.message;
    });

    builder.addCase(getListTentang.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getListTentang.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.size = action.payload.size;
      state.dataset.records = action.payload.records;
    });
    builder.addCase(getListTentang.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.dataset.message = action.error.message;
    });

    builder.addCase(getAboutUs.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getAboutUs.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.record = action.payload;
    });
    builder.addCase(getAboutUs.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.error = action.error.message;
    });

    builder.addCase(getAboutUsLogs.pending, (state, action) => {
      state.logdataset.loading = true;
    });
    builder.addCase(getAboutUsLogs.fulfilled, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.records = action.payload.reverse();
    });
    builder.addCase(getAboutUsLogs.rejected, (state, action) => {
      state.logdataset.loading = false;
      state.logdataset.error = action.error.message;
    });

    builder.addCase(doAboutUs.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(doAboutUs.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.record = action.payload;
    });
    builder.addCase(doAboutUs.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.error = action.error.message;
    });

    builder.addCase(updateAboutUs.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(updateAboutUs.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.record = action.payload;
    });
    builder.addCase(updateAboutUs.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.detailDataset.error = action.error.message;
    });
  },
});

export const tentangDatasetSelector = (state) => state.cmsTentang?.dataset;
export const tentangDetailSelector = (state) => state.cmsTentang?.detailDataset;
export const logDatasetSelector = (state) => state.cmsTentang?.logdataset;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
