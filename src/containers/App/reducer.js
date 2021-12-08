import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

const defaultNotification = {
  showClose: true,
  type: 'warning',
  onClose: () => {},
};
export const initialState = {
  loading: false,
  instansi: {
    loading: false,
    error: null,
    result: null,
  },
  datainduk: {
    loading: false,
    error: null,
    result: null,
  },
  sdgPillers: {
    loading: false,
    error: null,
    result: null,
  },
  rkpPN: {
    loading: false,
    error: null,
    result: null,
  },
  notificationOptions: {
    ...defaultNotification,
  },
};

export const GLOBAL_REDUCER = 'GLOBAL_REDUCER';

export const getInstansiData = createAsyncThunk('portal/getInstansiData', async (params) => {
  const response = await get(apiUrls.instansiData);
  return response?.data?.content?.records;
});

export const getDatainduk = createAsyncThunk('daftar/getDatainduk', async () => {
  const response = await get(apiUrls.dataindukData);
  return response?.data?.content?.records;
});

export const getSDGPillers = createAsyncThunk('portal/getSDGPillers', async () => {
  const response = await get(apiUrls.sdgPillers);
  return response?.data?.content;
});

export const getRKPpn = createAsyncThunk('portal/getRKPpn', async () => {
  const response = await get(apiUrls.rkpPN);
  return response?.data?.content;
});

const AppSlice = createSlice({
  name: GLOBAL_REDUCER,
  initialState,
  reducers: {
    setLoader: (state) => {
      state.loading = false;
    },
    setNotificationOptions: (state, action) => {
      state.notificationOptions = { ...defaultNotification, ...(action.payload || defaultNotification) };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInstansiData.pending, (state, action) => {
      state.instansi.loading = true;
    });
    builder.addCase(getInstansiData.fulfilled, (state, action) => {
      state.instansi.loading = false;
      state.instansi.result = action.payload;
    });
    builder.addCase(getInstansiData.rejected, (state) => {
      state.instansi.loading = false;
    });
    builder.addCase(getDatainduk.pending, (state) => {
      state.datainduk.loading = true;
    });
    builder.addCase(getDatainduk.fulfilled, (state, action) => {
      state.datainduk.loading = false;
      state.datainduk.result = action.payload;
    });
    builder.addCase(getDatainduk.rejected, (state) => {
      state.datainduk.loading = false;
      state.datainduk.error = 'Error in getting datainduk data';
    });
    builder.addCase(getSDGPillers.pending, (state) => {
      state.sdgPillers.loading = true;
    });
    builder.addCase(getSDGPillers.fulfilled, (state, action) => {
      state.sdgPillers.loading = false;
      state.sdgPillers.result = action.payload;
    });
    builder.addCase(getSDGPillers.rejected, (state) => {
      state.sdgPillers.loading = false;
      state.sdgPillers.error = 'Error in getting sdg pillers data';
    });
    builder.addCase(getRKPpn.pending, (state) => {
      state.rkpPN.loading = true;
    });
    builder.addCase(getRKPpn.fulfilled, (state, action) => {
      state.rkpPN.loading = false;
      state.rkpPN.result = action.payload;
    });
    builder.addCase(getRKPpn.rejected, (state) => {
      state.rkpPN.loading = false;
      state.rkpPN.error = 'Error in getting rkp pn data';
    });
  },
});

export const { setLoader, setNotificationOptions } = AppSlice.actions;
export const instansiDataSelector = (state) => state.global.instansi;
export const dataindukSelector = (state) => state.global.datainduk;
export const sdgPillersSelector = (state) => state.global.sdgPillers;
export const rkpPNSelector = (state) => state.global.rkpPN;

export default AppSlice.reducer;
