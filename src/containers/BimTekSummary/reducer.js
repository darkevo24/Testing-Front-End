import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekSummaryMateriTerdekat = createAsyncThunk('getBimtekSummaryMateriTerdekat', async (params) => {
  const response = await get(apiUrls.bimtekSummaryMateriTerdekat);
  return response?.data?.content;
});
export const getBimtekSummaryJadwalTerdekat = createAsyncThunk('getBimtekSummaryJadwalTerdekat', async (params) => {
  const response = await get(apiUrls.bimtekSummaryJadwalTerdekat);
  return response?.data?.content;
});
export const getBimtekLatestDokumentasi = createAsyncThunk('getBimtekLatestDokumentasi', async (params) => {
  const response = await get(apiUrls.bimteklatestDokumentasi);
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_SUMMARY_REDUCER';

const INITIAL_STATE = {
  materiTerdekatDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    message: null,
  },
  jadwalTerdekatDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    message: null,
  },
  dokumentasiDataset: {
    loading: false,
    status: 'idle',
    records: [],
    message: null,
  },
  detailDataset: {
    loading: false,
    error: '',
    record: {},
  },
  logdataset: {
    loading: false,
    error: '',
    records: [],
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBimtekSummaryMateriTerdekat.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekSummaryMateriTerdekat.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.materiTerdekatDataset.records = action.payload;
    });
    builder.addCase(getBimtekSummaryMateriTerdekat.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.materiTerdekatDataset.message = action.error.message;
    });
    builder.addCase(getBimtekSummaryJadwalTerdekat.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekSummaryJadwalTerdekat.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.jadwalTerdekatDataset.records = action.payload;
    });
    builder.addCase(getBimtekSummaryJadwalTerdekat.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.jadwalTerdekatDataset.message = action.error.message;
    });
    builder.addCase(getBimtekLatestDokumentasi.pending, (state, action) => {
      state.dokumentasiDataset.loading = true;
    });
    builder.addCase(getBimtekLatestDokumentasi.fulfilled, (state, action) => {
      state.dokumentasiDataset.loading = false;
      state.dokumentasiDataset.records = action.payload;
    });
    builder.addCase(getBimtekLatestDokumentasi.rejected, (state, action) => {
      state.dokumentasiDataset.loading = false;
      state.dokumentasiDataset.message = action.error.message;
    });
  },
});

export const bimtekSummaryMateriTerdekatDatasetSelector = (state) => state.bimtekSummary?.materiTerdekatDataset;
export const bimtekSummaryJadwalTerdekatDatasetSelector = (state) => state.bimtekSummary?.jadwalTerdekatDataset;
export const bimtekSummaryDetailSelector = (state) => state.bimtekSummary?.detailDataset;
export const bimtekLatestDokumentasiSelector = (state) => state.bimtekSummary?.dokumentasiDataset;
export const logDatasetSelector = (state) => state.bimtekSummary?.logdataset;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
