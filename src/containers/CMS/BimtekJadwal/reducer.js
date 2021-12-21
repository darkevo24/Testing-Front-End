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
};

export const BIMTEK_JADWAL = 'BIMTEK_JADWAL';

export const getJadwalBimtek = createAsyncThunk('permintaan-data/bimtek-jadwal', async (params) => {
  const response = await get(apiUrls.cmsBimtekJadwal, {
    query: { page: params.page + 1, size: 10, namaBimtek: params.namaBimtek },
  });
  return response;
});

export const getJadwalBimtekDetail = createAsyncThunk('permintaan-data/bimtek-jadwal-detail', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekJadwal}/${params}`);
  console.log(response);
  return response;
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
      console.log(action.payload);
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page;
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
      console.log(action.payload);
      state.detail.loading = false;
      state.detail.records = action.payload.data?.content;
    });
    builder.addCase(getJadwalBimtekDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const BimtekJadwalSelector = (state) => state.cmsBimtekJadwal.dataset;
export const BimtekJadwalDetailSelector = (state) => state.cmsBimtekJadwal.detail;

export default BimtekJadwalSlice.reducer;
