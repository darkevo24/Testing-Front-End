import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
  detail: {
    loading: false,
    records: [],
  },
  log: {
    loading: false,
    error: null,
    dataLog: [],
  },
};

export const BIMTEK_JADWAL = 'BIMTEK_JADWAL';

export const getJadwalBimtek = createAsyncThunk('bimtek-jadwal/getListJadwalBimtek', async (params) => {
  const response = await get(apiUrls.cmsBimtekJadwal, {
    query: { page: params.page + 1, size: 10, namaBimtek: params.namaBimtek },
  });
  return response;
});

export const getJadwalBimtekDetail = createAsyncThunk('bimtek-jadwal/getListJadwalDetailBimtek', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekJadwal}/${params}`);
  return response;
});

export const getListLogAktifitas = createAsyncThunk('bimtek-jadwal/getListLogs', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekLogs}/${params}`);
  return response?.data?.content?.records;
});

const BimtekJadwalSlice = createSlice({
  name: BIMTEK_JADWAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJadwalBimtek.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getJadwalBimtek.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page - 1;
      state.dataset.totalPages = action.payload.data.content.totalPages;
      state.dataset.totalRecords = action.payload.data.content.totalRecords;
    });
    builder.addCase(getJadwalBimtek.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getJadwalBimtekDetail.pending, (state, action) => {
      state.detail.loading = true;
    });
    builder.addCase(getJadwalBimtekDetail.fulfilled, (state, action) => {
      state.detail.loading = false;
      state.detail.records = action.payload.data?.content;
    });
    builder.addCase(getJadwalBimtekDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
    builder.addCase(getListLogAktifitas.pending, (state, action) => {
      state.log.loading = true;
    });
    builder.addCase(getListLogAktifitas.fulfilled, (state, action) => {
      state.log.loading = false;
      state.log.dataLog = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getListLogAktifitas.rejected, (state, action) => {
      state.log.loading = false;
      state.log.error = 'Invalid data';
    });
  },
});

export const bimtekJadwalSelector = (state) => state.cmsBimtekJadwal.dataset;
export const bimtekJadwalDetailSelector = (state) => state.cmsBimtekJadwal.detail;
export const bimtekLogAktifitas = (state) => state.cmsBimtekJadwal.log;

export default BimtekJadwalSlice.reducer;
