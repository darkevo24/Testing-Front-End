import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AboutUs } from 'services/CMS';

export const filterAboutUs = createAsyncThunk('cms/aboutUs/filterList', async ({ page, size }) => {
  return AboutUs.filterTentang(page, size);
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
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
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
  },
});

export default SLICE_OBJ.reducer;
