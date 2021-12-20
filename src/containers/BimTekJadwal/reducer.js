import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekJadwalData = createAsyncThunk('bimtekJadwal/getBimtekJadwalData', async (params) => {
  const response = await get(params ? `${apiUrls.bimtekJadwal}?tags=${params.tags}` : apiUrls.bimtekJadwal);
  return response?.data?.content;
});

export const getBimtekJadwalTagsData = createAsyncThunk('bimtekJadwal/getBimtekJadwalTagsData', async (params) => {
  const response = await get(apiUrls.bimtekJadwalTags);
  return response?.data;
});

const REDUCER_NAME = 'BIMTEK_JADWAL_REDUCER';

const INITIAL_STATE = {
  jadwalDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    totalPages: 1,
    totalRecords: 0,
    message: null,
  },
  jadwalTagsDataset: {
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
  extraReducers: (builder) => {
    builder.addCase(getBimtekJadwalData.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekJadwalData.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.jadwalDataset.records = action.payload.records;
      state.jadwalDataset.page = action.payload.page;
      state.jadwalDataset.page = action.payload.page;
      state.jadwalDataset.totalPages = action.payload.totalPages;
      state.jadwalDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekJadwalData.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.jadwalDataset.message = action.error.message;
    });

    builder.addCase(getBimtekJadwalTagsData.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekJadwalTagsData.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.jadwalTagsDataset.records = action.payload.content;
      state.jadwalTagsDataset.status = action.payload.status;
      state.jadwalTagsDataset.message = action.payload.message;
    });
    builder.addCase(getBimtekJadwalTagsData.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.jadwalTagsDataset.message = action.error.message;
    });
  },
});

export const bimtekJadwalDatasetSelector = (state) => state.bimtekJadwal?.jadwalDataset;
export const bimtekJadwalDatasetDetailSelector = (state) => state.bimtekJadwal?.detailDataset;
export const bimtekJadwalTagsDatasetSelector = (state) => state.bimtekJadwal?.jadwalTagsDataset.records;
export const logDatasetSelector = (state) => state.bimtekJadwal?.logdataset;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
