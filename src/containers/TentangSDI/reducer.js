import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AboutUs } from 'services/CMS';

export const getTentang = createAsyncThunk('tentang/getTentang', async () => {
  return AboutUs.getPublicTentang();
});

const REDUCER_NAME = 'tentang';

const INITIAL_STATE = {
  status: 'idle',
  tentang_list: [],
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTentang.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getTentang.fulfilled, (state, action) => {
      state.status = 'idle';
      state.tentang_list = action.payload;
      console.log(action);
    });
  },
});

export default SLICE_OBJ.reducer;
