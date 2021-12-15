import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getTentang = createAsyncThunk('tentang/getTentang', async () => {
  const response = await get(apiUrls.aboutUs, {});
  return response?.data?.content[0];
});

const REDUCER_NAME = 'tentang';

const INITIAL_STATE = {
  status: 'idle',
  tentang_list: [],
  dataset: null,
  loading: false,
  error: '',
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateResult: (state, action) => {
      state.dataset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTentang.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTentang.fulfilled, (state, action) => {
      state.loading = false;
      state.dataset = action.payload;
    });
    builder.addCase(getTentang.rejected, (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export const tentangPublicSelector = (state) => state.tentang;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
