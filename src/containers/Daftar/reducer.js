import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { dataToOptionsMapper, dataOptionsMapperCurry, idKeteranganOptionsMapper, incrementPageParams } from 'utils/helper';
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
  addDaftarTujuanSDG: {
    loading: false,
    error: null,
    result: null,
  },
  addDaftarRkpPP: {
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
  daftarDetails: {
    error: null,
    loading: null,
    result: {},
  },
  downloadDaftarData: {
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
  daftarDataSummary: {
    loading: false,
    error: null,
    result: null,
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

export const getDaftarDataSummary = createAsyncThunk('daftar/getDaftarDataSummary', async (filters = {}) => {
  const response = await get(apiUrls.daftarDataSummary);
  return response?.data?.content;
});

export const getDaftarDetail = createAsyncThunk('daftar/getDaftarDetail', async (id) => {
  const response = await get(`${apiUrls.katalogData}/${id}`);
  return response?.data?.content;
});

export const getDaftarData = createAsyncThunk('daftar/getDaftarData', async (filters = {}) => {
  const query = incrementPageParams(filters.params);
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query });
  return response?.data;
});

export const getSdgDaftarData = createAsyncThunk('daftar/getSdgDaftarData', async (filters = {}) => {
  const query = incrementPageParams(filters.params);
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query });
  return response?.data;
});

export const getRkpDaftarData = createAsyncThunk('daftar/getRkpDaftarData', async (filters = {}) => {
  const query = incrementPageParams(filters.params);
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query });
  return response?.data;
});

export const getSayaDaftarData = createAsyncThunk('daftar/getSayaDaftarData', async (filters = {}) => {
  const query = incrementPageParams(filters.params);
  const response = await post(apiUrls.daftarDataList, filters.bodyParams, { query });
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

export const addDaftarData = createAsyncThunk('daftarData/addDaftarData', async (payload) => {
  const response = await post(apiUrls.daftarData, payload);
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

export const getAddDaftarSDGTujuan = createAsyncThunk('daftarData/getAddDaftarSDGTujuan', async (id) => {
  const response = await get(`${apiUrls.sdgPillers}/parent/${id}`);
  return response?.data?.content;
});

export const getAddDaftarRKPpp = createAsyncThunk('daftarData/getAddDaftarRKPpp', async (id) => {
  const response = await get(`${apiUrls.rkpPN}/parent/${id}`);
  return response?.data?.content;
});

export const downloadDaftarData = createAsyncThunk('daftarData/downloadDaftarData', async (params) => {
  const response = await post(apiUrls.daftarDataDownload, params);
  return response?.data;
});

const daftarSlice = createSlice({
  name: DAFTAR_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDaftarDataSummary.pending, (state) => {
      state.daftarDataSummary.loading = true;
    });
    builder.addCase(getDaftarDataSummary.fulfilled, (state, action) => {
      state.daftarDataSummary.loading = false;
      state.daftarDataSummary.result = action.payload;
    });
    builder.addCase(getDaftarDataSummary.rejected, (state) => {
      state.daftarDataSummary.loading = false;
      state.daftarDataSummary.error = 'Error in fetching daftar data summary details!';
    });
    builder.addCase(getDaftarDetail.pending, (state, action) => {
      state.daftarDetails.loading = true;
    });
    builder.addCase(getDaftarDetail.fulfilled, (state, action) => {
      state.daftarDetails.loading = false;
      state.daftarDetails.result[action.payload.id] = action.payload;
      state.daftarData.error = null;
    });
    builder.addCase(getDaftarDetail.rejected, (state) => {
      state.daftarData.loading = false;
      state.daftarData.error = 'Error in fetching daftar Data details!';
    });
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
    builder.addCase(addDaftarData.fulfilled, (state, action) => {
      state.addDaftarData.loading = false;
      state.addDaftarData.result = action.payload;
    });
    builder.addCase(addDaftarData.rejected, (state) => {
      state.addDaftarData.loading = false;
      state.addDaftarData.error = 'Error while adding data';
    });
    builder.addCase(getAddDaftarSDGTujuan.pending, (state) => {
      state.addDaftarTujuanSDG.loading = true;
    });
    builder.addCase(getAddDaftarSDGTujuan.fulfilled, (state, action) => {
      state.addDaftarTujuanSDG.loading = false;
      state.addDaftarTujuanSDG.result = action.payload;
    });
    builder.addCase(getAddDaftarSDGTujuan.rejected, (state) => {
      state.addDaftarTujuanSDG.loading = false;
      state.addDaftarTujuanSDG.error = 'Error while fetching daftar tijuan sdg data';
    });
    builder.addCase(getAddDaftarRKPpp.pending, (state) => {
      state.addDaftarRkpPP.loading = true;
    });
    builder.addCase(getAddDaftarRKPpp.fulfilled, (state, action) => {
      state.addDaftarRkpPP.loading = false;
      state.addDaftarRkpPP.result = action.payload;
    });
    builder.addCase(getAddDaftarRKPpp.rejected, (state) => {
      state.addDaftarRkpPP.loading = false;
      state.addDaftarRkpPP.error = 'Error while fetching daftar rkp pp data';
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
    builder.addCase(downloadDaftarData.pending, (state) => {
      state.downloadDaftarData.loading = true;
    });
    builder.addCase(downloadDaftarData.fulfilled, (state) => {
      state.downloadDaftarData.loading = false;
      state.downloadDaftarData.error = '';
    });
    builder.addCase(downloadDaftarData.rejected, (state) => {
      state.downloadDaftarData.loading = false;
      state.downloadDaftarData.error = 'Error while downloading daftar data';
    });
  },
});

export const produenDataSelector = (state) => state.daftar.produen;
export const daftarDetailsDataSelector = (state) => state.daftar.daftarDetails;
export const daftarDataSelector = (state) => state.daftar.daftarData;
export const daftarDataSummarySelector = (state) => state.daftar.daftarDataSummary;
export const sdgsDataSelector = (state) => state.daftar.sdgs;
export const rkpDataSelector = (state) => state.daftar.rkp;
export const sayaDataSelector = (state) => state.daftar.sayaDaftarData;
export const updateDaftarDataSelector = (state) => state.daftar.updateDaftarData;
export const addDaftarDataSelector = (state) => state.daftar.addDaftarData;
export const addDaftarTujuanSDGSelector = (state) => state.daftar.addDaftarTujuanSDG;
export const addDaftarRkpPPSelector = (state) => state.daftar.addDaftarRkpPP;
export const tujuanSDGPillersSelector = (state) => state.daftar.tujuanSDGPillers;
export const rkpPPSelector = (state) => state.daftar.rkpPP;

export const produenOptionsSelector = createSelector(produenDataSelector, dataToOptionsMapper);
export const tujuanSDGPillerOptionsSelector = createSelector(
  tujuanSDGPillersSelector,
  dataOptionsMapperCurry(idKeteranganOptionsMapper),
);
export const rkpPPOptionsSelector = createSelector(rkpPPSelector, dataOptionsMapperCurry(idKeteranganOptionsMapper));

export const addTujuanSDGPillerOptionsSelector = createSelector(
  addDaftarTujuanSDGSelector,
  dataOptionsMapperCurry(idKeteranganOptionsMapper),
);
export const addRkpPPOptionsSelector = createSelector(
  addDaftarRkpPPSelector,
  dataOptionsMapperCurry(idKeteranganOptionsMapper),
);

export default daftarSlice.reducer;
