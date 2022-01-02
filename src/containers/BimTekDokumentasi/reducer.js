import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekDokumentasi = createAsyncThunk('bimtekDokumentasi/getBimtekDokumentasi', async (params) => {
  let response;
  let url = apiUrls.bimtekDokumentasi;
  if (params.id) {
    url += `/${params.id}`;
    response = await get(url);
  } else {
    response = await get(url, {
      query: params,
    });
  }
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_DOKUMENTASI_REDUCER';

const INITIAL_STATE = {
  documentasiDataset: {
    status: 'idle',
    records: [],
    singleRecord: [],
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
    builder.addCase(getBimtekDokumentasi.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekDokumentasi.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      if (!action?.payload?.records) {
        state.documentasiDataset.singleRecord = action.payload;
      } else {
        state.documentasiDataset.records = action.payload.records;
      }
    });
    builder.addCase(getBimtekDokumentasi.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.documentasiDataset.message = action.error.message;
    });
  },
});

export const bimtekDokumentasi = (state) => state.bimtekDokumentasi?.documentasiDataset;
export default SLICE_OBJ.reducer;
