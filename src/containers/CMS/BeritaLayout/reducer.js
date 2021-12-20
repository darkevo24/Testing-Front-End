import { CMSBerita } from 'services/CMS';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const REDUCER_NAME = 'BERTA_LAYOUT_REDUCER';

export const getBertaLayout = createAsyncThunk('public/v1/layout/v1', async () => {
  return CMSBerita.getBertaLayout();
});

const INITIAL_STATE = {
  dataset: {
    error: null,
    status: 'idle',
    code: '',
    content: {
      hasNext: false,
      page: 1,
      records: [],
      size: 10,
      totalPages: 1,
      totalRecords: 2,
    },
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateBeritaLaout: (state, action) => {
      const { payload } = action;
      return {
        ...state.dataset,
        content: {
          ...state.dataset.content,
          records: [...state.dataset.content.records, payload],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBertaLayout.pending, (state, action) => {
      state.dataset.status = 'loading';
    });
    builder.addCase(getBertaLayout.fulfilled, (state, action) => {
      const { hasNext, page, records, size, totalPages, totalRecords } = action.payload;
      state.dataset.status = 'idle';
      state.dataset.content = {
        ...state.dataset.content,
        hasNext: hasNext,
        page: page,
        records: records,
        size: size,
        totalPages: totalPages,
        totalRecords: totalRecords,
      };
    });
    builder.addCase(getBertaLayout.rejected, (state, action) => {
      state.dataset.status = 'error';
      state.dataset.error = action.error.message;
    });
  },
});
export const beritaLayoutSelector = (state) => state.cms?.bertaLayout?.dataset;
export const { updateBeritaLaout } = SLICE_OBJ.actions;

export default SLICE_OBJ.reducer;
