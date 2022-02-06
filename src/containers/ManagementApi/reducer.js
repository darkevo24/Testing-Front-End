import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post } from 'utils/request';

export const initialState = {
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: 'idel',
    records: [],
    totalPages: null,
    size: defaultNumberOfRows,
    totalRecords: null,
  },
  portalApiDetail: {
    loading: false,
    error: null,
    content: {},
    status: 'idel',
  },
};
export const MANAGEMENT_API_REDUCER = 'MANAGEMENT_API_REDUCER';

export const getMangementApiList = createAsyncThunk('ManagementApi/portal/getMangementApiList', async (params) => {
  const response = await get(apiUrls.getPortalApiManagmentList, {
    query: params,
  });
  return response?.data.content;
});
export const getMangementApiDetial = createAsyncThunk('ManagementApi/portal/getMangementDetail', async (params) => {
  const response = await get(`${apiUrls.getPortalApiManagmentList}/${params}`);
  return response?.data.content;
});

export const createMagmentApi = createAsyncThunk('MangmentAPi/Portal/create', async ({ payload }) => {
  const response = await post(apiUrls.getPortalApiManagmentList, payload);
  return response?.data.content;
});

const portalManagmentApiSlice = createSlice({
  name: MANAGEMENT_API_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMangementApiList.pending, (state, action) => {
      state.dataset.loading = true;
      state.dataset.status = 'idel';
    });
    builder.addCase(getMangementApiList.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.page = action.payload.page - 1;
      state.dataset.totalPages = action.payload.totalPages;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.status = 'success';
    });
    builder.addCase(getMangementApiList.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
      state.dataset.status = 'error';
    });

    builder.addCase(getMangementApiDetial.pending, (state, action) => {
      state.portalApiDetail.loading = true;
      state.portalApiDetail.status = 'idel';
    });
    builder.addCase(getMangementApiDetial.fulfilled, (state, action) => {
      state.portalApiDetail.loading = false;
      state.portalApiDetail.content = action.payload;
      state.portalApiDetail.status = 'success';
    });
    builder.addCase(getMangementApiDetial.rejected, (state, action) => {
      state.portalApiDetail.loading = false;
      state.portalApiDetail.error = action.error.message;
      state.portalApiDetail.status = 'error';
    });
  },
});

export const portalManagmentApiListSelector = (state) => state.portalManagmentApi.dataset;
export const portalApiDetailSelector = (state) => state.portalManagmentApi.portalApiDetail;
export default portalManagmentApiSlice.reducer;
