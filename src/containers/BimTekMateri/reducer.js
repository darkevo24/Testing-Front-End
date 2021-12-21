import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekMateri = createAsyncThunk('bimtekMateri/getBimtekMateri', async (params) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const response = await get(`${apiUrls.bimtekMateri}?${queryParams}`);
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_MATERI_REDUCER';

const INITIAL_STATE = {
  materiDataset: {
    status: 'idle',
    records: [],
    allRecords: [],
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
    builder.addCase(getBimtekMateri.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekMateri.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.materiDataset.records = action.payload.records;
      state.materiDataset.page = action.payload.page;
      state.materiDataset.size = action.payload.size;
      state.materiDataset.totalPages = action.payload.totalPages;
      state.materiDataset.totalRecords = action.payload.totalRecords;

      if (state.materiDataset.allRecords.length === 0) {
        state.materiDataset.allRecords = action.payload.records;
      }
    });
    builder.addCase(getBimtekMateri.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.materiDataset.message = action.error.message;
    });
  },
});

export const bimtekMateri = (state) => state.bimtekMateri?.materiDataset;
export default SLICE_OBJ.reducer;
