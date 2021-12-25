import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekPermintaan = createAsyncThunk('bimtekPermintaan/getBimtekPermintaan', async (params) => {
  const response = await get(apiUrls.bimtekPermintaan, {
    query: params,
  });
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_PERMINTAAN_REDUCER';

const INITIAL_STATE = {
  permintaanDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    totalRecords: 0,
    totalPages: 1,
    message: null,
  },
  detailDataset: {
    loading: false,
    error: '',
    record: {},
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(getBimtekPermintaan.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekPermintaan.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.permintaanDataset.records = action.payload.records;
      state.permintaanDataset.page = action.payload.page;
      state.permintaanDataset.size = action.payload.size;
      state.permintaanDataset.totalPages = action.payload.totalPages;
      state.permintaanDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekPermintaan.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.permintaanDataset.message = action.error.message;
    });
  },
});

export const bimtekPermintaan = (state) => state.bimtekPermintaan?.permintaanDataset;
export default SLICE_OBJ.reducer;
