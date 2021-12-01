import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const initialState = {
  instansi: {
    loading: false,
    error: null,
    result: null,
  },
};

export const DAFTAR_REDUCER = 'DAFTAR_REDUCER';

export const getInstansi = createAsyncThunk('daftar/getInstansi', async () => {
  const response = await get(apiUrls.instansiData);
  return response?.data?.content?.records;
});

const daftarSlice = createSlice({
  name: DAFTAR_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInstansi.pending, (state, action) => {
      state.instansi.loading = true;
    });
    builder.addCase(getInstansi.fulfilled, (state, action) => {
      state.instansi.loading = false;
      state.instansi.result = action.payload;
    });
    builder.addCase(getInstansi.rejected, (state) => {
      state.instansi.loading = false;
      state.instansi.error = 'Error in getting instansi data';
    });
  },
});

export const instansiDataSelector = (state) => state.daftar?.instansi;

export default daftarSlice.reducer;
