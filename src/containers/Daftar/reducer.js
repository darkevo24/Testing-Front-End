import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiPaginationParams, apiUrls, defaultNumberOfRows, deleteRequest, get, post, put } from 'utils/request';

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
  produen: {
    loading: false,
    error: null,
    result: null,
  },
  tujuanSDGPillers: {
    loading: false,
    error: null,
    result: null,
  },
  rkpPP: {
    loading: false,
    error: null,
    result: null,
  },
  addDaftarData: {
    loading: false,
    error: null,
    result: null,
  },
  updateDaftarData: {
    loading: false,
    error: null,
    result: null,
  },
  deleteDaftarData: {
    loading: false,
    error: null,
  },
  daftarData: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      ...apiPaginationParams,
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
      ...apiPaginationParams,
    },
    bodyParams: {
      ...defaultDaftarBodyParams,
      tab: 1,
    },
  },
  rkp: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      ...apiPaginationParams,
    },
    bodyParams: {
      ...defaultDaftarBodyParams,
      tab: 2,
    },
  },
  sayaDaftarData: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      ...apiPaginationParams,
    },
    bodyParams: {
      ...defaultDaftarBodyParams,
      tab: 3,
    },
  },
  loading: false,
  error: null,
};

export const DAFTAR_REDUCER = 'DAFTAR_REDUCER';

export const getProduen = createAsyncThunk('daftar/getProduen', async () => {
  const response = await get(apiUrls.produenData);
  return response?.data?.content?.records;
});

export const getDaftarData = createAsyncThunk('daftar/getDaftarData', async (filters = {}) => {
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query: filters.params });
  return response?.data;
});

export const getSdgDaftarData = createAsyncThunk('daftar/getSdgDaftarData', async (filters = {}) => {
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query: filters.params });
  return response?.data;
});

export const getRkpDaftarData = createAsyncThunk('daftar/getRkpDaftarData', async (filters = {}) => {
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query: filters.params });
  return response?.data;
});

export const getSayaDaftarData = createAsyncThunk('daftar/getSayaDaftarData', async (filters = {}) => {
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query: filters.params });
  return response?.data;
});

export const putDaftarData = createAsyncThunk('daftar/putDaftarData', async (params) => {
  const response = await put(`${apiUrls.daftarData}`, params);
  return response;
});

export const deleteDaftarData = createAsyncThunk('daftar/deleteDaftarData', async (params) => {
  const response = await deleteRequest(`${apiUrls.daftarData}/${params.id}`);
  return response;
});

export const addDaftarData = createAsyncThunk('daftarData/addDaftarData', async (params) => {
  const response = await post(apiUrls.daftarData, params);
  return response;
});

export const getSDGTujuan = createAsyncThunk('daftarData/getSDGTujuan', async (id) => {
  const response = await get(`${apiUrls.sdgPillers}/parent/${id}`);
  return response?.data?.content;
});

export const getRKPpp = createAsyncThunk('daftarData/getRKPpp', async (id) => {
  const response = await get(`${apiUrls.rkpPN}/parent/${id}`);
  return response?.data?.content;
});

const daftarSlice = createSlice({
  name: DAFTAR_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDaftarData.pending, (state, action) => {
      const { bodyParams, params } = action.meta.arg;
      state.daftarData.params = params;
      state.daftarData.bodyParams = bodyParams;
      state.daftarData.loading = true;
    });
    builder.addCase(getDaftarData.fulfilled, (state, action) => {
      state.daftarData.loading = false;
      state.daftarData.result = action.payload;
    });
    builder.addCase(getDaftarData.rejected, (state) => {
      state.daftarData.loading = false;
      state.daftarData.error = 'Error in fetching daftarData details!';
    });
    builder.addCase(getSdgDaftarData.pending, (state, action) => {
      const { bodyParams, params } = action.meta.arg;
      state.sdgs.params = params;
      state.sdgs.bodyParams = bodyParams;
      state.sdgs.loading = true;
    });
    builder.addCase(getSdgDaftarData.fulfilled, (state, action) => {
      state.sdgs.loading = false;
      state.sdgs.result = action.payload;
    });
    builder.addCase(getSdgDaftarData.rejected, (state) => {
      state.sdgs.loading = false;
      state.sdgs.error = 'Error in fetching sdg daftar data details!';
    });
    builder.addCase(getRkpDaftarData.pending, (state, action) => {
      const { bodyParams, params } = action.meta.arg;
      state.rkp.params = params;
      state.rkp.bodyParams = bodyParams;
      state.rkp.loading = true;
    });
    builder.addCase(getRkpDaftarData.fulfilled, (state, action) => {
      state.rkp.loading = false;
      state.rkp.result = action.payload;
    });
    builder.addCase(getRkpDaftarData.rejected, (state) => {
      state.rkp.loading = false;
      state.rkp.error = 'Error in fetching sdg daftar data details!';
    });
    builder.addCase(getSayaDaftarData.pending, (state, action) => {
      const { bodyParams, params } = action.meta.arg;
      state.sayaDaftarData.params = params;
      state.sayaDaftarData.bodyParams = bodyParams;
      state.sayaDaftarData.loading = true;
    });
    builder.addCase(getSayaDaftarData.fulfilled, (state, action) => {
      state.sayaDaftarData.loading = false;
      state.sayaDaftarData.result = action.payload;
    });
    builder.addCase(getSayaDaftarData.rejected, (state) => {
      state.sayaDaftarData.loading = false;
      state.sayaDaftarData.error = 'Error in fetching sdg daftar data details!';
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
    builder.addCase(getSDGTujuan.pending, (state) => {
      state.tujuanSDGPillers.loading = true;
    });
    builder.addCase(getSDGTujuan.fulfilled, (state, action) => {
      state.tujuanSDGPillers.loading = false;
      state.tujuanSDGPillers.result = action.payload;
    });
    builder.addCase(getSDGTujuan.rejected, (state) => {
      state.tujuanSDGPillers.loading = false;
      state.tujuanSDGPillers.error = 'Error in getting sdg tujuan data';
    });
    builder.addCase(getRKPpp.pending, (state) => {
      state.rkpPP.loading = true;
    });
    builder.addCase(getRKPpp.fulfilled, (state, action) => {
      state.rkpPP.loading = false;
      state.rkpPP.result = action.payload;
    });
    builder.addCase(getRKPpp.rejected, (state) => {
      state.rkpPP.loading = false;
      state.rkpPP.error = 'Error in getting rkp pp data';
    });
    builder.addCase(addDaftarData.pending, (state) => {
      state.addDaftarData.loading = true;
    });
    builder.addCase(addDaftarData.fulfilled, (state) => {
      state.addDaftarData.loading = false;
      state.addDaftarData.error = '';
    });
    builder.addCase(addDaftarData.rejected, (state) => {
      state.addDaftarData.loading = false;
      state.addDaftarData.error = 'Error while adding data';
    });
    builder.addCase(putDaftarData.pending, (state) => {
      state.updateDaftarData.loading = true;
    });
    builder.addCase(putDaftarData.fulfilled, (state) => {
      state.updateDaftarData.loading = false;
      state.updateDaftarData.error = '';
    });
    builder.addCase(putDaftarData.rejected, (state) => {
      state.updateDaftarData.loading = false;
      state.updateDaftarData.error = 'Error while updating data';
    });
    builder.addCase(deleteDaftarData.pending, (state) => {
      state.updateDaftarData.loading = true;
    });
    builder.addCase(deleteDaftarData.fulfilled, (state) => {
      state.deleteDaftarData.loading = false;
      state.deleteDaftarData.error = '';
    });
    builder.addCase(deleteDaftarData.rejected, (state) => {
      state.deleteDaftarData.loading = false;
      state.deleteDaftarData.error = 'Error while updating data';
    });
  },
});

export const produenDataSelector = (state) => state.daftar.produen;
export const daftarDataSelector = (state) => state.daftar.daftarData;
export const sdgsDataSelector = (state) => state.daftar.sdgs;
export const rkpDataSelector = (state) => state.daftar.rkp;
export const sayaDataSelector = (state) => state.daftar.sayaDaftarData;
export const updateDaftarDataSelector = (state) => state.daftar.updateDaftarData;
export const addDaftarDataSelector = (state) => state.daftar.addDaftarData;
export const tujuanSDGPillersSelector = (state) => state.daftar.tujuanSDGPillers;
export const rkpPPSelector = (state) => state.daftar.rkpPP;

export default daftarSlice.reducer;
