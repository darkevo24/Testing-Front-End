import { CMSBerita } from 'services/CMS';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const REDUCER_NAME = 'BERTA_LAYOUT_REDUCER';

export const getBertaLayout = createAsyncThunk('bertaLayout/getBertaLayout', async () => {
  return CMSBerita.getBertaLayout();
});

export const updateBertalayout = createAsyncThunk('beritaLayout/updateBeritaLayout', async ({ code, content }) => {
  return CMSBerita.updateBertaLayout(code, content);
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
    defaultLayout: [],
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateBeritaLaoutState: (state, action) => {
      const { payload } = action;
      state.dataset.content.records = state.dataset.content.records.map((record) => {
        if (record.code === 'kiri') {
          record.content = JSON.stringify(payload.content);
        }
        return record;
      });
    },
    resetBertaLayout: (state, action) => {
      state.dataset.content.records = [...state.dataset.defaultLayout];
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
      state.dataset.defaultLayout = records;
    });
    builder.addCase(getBertaLayout.rejected, (state, action) => {
      state.dataset.status = 'error';
      state.dataset.error = action.error.message;
    });

    /**
     * update berita layout
     */
    builder.addCase(updateBertalayout.pending, (state) => {
      state.dataset.status = 'loading';
    });
    builder.addCase(updateBertalayout.fulfilled, (state, action) => {
      const { content } = action.payload;
      state.dataset.status = 'idle';
      state.dataset.content = {
        ...state.dataset.content,
        records: [...state.dataset.content.records, content],
      };
    });
    builder.addCase(updateBertalayout.rejected, (state) => {
      state.dataset.status = 'error';
    });
  },
});
export const beritaLayoutSelector = (state) => state.cms?.bertaLayout?.dataset;
export const { updateBeritaLaoutState, resetBertaLayout } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
