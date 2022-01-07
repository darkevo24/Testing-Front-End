import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, deleteRequest, defaultNumberOfRows, get, post, put } from 'utils/request';

const initialState = {
  dataset: {
    loading: false,
    error: null,
    page: 1,
    status: 'idel',
    records: [],
    totalPages: null,
    size: defaultNumberOfRows,
    totalRecords: null,
  },
  instansi: {
    loading: false,
    error: null,
    content: {},
    status: 'idel',
  },
  dataLogs: {
    status: 'idel',
    loading: false,
    page: 1,
    size: defaultNumberOfRows,
    totalRecords: null,
    records: [],
    totalPages: null,
  },
  unitKejira: {
    status: 'idel',
    loading: false,
    page: 0,
    size: defaultNumberOfRows,
    totalRecords: null,
    records: [],
    totalPages: null,
  },
  unitKejiraDetail: {
    status: 'idel',
    loading: false,
    content: {},
    error: null,
  },
};

export const INSTANSI_DATA = 'INSTANSI_DATA';

export const getInstansi = createAsyncThunk('instansi-data/list', async ({ page, q }) => {
  const params = { page };
  if (q) params.q = q;
  const response = await get(`${apiUrls.cmsIntansiData}/`, {
    query: params,
  });
  return response?.data.content;
});
export const getInstansiDetail = createAsyncThunk('instansi-data/detail', async (params) => {
  const response = await get(`${apiUrls.cmsIntansiData}/${params}`);
  return response?.data.content;
});

export const getInstansiLogs = createAsyncThunk('instansi-data/logs', async (params) => {
  const response = await get(`${apiUrls.cmsIntansiData}/${params}`);
  return response?.data.content;
});
export const getInstansiUnitKejira = createAsyncThunk('instansi-data/unit-kejira', async (params) => {
  const response = await get(`${apiUrls.cmsIntansiData}/${params}`);
  return response?.data.content;
});

export const createNewInstansi = createAsyncThunk('instansi-data/new', async (params) => {
  const response = await post(`${apiUrls.cmsIntansiData}`, params.payload);
  return response?.data.content;
});

export const updateInstaStatus = createAsyncThunk('instansi-data/update-status', async (params) => {
  const response = await post(`${apiUrls.cmsIntansiData}/${params.id}/ubah-status/${params.status}`, params.payload);
  return response?.data;
});
export const updateInstansi = createAsyncThunk('instansi-data/update', async (params) => {
  const response = await put(`${apiUrls.cmsIntansiData}/${params.id}`, params.payload);
  return response?.data;
});

export const postUnitKerja = createAsyncThunk('instansi-data/unit-kerja', async (params) => {
  const response = await post(`${apiUrls.cmsIntansiData}/${params.id}/unit-kerja`, params.payload);
  return response?.data;
});

export const updateUnitKerja = createAsyncThunk('instansi-data/update-unit-kerja', async (params) => {
  const response = await put(`${apiUrls.cmsIntansiData}/${params.id}/unit-kerja/${params.unitId}`, params.payload);
  return response?.data;
});

export const getUnitKerjaDetail = createAsyncThunk('instansi-data/unit-kerija-detail', async (params) => {
  const response = await get(`${apiUrls.cmsIntansiData}/${params.id}/unit-kerja/${params.unitId}`);
  return response?.data.content;
});

export const deleteUnitKerja = createAsyncThunk('instansi-data/delete-unit-kerja', async (params) => {
  const response = await deleteRequest(`${apiUrls.cmsIntansiData}/${params.instansiId}/unit-kerja/${params.unitId}`);
  return response?.data;
});

const instansiDataSlice = createSlice({
  name: INSTANSI_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * @description get instansi data
     * @param {object} state
     * @param {object} action
     * @returns {object} state
     * @memberof instansiDataSlice
     */
    builder.addCase(getInstansi.pending, (state, action) => {
      state.dataset.loading = true;
      state.dataset.status = 'idel';
    });
    builder.addCase(getInstansi.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.page = action.payload.page - 1;
      state.dataset.totalPages = action.payload.totalPages;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.status = 'success';
    });
    builder.addCase(getInstansi.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
      state.dataset.status = 'error';
    });

    /**
     * @description get instansi detail
     * @param {object} state
     * @param {object} action
     * @returns {object} state
     * @memberof instansiDataSlice
     */
    builder.addCase(getInstansiDetail.pending, (state, action) => {
      state.instansi.loading = true;
      state.instansi.status = 'idel';
    });
    builder.addCase(getInstansiDetail.fulfilled, (state, action) => {
      state.instansi.loading = false;
      state.instansi.content = action.payload;
      state.instansi.status = 'success';
    });
    builder.addCase(getInstansiDetail.rejected, (state, action) => {
      state.instansi.loading = false;
      state.instansi.error = action.error.message;
      state.instansi.status = 'error';
    });

    /**
     * @description get instansi logs
     * @param {object} state
     * @param {object} action
     * @returns {object} state
     * @memberof instansiDataSlice
     */
    builder.addCase(getInstansiLogs.pending, (state, action) => {
      state.dataLogs.loading = true;
      state.dataLogs.status = 'idel';
    });
    builder.addCase(getInstansiLogs.fulfilled, (state, action) => {
      state.dataLogs.loading = false;
      state.dataLogs.records = action.payload.records;
      state.dataLogs.page = action.payload.page - 1;
      state.dataLogs.totalPages = action.payload.totalPages;
      state.dataLogs.totalRecords = action.payload.totalRecords;
      state.dataLogs.status = 'success';
    });
    builder.addCase(getInstansiLogs.rejected, (state, action) => {
      state.dataLogs.loading = false;
      state.dataLogs.error = action.error.message;
      state.dataLogs.status = 'error';
    });

    /**
     * @description get instansi unit kejira
     * @param {object} state
     * @param {object} action
     * @returns {object} state
     * @memberof instansiDataSlice
     */
    builder.addCase(getInstansiUnitKejira.pending, (state, action) => {
      state.unitKejira.loading = true;
      state.unitKejira.status = 'idel';
    });
    builder.addCase(getInstansiUnitKejira.fulfilled, (state, action) => {
      state.unitKejira.loading = false;
      state.unitKejira.records = action.payload.records;
      state.unitKejira.page = action.payload.page - 1;
      state.unitKejira.totalPages = action.payload.totalPages;
      state.unitKejira.totalRecords = action.payload.totalRecords;
      state.unitKejira.status = 'success';
    });
    builder.addCase(getInstansiUnitKejira.rejected, (state, action) => {
      state.unitKejira.loading = false;
      state.unitKejira.error = action.error.message;
      state.unitKejira.status = 'error';
    });

    /**
     * @description get instansi unit kejira detail
     * @param {object} state
     * @param {object} action
     * @returns {object} state
     * @memberof instansiDataSlice
     */
    builder.addCase(getUnitKerjaDetail.pending, (state, action) => {
      state.unitKejiraDetail.loading = true;
      state.unitKejiraDetail.status = 'idel';
    });
    builder.addCase(getUnitKerjaDetail.fulfilled, (state, action) => {
      state.unitKejiraDetail.loading = false;
      state.unitKejiraDetail.content = action.payload;
      state.unitKejiraDetail.status = 'success';
    });
    builder.addCase(getUnitKerjaDetail.rejected, (state, action) => {
      state.unitKejiraDetail.loading = false;
      state.unitKejiraDetail.error = action.error.message;
      state.unitKejiraDetail.status = 'error';
    });
  },
});

export const instansiDataSelector = (state) => state.cmsInstansi?.dataset;
export const instansiDetailSelector = (state) => state.cmsInstansi?.instansi;
export const instansiLogsSelector = (state) => state.cmsInstansi?.dataLogs;
export const instansiUnitKejiraSelector = (state) => state.cmsInstansi?.unitKejira;
export const instansiUnitKejiraDetailSelector = (state) => state.cmsInstansi?.unitKejiraDetail;
export default instansiDataSlice.reducer;
