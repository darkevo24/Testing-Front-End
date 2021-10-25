import { createSlice } from '@reduxjs/toolkit';

const defaultNotification = {
  showClose: true,
  type: 'warning',
  onClose: () => {},
};
export const initialState = {
  loading: false,
  notificationOptions: {
    ...defaultNotification,
  },
};

export const GLOBAL_REDUCER = 'GLOBAL_REDUCER';

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
  extraReducers: {},
});

export const { setLoader, setNotificationOptions } = AppSlice.actions;

export default AppSlice.reducer;
