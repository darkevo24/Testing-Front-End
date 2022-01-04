import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const getPenggunaData = createAsyncThunk('penggunaManagement/penggunaData', async (params) => {
  const response = await get(`${apiUrls.penggunaManagement}`, {
    query: {
      page: params.page + 1,
      size: 10,
      roles: params.roles,
      instansiId: params.instansiId,
      status: params.status,
      q: params.q,
    },
  });
  return response?.data?.content;
});

export const getPenggunaRoleList = createAsyncThunk('penggunaManagement/penggunaRoleList', async (params) => {
  const response = await get(`${apiUrls.penggunaRoleList}`);
  return response?.data?.content;
});

export const getPenggunaStatusList = createAsyncThunk('penggunaManagement/penggunaStatusList', async (params) => {
  const response = await get(`${apiUrls.penggunaStatusList}`);
  return response?.data?.content;
});

export const getInstansiData = createAsyncThunk('penggunaManagement/instansiData', async (params) => {
  const response = await get(apiUrls.penggunaInstansiList);
  return response?.data?.content;
});

export const initialState = {
  penggunaDataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
  penggunaRoleDataset: {
    loading: false,
    error: null,
    records: [],
  },
  penggunaStatusDataset: {
    loading: false,
    error: null,
    records: [],
  },
  instansiDataset: {
    loading: false,
    error: null,
    records: [],
  },
};

export const PERMINTAAN_DATA = 'PENGGUNA_DATA';

const penggunaManagementDetailSlice = createSlice({
  name: PERMINTAAN_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPenggunaData.pending, (state, action) => {
      state.penggunaDataset.loading = true;
    });
    builder.addCase(getPenggunaData.fulfilled, (state, action) => {
      state.penggunaDataset.loading = false;
      state.penggunaDataset.records = action.payload.records;
      state.penggunaDataset.page = action.payload.page - 1;
      state.penggunaDataset.totalPages = action.payload.totalPages;
      state.penggunaDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getPenggunaData.rejected, (state, action) => {
      state.penggunaDataset.loading = false;
      state.penggunaDataset.error = 'Invalid data';
    });
    builder.addCase(getPenggunaRoleList.pending, (state, action) => {
      state.penggunaRoleDataset.loading = true;
    });
    builder.addCase(getPenggunaRoleList.fulfilled, (state, action) => {
      state.penggunaRoleDataset.records = action.payload;
    });
    builder.addCase(getPenggunaRoleList.rejected, (state, action) => {
      state.penggunaRoleDataset.loading = false;
      state.penggunaRoleDataset.error = 'Invalid data';
    });
    builder.addCase(getPenggunaStatusList.pending, (state, action) => {
      state.penggunaStatusDataset.loading = true;
    });
    builder.addCase(getPenggunaStatusList.fulfilled, (state, action) => {
      state.penggunaStatusDataset.records = action.payload;
    });
    builder.addCase(getPenggunaStatusList.rejected, (state, action) => {
      state.penggunaStatusDataset.loading = false;
      state.penggunaStatusDataset.error = 'Invalid data';
    });
    builder.addCase(getInstansiData.pending, (state, action) => {
      state.instansiDataset.loading = true;
    });
    builder.addCase(getInstansiData.fulfilled, (state, action) => {
      state.instansiDataset.records = action.payload.records;
    });
    builder.addCase(getInstansiData.rejected, (state, action) => {
      state.instansiDataset.loading = false;
      state.instansiDataset.error = 'Invalid data';
    });
  },
});

export const penggunaDataSelector = (state) => state.penggunaManagement?.penggunaDataset;
export const penggunaRoleDataSelector = (state) => state.penggunaManagement?.penggunaRoleDataset;
export const penggunaStatusDataSelector = (state) => state.penggunaManagement?.penggunaStatusDataset;
export const instansiDataSelector = (state) => state.penggunaManagement?.instansiDataset;

export default penggunaManagementDetailSlice.reducer;
