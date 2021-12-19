import { CMSBerita } from 'services/CMS';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const REDUCER_NAME = 'BERTA_LAYOUT_REDUCER';

export const getBertaLayout = createAsyncThunk('public/v1/layout/v1', async () => {
  return CMSBerita.getBertaLayout();
});

const INITIAL_STATE = {
  error: null,
  status: 'idle',
  code: '',
  content: {
    kiri: [],
    kanan: [],
    inactive: [],
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBertaLayout.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getBertaLayout.fulfilled, (state, action) => {
      const { code = null, content = {} } = action?.payload;
      state.status = 'idle';
      state.content = content;
      state.code = code;
    });
    builder.addCase(getBertaLayout.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});
export const beritaLayoutSelector = (state) => state;
export default SLICE_OBJ.reducer;
