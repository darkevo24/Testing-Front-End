import cloneDeep from 'lodash/cloneDeep';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  dataToOptionsMapper,
  dataOptionsMapperCurry,
  idKeteranganOptionsMapper,
  // idNameOptionsMapper,
  incrementPageParams,
} from 'utils/helper';
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

const defaultSekreteriatDaftarBodyParams = cloneDeep(defaultDaftarBodyParams);
delete defaultSekreteriatDaftarBodyParams.tab;

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
  daftarDataSubmit: {
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
  sekreteriatDaftarData: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      ...apiPaginationParams,
    },
    bodyParams: {
      ...defaultSekreteriatDaftarBodyParams,
    },
  },
  daftarDataSummary: {
    loading: false,
    error: null,
    result: null,
  },
  dataHarvestSummary: {
    loading: false,
    error: null,
    result: null,
  },
  dataInstansiHarvestSummary: {
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
  dafterDataWithId: {
    loading: false,
    error: null,
    result: null,
  },
  dafterDataLogWithId: {
    loading: false,
    error: null,
    result: null,
  },
  kodeReferensi: {
    loading: false,
    error: null,
    result: null,
  },
  katalogVariableData: {
    loading: false,
    error: null,
    result: null,
    pageSize: defaultNumberOfRows,
    params: {
      ...apiPaginationParams,
    },
    bodyParams: {
      filterText: '',
      kodeReferensi: null,
    },
  },
  dataVariable: {
    loading: false,
    error: null,
    result: null,
  },
  deleteVariableData: {
    loading: false,
    error: null,
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

export const getDataHarvestSummary = createAsyncThunk('daftar/getDataHarvestSummary', async (filters = {}) => {
  const response = await get(apiUrls.dataHarvestSummary);
  return response?.data?.result?.length;
});

export const getInstansiHarvestSummary = createAsyncThunk('daftar/getInstansiHarvestSummary', async (filters = {}) => {
  const response = await get(apiUrls.dataInstansiHarvestSummary);
  return response?.data?.result?.length;
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

export const getSekreteriatDaftarData = createAsyncThunk('daftar/getSekreteriatDaftarData', async (filters = {}) => {
  const query = incrementPageParams(filters.params);
  const response = await post(apiUrls.daftarSekreteriatData, filters.bodyParams, { query });
  return response?.data;
});

export const getDaftarDataDetailById = createAsyncThunk('daftar/getDaftarDataDetailById', async (param) => {
  const response = await get(`${apiUrls.daftarData}/${param}`);
  return response?.data;
});

export const getDaftarDataDetailLog = createAsyncThunk('daftar/getDaftarDataDetailLog', async (param) => {
  const response = await get(`${apiUrls.daftarData}/logs/${param}`);
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
  return await put(`${apiUrls.daftarData}`, params);
});

const makeDaftarDataActionCall = (dispatch, action, state) => {
  const { params, bodyParams } = state;
  const filters = { params, bodyParams };
  return dispatch(action(filters));
};

export const refetchDaftarData = createAsyncThunk('daftarData/refetchDaftarData', async (_, { dispatch, getState }) => {
  const state = getState()?.daftar;
  makeDaftarDataActionCall(dispatch, getDaftarData, state.daftarData);
  makeDaftarDataActionCall(dispatch, getRkpDaftarData, state.rkp);
  makeDaftarDataActionCall(dispatch, getSdgDaftarData, state.sdgs);
  makeDaftarDataActionCall(dispatch, getSayaDaftarData, state.sayaDaftarData);
});

export const deleteDaftarData = createAsyncThunk('daftar/deleteDaftarData', async (params, { dispatch }) => {
  const response = await deleteRequest(`${apiUrls.daftarData}/${params.id}`);
  dispatch(refetchDaftarData());
  return response;
});

export const daftarDataSubmit = createAsyncThunk('daftarData/daftarDataSubmit', async (payload) => {
  const isEdit = !!payload.id;
  let url = apiUrls.daftarData;
  let methodToCall = post;
  if (isEdit) {
    url = `${url}/${payload.id}`;
    methodToCall = put;
  }
  const response = await methodToCall(url, payload);
  return response?.data?.content;
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
  let content = [];
  if (id) {
    const response = await get(`${apiUrls.sdgPillers}/parent/${id}`);
    content = response?.data?.content;
  }
  return content;
});

export const getAddDaftarRKPpp = createAsyncThunk('daftarData/getAddDaftarRKPpp', async (id) => {
  let content = [];
  if (id) {
    const response = await get(`${apiUrls.rkpPN}/parent/${id}`);
    content = response?.data?.content;
  }
  return content;
});

export const downloadDaftarData = createAsyncThunk('daftarData/downloadDaftarData', async (params) => {
  const response = await post(apiUrls.daftarDataDownload, params);
  return response?.data;
});

export const getKodeReferensi = createAsyncThunk('daftarData/getKodeReferensi', async (daftarId) => {
  const response = await get(`${apiUrls.katalogVariable}/${daftarId}/kodereferensi`);
  return response?.data?.content;
});

export const getKatalogVariables = createAsyncThunk('daftarData/getKatalogVariables', async ({ daftarId, filters }) => {
  const query = incrementPageParams(filters.params);
  const response = await post(`${apiUrls.katalogVariable}/${daftarId}/list`, filters.bodyParams, { query });
  return response?.data?.content;
});

export const deleteVariableData = createAsyncThunk('daftar/deleteVariableData', async (params) => {
  return deleteRequest(`${apiUrls.variable}/${params.id}`);
});

export const dataVariableSubmit = createAsyncThunk('daftarData/dataVariableSubmit', async (payload) => {
  const isEdit = !!payload.id;
  let url = isEdit ? `${apiUrls.variable}/${payload.id}` : `${apiUrls.katalogVariable}/${payload.idKatalog}`;
  const methodToCall = isEdit ? put : post;
  payload.kodeReferensi = payload.kodeReferensi || 0;
  return methodToCall(url, payload);
});

const daftarSlice = createSlice({
  name: DAFTAR_REDUCER,
  initialState,
  reducers: {
    setSDGsData: (state) => {
      state.tujuanSDGPillers.result = [];
    },
    setRKPppData: (state) => {
      state.rkpPP.result = [];
    },
    resetDaftarData: (state) => {
      state.dafterDataWithId.loading = false;
      state.dafterDataWithId.error = '';
      state.dafterDataWithId.result = null;
    },
  },
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
    builder.addCase(getDataHarvestSummary.pending, (state) => {
      state.dataHarvestSummary.loading = true;
    });
    builder.addCase(getDataHarvestSummary.fulfilled, (state, action) => {
      state.dataHarvestSummary.loading = false;
      state.dataHarvestSummary.result = action.payload;
    });
    builder.addCase(getDataHarvestSummary.rejected, (state) => {
      state.dataHarvestSummary.loading = false;
      state.dataHarvestSummary.error = 'Error in fetching daftar data summary harvest details!';
    });
    builder.addCase(getInstansiHarvestSummary.pending, (state) => {
      state.dataInstansiHarvestSummary.loading = true;
    });
    builder.addCase(getInstansiHarvestSummary.fulfilled, (state, action) => {
      state.dataInstansiHarvestSummary.loading = false;
      state.dataInstansiHarvestSummary.result = action.payload;
    });
    builder.addCase(getInstansiHarvestSummary.rejected, (state) => {
      state.dataInstansiHarvestSummary.loading = false;
      state.dataInstansiHarvestSummary.error = 'Error in fetching daftar data summary instansi harvest details!';
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
    builder.addCase(getSekreteriatDaftarData.pending, (state, action) => {
      const { bodyParams, params } = action.meta.arg;
      state.sekreteriatDaftarData.params = params;
      state.sekreteriatDaftarData.bodyParams = bodyParams;
      state.sekreteriatDaftarData.loading = true;
    });
    builder.addCase(getSekreteriatDaftarData.fulfilled, (state, action) => {
      state.sekreteriatDaftarData.loading = false;
      state.sekreteriatDaftarData.result = action.payload;
    });
    builder.addCase(getSekreteriatDaftarData.rejected, (state) => {
      state.sekreteriatDaftarData.loading = false;
      state.sekreteriatDaftarData.error = 'Error in fetching Sekreteriat daftarData details!';
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
    builder.addCase(daftarDataSubmit.pending, (state) => {
      state.daftarDataSubmit.loading = true;
    });
    builder.addCase(daftarDataSubmit.fulfilled, (state, action) => {
      state.daftarDataSubmit.loading = false;
      state.daftarDataSubmit.result = action.payload;
      state.daftarDetails.result[action.payload.id] = action.payload;
    });
    builder.addCase(daftarDataSubmit.rejected, (state) => {
      state.daftarDataSubmit.loading = false;
      state.daftarDataSubmit.error = 'Error while adding data';
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
      state.deleteDaftarData.loading = true;
    });
    builder.addCase(deleteDaftarData.fulfilled, (state) => {
      state.deleteDaftarData.loading = false;
      state.deleteDaftarData.error = '';
    });
    builder.addCase(deleteDaftarData.rejected, (state) => {
      state.deleteDaftarData.loading = false;
      state.deleteDaftarData.error = 'Error while deleting daftar data';
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
    builder.addCase(getDaftarDataDetailById.pending, (state) => {
      state.dafterDataWithId.loading = true;
      state.dafterDataWithId.error = '';
    });
    builder.addCase(getDaftarDataDetailById.fulfilled, (state, { payload }) => {
      state.dafterDataWithId.loading = false;
      state.dafterDataWithId.result = payload.content;
    });
    builder.addCase(getDaftarDataDetailById.rejected, (state) => {
      state.dafterDataWithId.loading = false;
      state.dafterDataWithId.error = 'Error while fetching data';
    });
    builder.addCase(getDaftarDataDetailLog.pending, (state) => {
      state.dafterDataLogWithId.loading = true;
    });
    builder.addCase(getDaftarDataDetailLog.fulfilled, (state, { payload }) => {
      state.dafterDataLogWithId.loading = false;
      state.dafterDataLogWithId.result = payload.content;
    });
    builder.addCase(getDaftarDataDetailLog.rejected, (state) => {
      state.dafterDataLogWithId.loading = false;
      state.dafterDataLogWithId.error = 'Error while fetching data';
    });
    builder.addCase(getKodeReferensi.pending, (state) => {
      state.kodeReferensi.loading = true;
    });
    builder.addCase(getKodeReferensi.fulfilled, (state, action) => {
      state.kodeReferensi.loading = false;
      state.kodeReferensi.result = action.payload;
      state.kodeReferensi.error = '';
    });
    builder.addCase(getKodeReferensi.rejected, (state) => {
      state.kodeReferensi.loading = false;
      state.kodeReferensi.error = 'Error while fetching kodeReferensi data';
    });
    builder.addCase(getKatalogVariables.pending, (state, action) => {
      const {
        filters: { bodyParams, params },
      } = action.meta.arg;
      state.katalogVariableData.params = params;
      state.katalogVariableData.bodyParams = bodyParams;
      state.katalogVariableData.loading = true;
    });
    builder.addCase(getKatalogVariables.fulfilled, (state, action) => {
      state.katalogVariableData.loading = false;
      state.katalogVariableData.result = action.payload;
    });
    builder.addCase(getKatalogVariables.rejected, (state) => {
      state.katalogVariableData.loading = false;
      state.katalogVariableData.error = 'Error in fetching katalog variable data details!';
    });
    builder.addCase(dataVariableSubmit.pending, (state) => {
      state.dataVariable.loading = true;
    });
    builder.addCase(dataVariableSubmit.fulfilled, (state, action) => {
      state.dataVariable.loading = false;
      state.dataVariable.result = action.payload;
    });
    builder.addCase(dataVariableSubmit.rejected, (state) => {
      state.dataVariable.loading = false;
      state.dataVariable.error = 'Error while adding data';
    });
    builder.addCase(deleteVariableData.pending, (state) => {
      state.deleteVariableData.loading = true;
    });
    builder.addCase(deleteVariableData.fulfilled, (state) => {
      state.deleteVariableData.loading = false;
      state.deleteVariableData.error = '';
    });
    builder.addCase(deleteVariableData.rejected, (state) => {
      state.deleteVariableData.loading = false;
      state.deleteVariableData.error = 'Error while deleting variable data';
    });
  },
});

export const produenDataSelector = (state) => state.daftar.produen;
export const daftarDetailsDataSelector = (state) => state.daftar.daftarDetails;
export const daftarDataSelector = (state) => state.daftar.daftarData;
export const sekreteriatDaftarDataSelector = (state) => state.daftar.sekreteriatDaftarData;
export const daftarDataSummarySelector = (state) => state.daftar.daftarDataSummary;
export const dataHarvestSummarySelector = (state) => state.daftar.dataHarvestSummary;
export const dataInstansiHarvestSummarySelector = (state) => state.daftar.dataInstansiHarvestSummary;
export const sdgsDataSelector = (state) => state.daftar.sdgs;
export const rkpDataSelector = (state) => state.daftar.rkp;
export const sayaDataSelector = (state) => state.daftar.sayaDaftarData;
export const updateDaftarDataSelector = (state) => state.daftar.updateDaftarData;
export const daftarDataSubmitSelector = (state) => state.daftar.daftarDataSubmit;
export const addDaftarTujuanSDGSelector = (state) => state.daftar.addDaftarTujuanSDG;
export const addDaftarRkpPPSelector = (state) => state.daftar.addDaftarRkpPP;
export const tujuanSDGPillersSelector = (state) => state.daftar.tujuanSDGPillers;
export const rkpPPSelector = (state) => state.daftar.rkpPP;
export const dafterDataWithIdSelector = (state) => state.daftar.dafterDataWithId;
export const dafterLogDataWithIdSelector = (state) => state.daftar.dafterDataLogWithId;
export const katalogVariableDataSelector = (state) => state.daftar.katalogVariableData;
export const kodeReferensiSelector = (state) => state.daftar.kodeReferensi;

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

export const { setRKPppData, setSDGsData, resetDaftarData } = daftarSlice.actions;
export default daftarSlice.reducer;
