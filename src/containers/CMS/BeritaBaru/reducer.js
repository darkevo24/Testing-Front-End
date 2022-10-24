import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrls, defaultNumberOfRows, post, put, get, deleteRequest } from 'utils/request';

// const defaultBeritaBodyParams = {
//   size: '10',
//   page: 1,
//   judul: '',
//   direction: 'DESC',
//   sortBy: 0,
// };

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    page: 1,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalRecords: 0,
    totalPages: 1,
    // bodyParams: {
    //   ...defaultBeritaBodyParams,
    // },
  },
  detaildataSet: {
    loading: false,
    error: '',
    record: {},
  },
  logBerita: {
    loading: false,
    error: '',
    records: [],
  },
  user: null,
  error: null,
};

export const BERITA_CMS_SLICE = 'BERITA_CMS_SLICE';

export const getListBerita = createAsyncThunk('cms/getListBerita', async (params) => {
  const url = `${apiUrls.cmsBeritaData}/sortby`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1WktObnA1My1IbmNtdkRtWXVMM2ota1pkWG56cENpT0x5ZzlYRHpSZ2k4In0.eyJleHAiOjE2NjY0OTgyMzksImlhdCI6MTY2NjQ5MTA1MSwiYXV0aF90aW1lIjoxNjY2NDkxMDM5LCJqdGkiOiJjNWMzN2E4NS00Yzg3LTRmYWItODQ1ZC0zY2RmMTI4ZTI4YjIiLCJpc3MiOiJodHRwczovL3Nzby5kZWx0YWRhdGFtYW5kaXJpLmNvbS9hdXRoL3JlYWxtcy9zYXR1LWRhdGEtcG9ydGFsLXRlc3QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNWE1MTBjNDktMjk5My00MzUyLTkzMDUtOTFhMDgyZDUyMGFlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2F0dS1kYXRhLXBvcnRhbC1jbGllbnQiLCJub25jZSI6Ijg1NTMwYzA4LTRiODctNGVmNi05YzZkLTU0MjE0MDJmNjY0YSIsInNlc3Npb25fc3RhdGUiOiJjYTA2ZDNlMy05Yjk3LTRlNzItOWM1Ni0xZjRmMTA3MmY5MmIiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCIsImVtYWlsIjoiYnJpamVzaEBkZWx0YWRhdGFtYW5kaXJpLmNvbSJ9.RxwAtax6Q3uqOR18j3o1dmD4LKiTzoeqxIAtxlurifOBxL8Bw5qqy5xlGybsMtH_Tqqso2sz5YPA8YBNVHi06J1Uc4vkdlpDEO9g4crAIKOCsbICjtWxM1zT5O7vm_9muzM1vAJqrVTyt89dbd0KFB4gV6Fv6nX32_Usrm1iw8nNiZ2uBW2XsLaUl54w_uMnCCoizRJ_FTO5ajWhkYQg8BczF38Xev9wvf-llt_nkGqBKRiEisFUkCCqFPHDhb3JJt2gOz4UBib3rbYDCkdXrRbb29U7hhBwcfZzPsxGK3sOGr4jeOuzrfpoWvN7CcQXO_XNI12o4sE3KRjYFcj2Sw`,
  };
  const data = {
    size: params.size,
    page: params.page,
    sortDirection: params.sortDirection,
    sortBy: params.sortBy,
  };

  console.log('data', data);

  const response = await post(url, data, headers);

  return response?.data?.content;
});

export const setNewBerita = createAsyncThunk('cms/setNewBerita', async (params) => {
  const response = await post(apiUrls.cmsBeritaData, params.payload);
  return response?.data;
});

export const setDetailBerita = createAsyncThunk('cms/setDetailBerita', async (params) => {
  const response = await get(`${apiUrls.cmsBeritaData}/${params.id}`, {});
  return response?.data?.content;
});

export const setEditBerita = createAsyncThunk('cms/setEditBerita', async (params) => {
  const response = await put(`${apiUrls.cmsBeritaData}/${params.id}`, params.payload);
  return response?.data?.content;
});

export const setStatusBerita = createAsyncThunk('cms/setStatusBerita', async (params) => {
  const response = await put(`${apiUrls.cmsBeritaData}/status`, params.payload);
  return response?.data?.content;
});

export const deleteBerita = createAsyncThunk('cms/deleteBerita', async (params) => {
  const response = await deleteRequest(`${apiUrls.cmsBeritaData}/${params.id}`);
  return response?.data;
});

export const setPreviewBerita = createAsyncThunk('cms/setPreviewBerita', async (params) => {
  return params;
});

export const getLogBerita = createAsyncThunk('cmsBerita/getLogBerita', async (params) => {
  const response = await get(`${apiUrls.cmsBeritaData}/logs/${params.id}`);
  return response?.data?.content;
});

const beritaCmsSlice = createSlice({
  name: BERITA_CMS_SLICE,
  initialState,
  reducers: {
    updateResult: (state, action) => {
      state.dataset.records = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListBerita.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListBerita.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.page = action.payload.page;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getListBerita.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching berita cms!';
    });

    builder.addCase(setNewBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setNewBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setNewBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching create berita data!';
    });

    builder.addCase(setDetailBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setDetailBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setDetailBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching detail berita data!';
    });

    builder.addCase(setEditBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setEditBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setEditBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching edit berita!';
    });

    builder.addCase(setStatusBerita.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(setStatusBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(setStatusBerita.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching edit berita!';
    });

    builder.addCase(deleteBerita.pending, (state) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(deleteBerita.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
    });
    builder.addCase(deleteBerita.rejected, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = action.error.message;
    });

    builder.addCase(setPreviewBerita.fulfilled, (state, action) => {
      state.detaildataSet.record = action.payload;
    });

    builder.addCase(getLogBerita.pending, (state) => {
      state.logBerita.loading = true;
    });
    builder.addCase(getLogBerita.fulfilled, (state, action) => {
      state.logBerita.loading = false;
      state.logBerita.records = action.payload;
    });
    builder.addCase(getLogBerita.rejected, (state, action) => {
      state.logBerita.loading = false;
      state.logBerita.error = action.error.message;
    });
  },
});

export const beritaCmsListSelector = (state) => state.cmsBerita?.dataset;
export const detailDataSelector = (state) => state.cmsBerita?.detaildataSet;
export const logBeritaSelector = (state) => state.cmsBerita?.logBerita;

export const { updateResult } = beritaCmsSlice.actions;
export default beritaCmsSlice.reducer;
