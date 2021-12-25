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

export const getPermintaanData = createAsyncThunk('bimtek-permintaan/getListBimtek', async (params) => {
  const response = await get(apiUrls.cmsBimtekPermintaanData, {
    query: { page: params.page + 1, size: 10, namaBimtek: params.q, instansiId: params.instansiId },
  });
  console.log(params.page);
  console.log(response);
  return response;
});

export const getPermintaanDataDetail = createAsyncThunk('bimtek-permintaan/getListBimtekDetail', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekPermintaanData}/${params.id}`);
  return response;
});

export const getListLogAktifitas = createAsyncThunk('bimtek-permintaan/getListLogs', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekLogs}/${params.id}`);
  return response;
});

export const getInstansi = createAsyncThunk('bimtek-permintaan-bimtek/getListInstansi', async (params) => {
  const response = await get(`${apiUrls.instansiData}`);
  return response?.data.content?.records;
});

export const postStatusApprove = createAsyncThunk('/bimtek-permintaan/changeStatusDetailApproved', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/APPROVED`, { catatan: 'test' });
  return response;
});

export const postStatusReject = createAsyncThunk('/bimtek-permintaan/changeStatusDetailRejected', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/REJECTED`, { catatan: 'test' });
  return response;
});

export const postStatusDraft = createAsyncThunk('/bimtek-permintaan/changeStatusDetailDraft', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/DRAFT`, { catatan: 'test' });
  return response;
});

export const postStatusPublish = createAsyncThunk('/bimtek-permintaan/changeStatusDetailPublish', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/PUBLISHED`, { catatan: 'test' });
  return response;
});

export const postStatusUnpublish = createAsyncThunk('/bimtek-permintaan/changeStatusDetailUnpublish', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/ubah-status/UNPUBLISH`, { catatan: 'test' });
  return response;
});

const BimtekPermintaanDataDetailSlice = createSlice({
  name: BIMTEK_PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPermintaanData.pending, (state, action) => {
      state.dataset.page = 0;
      state.dataset.loading = true;
    });
    builder.addCase(getPermintaanData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page - 1;
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
    builder.addCase(postStatusReject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postStatusReject.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(postStatusReject.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
    builder.addCase(postStatusDraft.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postStatusDraft.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(postStatusDraft.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
    builder.addCase(postStatusPublish.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postStatusPublish.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(postStatusPublish.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
    builder.addCase(postStatusUnpublish.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postStatusUnpublish.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(postStatusUnpublish.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Invalid data';
    });
  },
});

export const bimtekPermintaanDataSelector = (state) => state.cmsBimtekPermintaan.dataset;
export const bimtekLogSelector = (state) => state.cmsBimtekPermintaan.logs;
export const bimtekPermintaanDataDetail = (state) => state.cmsBimtekPermintaan?.detail?.records;
export const bimtekInstansi = (state) => state.cmsBimtekPermintaan?.instansi?.records;

export default BimtekPermintaanDataDetailSlice.reducer;
