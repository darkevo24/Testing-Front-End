import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post } from 'utils/request';

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
    error: null,
    records: [],
  },
  logs: {
    loading: false,
    error: null,
    records: [],
  },
  instansi: {
    loading: false,
    error: null,
    records: [],
  },
  status: null,
  loading: false,
};

export const BIMTEK_PERMINTAAN_DATA = 'BIMTEK_PERMINTAAN_DATA';

export const getPermintaanData = createAsyncThunk('permintaan-data/bimtek', async (params) => {
  const response = await get(apiUrls.cmsBimtekPermintaanData, {
    query: { page: params.page + 1, size: 10, q: params.q, instansiId: params.instansiId },
  });
  console.log(response);
  return response;
});

export const getPermintaanDataDetail = createAsyncThunk('permintaan-data/detail', async (params) => {
  const response = await get(apiUrls.cmsBimtekPermintaanData + '/' + params.id);
  return response;
});

export const getListLogAktifitas = createAsyncThunk('permintaan-data/logs', async (params) => {
  const response = await get(apiUrls.cmsBimtekLogs + '/' + params.id);
  return response;
});

export const getInstansi = createAsyncThunk('permintaan-data-bimtek/instansi', async (params) => {
  const response = await get(`${apiUrls.instansiData}`);
  console.log(response);
  return response?.data.content?.records;
});

export const postStatusApprove = createAsyncThunk('/permintaan-data-bimtek/status-approve', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/APPROVED`, { catatan: 'test' });
  console.log(response);
  return response;
});

export const postStatusReject = createAsyncThunk('/permintaan-data-bimtek/status-approve', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/REJECTED`, { catatan: 'test' });
  return response;
});

const BimtekPermintaanDataDetailSlice = createSlice({
  name: BIMTEK_PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermintaanData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getPermintaanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page;
      state.dataset.totalPages = action.payload.data.content.totalPages;
      state.dataset.totalRecords = action.payload.data.content.totalRecords;
    });
    builder.addCase(getPermintaanData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getInstansi.pending, (state, action) => {
      state.instansi.loading = true;
    });
    builder.addCase(getInstansi.fulfilled, (state, action) => {
      state.instansi.loading = false;
      state.instansi.records = action.payload;
    });
    builder.addCase(getInstansi.rejected, (state, action) => {
      state.instansi.loading = false;
      state.instansi.error = 'Invalid data';
    });
    builder.addCase(getListLogAktifitas.pending, (state, action) => {
      state.logs.loading = true;
    });
    builder.addCase(getListLogAktifitas.fulfilled, (state, action) => {
      state.logs.loading = false;
      state.logs.records = action.payload.data.content.records;
    });
    builder.addCase(getListLogAktifitas.rejected, (state, action) => {
      state.logs.loading = false;
      state.logs.error = 'Invalid data';
    });
    builder.addCase(getPermintaanDataDetail.pending, (state, action) => {
      state.detail.loading = true;
    });
    builder.addCase(getPermintaanDataDetail.fulfilled, (state, action) => {
      state.detail.loading = false;
      state.detail.records = action.payload.data.content;
    });
    builder.addCase(getPermintaanDataDetail.rejected, (state, action) => {
      state.detail.loading = false;
      state.detail.error = 'Invalid data';
    });
    builder.addCase(postStatusApprove.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postStatusApprove.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(postStatusApprove.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const BimtekPermintaanDataSelector = (state) => state.cmsBimtekPermintaan.dataset;
export const BimtekLogSelector = (state) => state.cmsBimtekPermintaan.logs;
export const BimtekPermintaanDataDetail = (state) => state.cmsBimtekPermintaan?.detail?.records;
export const BimtekInstansi = (state) => state.cmsBimtekPermintaan?.instansi?.records;

export default BimtekPermintaanDataDetailSlice.reducer;
