import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
};

export const GLOBAL_REDUCER = 'GLOBAL_REDUCER';

const AppSlice = createSlice({
  name: GLOBAL_REDUCER,
  initialState,
  reducers: {
    setLoader: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {},
});

export default AppSlice.reducer;
