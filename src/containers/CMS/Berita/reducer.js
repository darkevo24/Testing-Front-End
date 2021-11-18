import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CMSBerita } from 'services/CMS';

export const filterBerita = createAsyncThunk('cms/berita/filterList', async ({ page, size }) => {
  return CMSBerita.filterBerita(page, size);
});

const REDUCER_NAME = 'BERITA_REDUCER';

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
    builder.addCase(filterBerita.pending, (state, action) => {
      state.dataset.status = 'loading';
    });
    builder.addCase(filterBerita.fulfilled, (state, action) => {
      state.dataset.status = 'idle';
      state.dataset.page = action.payload.page;
      state.dataset.size = action.payload.size;
      state.dataset.records = action.payload.records;
    });
    builder.addCase(filterBerita.rejected, (state, action) => {
      state.dataset.status = 'error';
      state.dataset.message = action.error.message;
    });
  },
});

export default SLICE_OBJ.reducer;
