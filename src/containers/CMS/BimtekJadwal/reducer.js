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
    loadingJadwalDetail: false,
    records: [],
  },
  log: {
    loading: false,
    error: null,
    dataLog: [],
  },
  bimtekJadwalTags: {
    tagsResult: [],
    tagsLoading: false,
    tagsError: null,
  },
  bimtekListKabupaten: {
    listKabupaten: [],
    tagsLoading: false,
    tagsError: null,
  },
};

export const BIMTEK_JADWAL = 'BIMTEK_JADWAL';

export const getJadwalBimtek = createAsyncThunk('bimtek-jadwal/getListJadwalBimtek', async (params) => {
  const response = await get(apiUrls.cmsBimtekJadwal, {
    query: {
      ...params,
      page: params.page + 1,
    },
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

export const getListBimtekTags = createAsyncThunk('bimtek-jadwal/getListTags', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekJadwal}/tags`);
  return response?.data?.content;
});

export const getListBimtekKabupaten = createAsyncThunk('bimtek-jadwal/getListKabupaten', async (params) => {
  const response = await get(apiUrls.bimtekJadwalLocations);
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
      state.detail.loadingJadwalDetail = true;
    });
    builder.addCase(getJadwalBimtekDetail.fulfilled, (state, action) => {
      state.detail.loadingJadwalDetail = false;
      state.detail.records = action.payload.data?.content;
    });
    builder.addCase(getJadwalBimtekDetail.rejected, (state, action) => {
      state.loadingJadwalDetail = false;
      state.error = 'Invalid data';
    });
    builder.addCase(getListLogAktifitas.pending, (state, action) => {
      state.log.loading = true;
    });
    builder.addCase(getListLogAktifitas.fulfilled, (state, action) => {
      state.log.loading = false;
      state.log.dataLog = action.payload;
    });
    builder.addCase(getListLogAktifitas.rejected, (state, action) => {
      state.log.loading = false;
      state.log.error = 'Invalid data';
    });
    builder.addCase(getListBimtekTags.pending, (state, action) => {
      state.bimtekJadwalTags.tagsLoading = true;
    });
    builder.addCase(getListBimtekTags.fulfilled, (state, action) => {
      state.bimtekJadwalTags.tagsLoading = false;
      state.bimtekJadwalTags.tagsResult = action.payload;
    });
    builder.addCase(getListBimtekTags.rejected, (state, action) => {
      state.bimtekJadwalTags.tagsLoading = false;
      state.bimtekJadwalTags.tagsError = 'Invalid data';
    });
    builder.addCase(getListBimtekKabupaten.pending, (state, action) => {
      state.bimtekListKabupaten.tagsLoading = true;
    });
    builder.addCase(getListBimtekKabupaten.fulfilled, (state, action) => {
      state.bimtekListKabupaten.tagsLoading = false;
      state.bimtekListKabupaten.listKabupaten = action.payload;
    });
    builder.addCase(getListBimtekKabupaten.rejected, (state, action) => {
      state.bimtekListKabupaten.tagsLoading = false;
      state.bimtekListKabupaten.tagsError = 'Invalid data';
    });
  },
});

export const bimtekJadwalSelector = (state) => state.cmsBimtekJadwal.dataset;
export const bimtekJadwalDetailSelector = (state) => state.cmsBimtekJadwal.detail;
export const bimtekLogAktifitas = (state) => state.cmsBimtekJadwal.log;
export const bimtekJadwalTags = (state) => state.cmsBimtekJadwal.bimtekJadwalTags;
export const bimtekListKabupaten = (state) => state.cmsBimtekJadwal.bimtekListKabupaten;

export default BimtekJadwalSlice.reducer;
