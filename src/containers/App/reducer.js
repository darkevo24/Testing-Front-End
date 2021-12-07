import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

const defaultNotification = {
  showClose: true,
  type: 'warning',
  onClose: () => {},
};
export const initialState = {
  loading: false,
  instansiData: [],
  instansiLoading: false,
  notificationOptions: {
    ...defaultNotification,
  },
};

export const GLOBAL_REDUCER = 'GLOBAL_REDUCER';

export const getInstansiData = createAsyncThunk('portal/getInstansiData', async (params) => {
  const response = await get(apiUrls.instansiData);
  return response?.data?.content?.records;
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
      state.instansiLoading = true;
    });
    builder.addCase(getInstansiData.fulfilled, (state, action) => {
      state.instansiLoading = false;
      state.instansiData = action.payload;
    });
    builder.addCase(getInstansiData.rejected, (state) => {
      state.instansiLoading = false;
    });
  },
});

export const { setLoader, setNotificationOptions } = AppSlice.actions;
export const instansiiDatasetSelector = (state) => ({
  instansiData: state.global?.instansiData,
  loading: state.global?.instansiLoading,
});
export default AppSlice.reducer;
