import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';

export const initialState = {
  loading: false,
  result: null,
  user: null,
  error: null,
};

export const PERMINTAAN_DATA = 'PERMINTAAN_DATA';

export const getDataSet = createAsyncThunk('permintaan-data/getDataset', async (params) => {
  let data = cloneDeep(params);
  return { data };
});

const permintaanDataSlice = createSlice({
  name: PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataSet.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDataSet.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload;
    });
    builder.addCase(getDataSet.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const permintaanDataSelector = (state) => state.permintaanData?.result;

export default permintaanDataSlice.reducer;
