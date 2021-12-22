import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekDokumentasi = createAsyncThunk('bimtekDokumentasi/getBimtekDokumentasi', async (params) => {
  const response = await get(apiUrls.bimtekDokumentasi, {
    query: params,
  });
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_DOKUMENTASI_REDUCER';

const INITIAL_STATE = {
  bimtekDokumentasiDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 1,
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
    builder.addCase(getBimtekDokumentasi.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekDokumentasi.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.bimtekDokumentasiDataset.records = action.payload.records;
      state.bimtekDokumentasiDataset.page = action.payload.page;
      state.bimtekDokumentasiDataset.size = action.payload.size;
      state.bimtekDokumentasiDataset.totalPages = action.payload.totalPages;
      state.bimtekDokumentasiDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekDokumentasi.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.bimtekDokumentasiDataset.message = action.error.message;
    });
  },
});

export const bimtekDokumentasiDatasetSelector = (state) => state.bimtekDokumentasi?.bimtekDokumentasiDataset;
export default SLICE_OBJ.reducer;
