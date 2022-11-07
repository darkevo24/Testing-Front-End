import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import find from 'lodash/find';
import { dataOptionsMapperCurry, idKeteranganOptionsMapper, idNameOptionsMapper } from 'utils/helper';
import { apiUrls, get, post } from 'utils/request';
import jwt_decode from 'jwt-decode';

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
  dataindukAll: {
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
  tagline: {
    loading: false,
    error: '',
    records: [],
  },
  kategori: {
    loading: false,
    error: '',
    records: [],
  },
  file: {
    loading: false,
    error: '',
    record: {},
  },
  globalData: {
    loading: false,
    error: '',
    records: {},
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

export const getAllDatainduk = createAsyncThunk('daftar/getAllDatainduk', async () => {
  const response = await get(apiUrls.dataindukAllData);
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

export const getListKategori = createAsyncThunk('cms/getListKategori', async () => {
  const response = await get(apiUrls.kategoriData);
  return response?.data?.content;
});

export const getListTagline = createAsyncThunk('cms/getListTagline', async () => {
  const response = await get(`${apiUrls.taglineData}?size=100&sortBy=keterangan&sort_direction=ASC`);
  return response?.data?.content;
});

export const setNewTagline = createAsyncThunk('cms/setNewTagline', async (params) => {
  const response = await post(apiUrls.taglineData, params);
  return response?.data?.content;
});

export const uploadFoto = createAsyncThunk('cms/uploadFoto', async (formData) => {
  const response = await post(apiUrls.uploadFoto, formData);
  return response?.data;
});

export const getGlobalData = createAsyncThunk('cms/beranda', async (formData) => {
  const response = await get(apiUrls.publicGlobalData, formData);
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
    builder.addCase(getAllDatainduk.pending, (state) => {
      state.dataindukAll.loading = true;
    });
    builder.addCase(getAllDatainduk.fulfilled, (state, action) => {
      state.dataindukAll.loading = false;
      state.dataindukAll.result = action.payload;
    });
    builder.addCase(getAllDatainduk.rejected, (state) => {
      state.dataindukAll.loading = false;
      state.dataindukAll.error = 'Error in getting katalog induk data';
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

    builder.addCase(getListKategori.pending, (state) => {
      state.kategori.loading = true;
    });
    builder.addCase(getListKategori.fulfilled, (state, action) => {
      state.kategori.loading = false;
      state.kategori.records = action.payload;
    });
    builder.addCase(getListKategori.rejected, (state) => {
      state.kategori.loading = false;
      state.kategori.error = 'Error in fetching kategori!';
    });

    builder.addCase(getListTagline.pending, (state) => {
      state.tagline.loading = true;
    });
    builder.addCase(getListTagline.fulfilled, (state, action) => {
      state.tagline.loading = false;
      state.tagline.records = action.payload.records;
    });
    builder.addCase(getListTagline.rejected, (state) => {
      state.tagline.loading = false;
      state.tagline.error = 'Error in fetching tagline!';
    });

    builder.addCase(setNewTagline.pending, (state) => {
      state.tagline.loading = true;
    });
    builder.addCase(setNewTagline.fulfilled, (state, action) => {
      state.tagline.loading = false;
      state.tagline.records = action.payload.records;
    });
    builder.addCase(setNewTagline.rejected, (state) => {
      state.tagline.loading = false;
      state.tagline.error = 'Error in create tagline!';
    });

    builder.addCase(uploadFoto.pending, (state) => {
      state.file.loading = true;
    });
    builder.addCase(uploadFoto.fulfilled, (state, action) => {
      state.file.loading = false;
      state.file.record = action.payload;
    });
    builder.addCase(uploadFoto.rejected, (state) => {
      state.file.loading = false;
      state.file.error = 'Error in upload file!';
    });
    builder.addCase(getGlobalData.pending, (state) => {
      state.globalData.loading = true;
    });
    builder.addCase(getGlobalData.fulfilled, (state, action) => {
      state.globalData.loading = false;
      state.globalData.records = action.payload;
    });
    builder.addCase(getGlobalData.rejected, (state) => {
      state.globalData.loading = false;
      state.globalData.error = 'Error in upload file!';
    });
  },
});

export const { setLoader, setNotificationOptions } = AppSlice.actions;
export const notificationsSelector = (state) => state.global.notificationOptions;
export const instansiDataSelector = (state) => state.global.instansi;
export const dataindukSelector = (state) => state.global.datainduk;
export const dataindukAllSelector = (state) => state.global.dataindukAll;
export const sdgPillersSelector = (state) => state.global.sdgPillers;
export const rkpPNSelector = (state) => state.global.rkpPN;
export const kategoriSelector = (state) => state.global?.kategori;
export const taglineSelector = (state) => state.global?.tagline;
export const fotoSelector = (state) => state.global?.file;
export const globalData = (state) => state.global?.globalData;

export const instansiOptionsSelector = createSelector(instansiDataSelector, dataOptionsMapperCurry(idNameOptionsMapper));
export const dataindukAllOptionsSelector = createSelector(dataindukAllSelector, dataOptionsMapperCurry(idNameOptionsMapper));
export const dataindukOptionsSelector = createSelector(dataindukSelector, dataOptionsMapperCurry(idNameOptionsMapper));
export const sdgPillerOptionsSelector = createSelector(
  sdgPillersSelector,
  dataOptionsMapperCurry(idKeteranganOptionsMapper),
);
export const rkpPNOptionsSelector = createSelector(rkpPNSelector, dataOptionsMapperCurry(idKeteranganOptionsMapper));

export const userInstansiSelector = (state) => {
  const instansiData = instansiDataSelector(state);
  if (instansiData?.result?.length) {
    const user = state?.auth?.user || {};
    const userInstansi = user?.instansi || user?.instansiId;
    if (userInstansi) {
      return find(instansiData.result, { id: userInstansi });
    }
  }
  return null;
};

export default AppSlice.reducer;
