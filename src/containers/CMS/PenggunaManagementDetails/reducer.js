import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const PENGGUNA_DATA_DETAIL = 'PENGGUNA_DATA_DETAIL';

export const getPenggunaDetails = createAsyncThunk('penggunaManagement/penggunaDetails', async (params) => {
  const response = await get(`${apiUrls.penggunaManagement}/${params}`);
  return response?.data.content;
});

export const getPenggunaLogs = createAsyncThunk('penggunaManagement/penggunaLogs', async (params) => {
  const response = await get(`${apiUrls.penggunaManagement}/${params}/logs`);
  return response?.data.content;
});

export const initialState = {
  penggunaDetailDataset: {
    loading: false,
    records: [],
  },
  penggunaLogsData: {
    loading: false,
    records: [],
  },
};
const penggunanDataDetailSlice = createSlice({
  name: PENGGUNA_DATA_DETAIL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

export const penggunanDataDetailSelector = (state) => state?.penggunaManagementDetails?.penggunaDetailDataset;
export const penggunanLogsSelector = (state) => state?.penggunaManagementDetails?.penggunaLogsData;
export default penggunanDataDetailSlice.reducer;
