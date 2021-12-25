import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, post, put, get, deleteRequest } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 1,
    status: '',
    records: [],
    size: 10,
    totalRecords: 0,
    totalPages: 1,
  },
};

export const SOSMED_SLICE = 'SOSMED_SLICE';

export const getListSosMed = createAsyncThunk('cms/getListSosMed', async () => {
  const response = await get(apiUrls.sosialMedia);
  return response?.data?.content;
});

export const deleteSosMed = createAsyncThunk('cms/deleteSosMed', async (params) => {
  const response = await deleteRequest(`${apiUrls.sosialMedia}/${params.id}`);
  return response?.data?.content;
});

export const createSosMed = createAsyncThunk('cms/createSosMed', async (params) => {
  const response = await post(apiUrls.sosialMedia, params.payload);
  return response?.data?.content;
});

export const editSosMed = createAsyncThunk('cms/editSosMed', async (params) => {
  const response = await put(`${apiUrls.sosialMedia}/${params.payload.id}`, params.payload);
  return response?.data?.content;
});

const sosmedSlice = createSlice({
  name: SOSMED_SLICE,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListSosMed.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListSosMed.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getListSosMed.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching sosial media!';
    });

    builder.addCase(deleteSosMed.pending, (state) => {
      state.dataset.loading = true;
    });
    builder.addCase(deleteSosMed.fulfilled, (state, action) => {
      state.dataset.loading = false;
    });
    builder.addCase(deleteSosMed.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
    });

    builder.addCase(createSosMed.pending, (state) => {
      state.dataset.loading = true;
    });
    builder.addCase(createSosMed.fulfilled, (state, action) => {
      state.dataset.loading = false;
    });
    builder.addCase(createSosMed.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
    });

    builder.addCase(editSosMed.pending, (state) => {
      state.dataset.loading = true;
    });
    builder.addCase(editSosMed.fulfilled, (state, action) => {
      state.dataset.loading = false;
    });
    builder.addCase(editSosMed.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
    });
  },
});

export const getListSelector = (state) => state.sosialMedia?.dataset;

export const { updateResult } = sosmedSlice.actions;
export default sosmedSlice.reducer;
