import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forEach } from 'lodash';
import moment from 'moment';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const getUserListData = createAsyncThunk('penggunaManagement/penggunaData', async (params) => {
  const url = new URL(`${apiUrls.listPengguna}`);

  url.searchParams.append('size', params.filter.size);
  url.searchParams.append('page', params.filter.page);
  url.searchParams.append('roles', params.filter.roles);
  url.searchParams.append('status', params.filter.status);
  url.searchParams.append('q', params.filter.q);

  const response = await get(url);

  return response?.data?.content;
});

export const getRoleData = createAsyncThunk('penggunaRoleList', async () => {
  const response = await get(apiUrls.penggunaRoleList);
  return response?.data;
});

export const getInstansiData = createAsyncThunk('formulirPendaftaran/getFormulirPendaftaranData', async () => {
  const response = await get(apiUrls.formulirPendaftaran);
  return response?.data;
});

export const getUnitKerjaData = createAsyncThunk('permintaan-data/unitkerja', async (params) => {
  const response = await get(`${apiUrls.instansiData}/${params}/unitkerja`);
  return response?.data.content;
});

export const getPenggunaDetails = createAsyncThunk('penggunaManagement/penggunaDetails', async (params) => {
  const response = await get(`${apiUrls.penggunaManagement}/${params}`);

  const responseInvalidDate = 'Invalid date';
  const startActiveDate = response.data.content.startActiveDate;
  const endActiveDate = response.data.content.endActiveDate;

  if (startActiveDate === responseInvalidDate) {
    response.data.content.startActiveDate = null;
  } else if (startActiveDate !== null) {
    response.data.content.startActiveDate = moment(startActiveDate).format('DD/MM/YYYY');
  }

  if (endActiveDate === responseInvalidDate) {
    response.data.content.endActiveDate = null;
  } else if (endActiveDate !== null) {
    response.data.content.endActiveDate = moment(endActiveDate).format('DD/MM/YYYY');
  }

  return response?.data.content;
});

export const getLogData = createAsyncThunk('penggunaManagement/penggunaRoleList', async (params) => {
  const response = await get(`${apiUrls.penggunaManagement}/${params}/logs`);
  return response?.data?.content;
});
export const getPenggunaLogs = createAsyncThunk('penggunaManagement/penggunaLogs', async (params) => {
  const response = await get(`${apiUrls.penggunaManagement}/${params}/logs`);
  return response?.data.content;
});

export const INITIAL_STATE = {
  dataset: {
    status: 'idle',
    records: [],
    message: null,
    unitKerja: [],
    logData: [],
    roles: [],
    loading: false,
  },
  userdata: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
  penggunaDetailDataset: {
    loading: false,
    records: {
      startActiveDate: '',
      endActiveDate: '',
    },
  },
  penggunaLogsData: {
    loading: false,
    records: [],
  },
};

const REDUCER_NAME = 'MANAGEMEN_PENGGUNA_REDUCER';

const managemenPenggunaSlice = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserListData.pending, (state, action) => {
      state.userdata.loading = true;
    });
    builder.addCase(getUserListData.fulfilled, (state, action) => {
      state.userdata.loading = false;
      state.userdata = action.payload;
    });
    builder.addCase(getUserListData.rejected, (state, action) => {
      state.userdata.loading = false;
      state.userdata.message = action.error.message;
    });
    builder.addCase(getRoleData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getRoleData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.roleData = action.payload.content;
      state.dataset.roles.push({ value: '', label: 'SEMUA' });
      action.payload.content.map((role, index) => {
        const roleObj = {
          value: index,
          label: role,
        };
        state.dataset.roles.push(roleObj);
      });
    });
    builder.addCase(getRoleData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.message = action.error.message;
    });
    builder.addCase(getInstansiData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getInstansiData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.content;
    });
    builder.addCase(getInstansiData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.message = action.error.message;
    });
    builder.addCase(getUnitKerjaData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getUnitKerjaData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.unitKerja = action.payload;
    });

    builder.addCase(getUnitKerjaData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.message = action.error.message;
    });
    builder.addCase(getPenggunaDetails.pending, (state, action) => {
      state.penggunaDetailDataset.loading = true;
    });
    builder.addCase(getPenggunaDetails.fulfilled, (state, action) => {
      state.penggunaDetailDataset.loading = false;
      state.penggunaDetailDataset.records = action.payload;
    });
    builder.addCase(getPenggunaDetails.rejected, (state, action) => {
      state.penggunaDetailDataset.loading = false;
      state.penggunaDetailDataset.error = 'Invalid data';
    });

    builder.addCase(getLogData.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getLogData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.unitKerja = action.payload;
    });
    builder.addCase(getLogData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.message = action.error.message;
    });
    builder.addCase(getPenggunaLogs.pending, (state, action) => {
      state.penggunaLogsData.loading = true;
    });
    builder.addCase(getPenggunaLogs.fulfilled, (state, action) => {
      state.penggunaLogsData.loading = false;
      state.penggunaLogsData.records = action.payload;
    });
    builder.addCase(getPenggunaLogs.rejected, (state, action) => {
      state.penggunaLogsData.loading = false;
      state.penggunaLogsData.error = 'Invalid data';
    });
  },
});

export const instansiSelector = (state) => state.managemenPengguna?.dataset;
export const unitKerjaSelector = (state) => state.managemenPengguna?.dataset;
export const userlistSelector = (state) => state.managemenPengguna?.userdata;
export const rolelistSelector = (state) => state.managemenPengguna?.dataset;
export const penggunanDataDetailSelector = (state) => state?.penggunaManagementDetails?.penggunaDetailDataset;
export const penggunanLogsSelector = (state) => state?.penggunaManagementDetails?.penggunaLogsData;

export default managemenPenggunaSlice.reducer;
