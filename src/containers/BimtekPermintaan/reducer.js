import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const getBimtekPermintaan = createAsyncThunk(
  'bimtekPermintaan/getBimtekPermintaan',
  async ({ id = '', ...params }) => {
    const url = `${apiUrls.bimtekPermintaan}${id ? `/${id}` : ''}`;
    const response = await get(url, {
      query: {
        page: params.page + 1,
      },
    });
    return response?.data?.content;
  },
);

export const getBimtekLogs = createAsyncThunk('bimtekDokumentasi/getBimtekLogs', async (params) => {
  const response = await get(`${apiUrls.bimtekLogs}/${params.id}`);
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_PERMINTAAN_REDUCER';

const INITIAL_STATE = {
  permintaanDataset: {
    status: 'idle',
    records: [],
    singleRecord: [],
    page: 0,
    size: defaultNumberOfRows,
    totalRecords: 0,
    totalPages: 1,
    message: null,
  },
  logDataset: {
    status: 'idle',
    records: [],
    singleRecord: [],
    page: 0,
    size: defaultNumberOfRows,
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
      state.permintaanDataset.page = action.payload.page - 1;
      state.permintaanDataset.totalPages = action.payload.totalPages;
      state.permintaanDataset.totalRecords = action.payload.totalRecords;
      if (!action.payload.records) {
        state.permintaanDataset.singleRecord = action.payload;
      }
    });
    builder.addCase(getBimtekPermintaan.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.permintaanDataset.message = action.error.message;
    });
    builder.addCase(getBimtekLogs.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekLogs.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.logDataset.records = action.payload.records;
      state.logDataset.page = action.payload.page;
      state.logDataset.size = action.payload.size;
      state.logDataset.totalPages = action.payload.totalPages;
      state.logDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekLogs.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.logDataset.message = action.error.message;
    });
  },
});

export const bimtekPermintaan = (state) => state.bimtekPermintaan?.permintaanDataset;
export const bimtekLogs = (state) => state.bimtekPermintaan?.logDataset;
export default SLICE_OBJ.reducer;
