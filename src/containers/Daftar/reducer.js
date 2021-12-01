import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, paginationParams } from 'utils/request';

export const initialState = {
  instansi: {
    loading: false,
    error: null,
    result: null,
  },
  katalog: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      currentPage: null,
      ...paginationParams,
    },
  },
  loading: false,
  error: null,
};

export const DAFTAR_REDUCER = 'DAFTAR_REDUCER';

export const getInstansi = createAsyncThunk('daftar/getInstansi', async () => {
  const response = await get(apiUrls.instansiData);
  return response?.data?.content?.records;
});

export const getKatalog = createAsyncThunk('katalog/getDataset', async (params) => {
  const response = await get(apiUrls.katalogData);
  return response?.data;
});

const daftarSlice = createSlice({
  name: DAFTAR_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKatalog.pending, (state, action) => {
      state.katalog.params = action.meta.arg;
      state.katalog.loading = true;
    });
    builder.addCase(getKatalog.fulfilled, (state, action) => {
      state.katalog.loading = false;
      state.katalog.result = action.payload;
    });
    builder.addCase(getKatalog.rejected, (state) => {
      state.katalog.loading = false;
      state.katalog.error = 'Error in fetching katalog details!';
    });
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
export const katalogSelector = (state) => state.daftar.katalog;

export default daftarSlice.reducer;
