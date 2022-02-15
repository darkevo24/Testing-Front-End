import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    q: '',
    page: 0,
    sort: 'api_count',
    sort_direction: 'DESC',
    loading: false,
    error: null,
    records: [],
    hasNext: '',
    size: defaultNumberOfRows,
    totalRecords: null,
    totalPages: null,
  },
  instansiByID: {
    q: '',
    page: 0,
    loading: false,
    error: null,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
    totalPages: null,
  },
  getByIDData: {
    q: '',
    page: 0,
    loading: false,
    error: null,
    records: {},
    size: defaultNumberOfRows,
    totalRecords: null,
    totalPages: null,
  },
  getByIdLogsData: {
    logLoading: false,
    logError: null,
    logRecords: [],
  },
  error: null,
};

export const getManagementApiList = createAsyncThunk(
  'cms/getManagementApiList',
  async ({ page, q, sort, sort_direction }) => {
    const response = await get(`${apiUrls.cmsManagementApi}/instansi`, {
      query: { sort, page: page + 1, q, sort_direction, size: 10 },
    });
    return response?.data;
  },
);

// export const getInstansiListById = createAsyncThunk('cms/getInstansiListById', async ({ id }) => {
//   const response = await get(`${apiUrls.cmsManagementApi}/${id}`);
//   return response?.data;
// });

export const getInstansiListById = createAsyncThunk('cms/getInstansiListById', async ({ id, q, page }) => {
  const response = await get(`${apiUrls.cmsManagementApi}`, {
    query: { sort: 'id', sort_direction: 'ASC', page: page + 1, size: 10, q, instansiId: id },
  });
  return response?.data;
});

export const getById = createAsyncThunk('cms/getById', async (params) => {
  const response = await get(`${apiUrls.cmsManagementApi}/${params}`);
  return response?.data;
});

export const getByIdLog = createAsyncThunk('cms/getByIdLog', async (params) => {
  const response = await get(`${apiUrls.cmsManagementApi}/${params}/logs`);
  return response?.data;
});

const cmsApiManagement = createSlice({
  name: 'CMS_API_MANAGEMENT_SLICE',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManagementApiList.pending, (state, action) => {
      const { page = 0, q = '', sort, sort_direction } = action.meta.arg || {};
      state.dataset.page = page || 0;
      state.dataset.q = q || '';
      state.dataset.loading = true;
      state.dataset.sort = sort;
      state.dataset.sort_direction = sort_direction;
    });
    builder.addCase(getManagementApiList.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.content.records;
      state.dataset.totalRecords = action.payload.content.totalRecords;
      state.dataset.totalPages = action.payload.content.totalPages;
      state.dataset.hasNext = action.payload.content.hasNext;
      // state.dataset.page = action.payload.content.page;
    });
    builder.addCase(getManagementApiList.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error while fetching Management api data';
    });
    builder.addCase(getInstansiListById.pending, (state, action) => {
      const { page = 0, q = '' } = action.meta.arg || {};
      state.instansiByID.page = page || 0;
      state.instansiByID.q = q || '';
      state.instansiByID.loading = true;
    });
    builder.addCase(getInstansiListById.fulfilled, (state, action) => {
      state.instansiByID.loading = false;
      state.instansiByID.records = action.payload.content;
    });
    builder.addCase(getInstansiListById.rejected, (state) => {
      state.instansiByID.loading = false;
      state.instansiByID.error = 'Error while fetching Management api';
    });
    builder.addCase(getById.pending, (state, action) => {
      state.getByIDData.loading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.getByIDData.loading = false;
      state.getByIDData.records = action.payload.content;
    });
    builder.addCase(getById.rejected, (state) => {
      state.getByIDData.loading = false;
      state.getByIDData.error = 'Error while fetching Management api';
    });
    builder.addCase(getByIdLog.pending, (state, action) => {
      state.getByIdLogsData.logLoading = true;
    });
    builder.addCase(getByIdLog.fulfilled, (state, action) => {
      state.getByIdLogsData.logLoading = false;
      state.getByIdLogsData.logRecords = action.payload.content;
    });
    builder.addCase(getByIdLog.rejected, (state) => {
      state.getByIdLogsData.logLoading = false;
      state.getByIdLogsData.logError = 'Error while fetching Management api';
    });
  },
});

export const cmsManagementApiSelector = (state) => state?.cms?.apiManagement?.dataset;
export const cmsInstansiByIDSelector = (state) => state?.cms?.apiManagement?.instansiByID;
export const getByIDSelector = (state) => state?.cms?.apiManagement?.getByIDData;
export const getByIdLogsSelector = (state) => state?.cms?.apiManagement?.getByIdLogsData;
export default cmsApiManagement.reducer;
