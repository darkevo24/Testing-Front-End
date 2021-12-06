import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, deleteRequest, get, paginationParams, put, post } from 'utils/request';

const defaultDaftarBodyParams = {
  instansi: null,
  produsenData: null,
  dataInduk: null,
  prioritas: null,
  tab: 0,
  pilarSDGS: null,
  tujuanSDGS: null,
  pnRKP: null,
  ppRKP: null,
};

export const initialState = {
  instansi: {
    loading: false,
    error: null,
    result: null,
  },
  produen: {
    loading: false,
    error: null,
    result: null,
  },
  datainduk: {
    loading: false,
    error: null,
    result: null,
  },
  addKatalog: {
    loading: false,
    error: null,
    result: null,
  },
  updateKatalog: {
    loading: false,
    error: null,
    result: null,
  },
  deleteKatalog: {
    loading: false,
    error: null,
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
    bodyParams: {
      ...defaultDaftarBodyParams,
    },
  },
  sdgs: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      currentPage: null,
      ...paginationParams,
    },
    bodyParams: {
      ...defaultDaftarBodyParams,
      tab: 1,
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

export const getProduen = createAsyncThunk('daftar/getProduen', async () => {
  const response = await get(apiUrls.produenData);
  return response?.data?.content?.records;
});

export const getDatainduk = createAsyncThunk('daftar/getDatainduk', async () => {
  const response = await get(apiUrls.dataindukData);
  return response?.data?.content?.records;
});

export const getKatalog = createAsyncThunk('katalog/getKatalog', async (params) => {
  const response = await get(apiUrls.katalogData);
  return response?.data;
});

export const putKatalog = createAsyncThunk('katalog/putKatalog', async (params) => {
  const response = await put(`${apiUrls.katalogData}`, params);
  return response;
});

export const deleteKatalog = createAsyncThunk('katalog/deleteKatalog', async (params) => {
  const response = await deleteRequest(`${apiUrls.katalogData}/${params.id}`);
  return response;
});

export const addKatalog = createAsyncThunk('katalog/addKatalog', async (params) => {
  const response = await post(apiUrls.katalogData, params);
  return response;
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
    builder.addCase(getInstansi.pending, (state) => {
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
    builder.addCase(getProduen.pending, (state) => {
      state.produen.loading = true;
    });
    builder.addCase(getProduen.fulfilled, (state, action) => {
      state.produen.loading = false;
      state.produen.result = action.payload;
    });
    builder.addCase(getProduen.rejected, (state) => {
      state.produen.loading = false;
      state.produen.error = 'Error in getting produen data';
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
    builder.addCase(addKatalog.pending, (state) => {
      state.addKatalog.loading = true;
    });
    builder.addCase(addKatalog.fulfilled, (state, action) => {
      state.addKatalog.loading = false;
      state.addKatalog.result = action.payload;
    });
    builder.addCase(addKatalog.rejected, (state) => {
      state.addKatalog.loading = false;
      state.addKatalog.error = 'Error while adding data';
    });
    builder.addCase(putKatalog.pending, (state) => {
      state.updateKatalog.loading = true;
    });
    builder.addCase(putKatalog.fulfilled, (state, action) => {
      state.updateKatalog.loading = false;
      state.updateKatalog.result = action.payload;
    });
    builder.addCase(putKatalog.rejected, (state) => {
      state.updateKatalog.loading = false;
      state.updateKatalog.error = 'Error while updating data';
    });
  },
});

export const instansiDataSelector = (state) => state.daftar.instansi;
export const produenDataSelector = (state) => state.daftar.produen;
export const dataindukDataSelector = (state) => state.daftar.datainduk;
export const katalogSelector = (state) => state.daftar.katalog;
export const updateKatalogSelector = (state) => state.daftar.updateKatalog;
export const addKatalogSelector = (state) => state.daftar.addKatalog;

export default daftarSlice.reducer;
