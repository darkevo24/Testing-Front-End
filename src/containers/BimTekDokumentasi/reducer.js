import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getBimtekDokumentasiMingguIni = createAsyncThunk(
  'bimtekAllDokumentasi/getBimtekDokumentasiMingguIni',
  async (params) => {
    const response = await get(apiUrls.bimtekDokumentasiMingguIni, {
      query: params,
    });
    return response?.data?.content;
  },
);

export const getBimtekDokumentasiMingguLalu = createAsyncThunk(
  'bimtekAllDokumentasi/getBimtekDokumentasiMingguLalu',
  async (params) => {
    const response = await get(apiUrls.bimtekDokumentasiMingguLalu, {
      query: params,
    });
    return response?.data?.content;
  },
);

export const getBimtekDokumentasiBulanIni = createAsyncThunk(
  'bimtekAllDokumentasi/getBimtekDokumentasiBulanIni',
  async (params) => {
    const response = await get(apiUrls.bimtekDokumentasiBulanIni, {
      query: params,
    });
    return response?.data?.content;
  },
);

export const getBimtekAllDokumentasi = createAsyncThunk('bimtekAllDokumentasi/getBimtekAllDokumentasi', async (params) => {
  let response;
  let url = apiUrls.bimtekDokumentasi;
  if (params.id) {
    url += `/${params.id}`;
    response = await get(url);
  } else {
    response = await get(url, {
      query: params,
    });
  }
  return response?.data?.content;
});

const REDUCER_NAME = 'BIMTEK_ALL_DOKUMENTASI_REDUCER';

const INITIAL_STATE = {
  mingguIniDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    totalRecords: 0,
    totalPages: 1,
    message: null,
  },
  mingguLaluDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    totalRecords: 0,
    totalPages: 1,
    message: null,
  },
  bulanIniDataset: {
    status: 'idle',
    records: [],
    page: 1,
    size: 10,
    totalRecords: 0,
    totalPages: 1,
    message: null,
  },
  documentasiDataset: {
    status: 'idle',
    records: [],
    singleRecord: [],
    page: 1,
    size: 10,
    totalRecords: 0,
    totalPages: 1,
    message: null,
  },
  detailDataset: {
    loading: false,
    error: '',
    record: {},
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder.addCase(getBimtekDokumentasiMingguIni.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekDokumentasiMingguIni.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.mingguIniDataset.records = action.payload.records;
      state.mingguIniDataset.page = action.payload.page;
      state.mingguIniDataset.size = action.payload.size;
      state.mingguIniDataset.totalPages = action.payload.totalPages;
      state.mingguIniDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekDokumentasiMingguIni.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.mingguIniDataset.message = action.error.message;
    });
    builder.addCase(getBimtekDokumentasiMingguLalu.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekDokumentasiMingguLalu.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.mingguLaluDataset.records = action.payload.records;
      state.mingguLaluDataset.page = action.payload.page;
      state.mingguLaluDataset.size = action.payload.size;
      state.mingguLaluDataset.totalPages = action.payload.totalPages;
      state.mingguLaluDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekDokumentasiMingguLalu.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.mingguLaluDataset.message = action.error.message;
    });
    builder.addCase(getBimtekDokumentasiBulanIni.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekDokumentasiBulanIni.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.bulanIniDataset.records = action.payload.records;
      state.bulanIniDataset.page = action.payload.page;
      state.bulanIniDataset.size = action.payload.size;
      state.bulanIniDataset.totalPages = action.payload.totalPages;
      state.bulanIniDataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getBimtekDokumentasiBulanIni.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.bulanIniDataset.message = action.error.message;
    });
    builder.addCase(getBimtekAllDokumentasi.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getBimtekAllDokumentasi.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      if (!action?.payload?.records) {
        state.documentasiDataset.singleRecord = action.payload;
      } else {
        state.documentasiDataset.records = action.payload.records;
      }
    });
    builder.addCase(getBimtekAllDokumentasi.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.documentasiDataset.message = action.error.message;
    });
  },
});

export const bimtekDokumentasiMingguIni = (state) => state.bimtekAllDokumentasi?.mingguIniDataset;
export const bimtekDokumentasiMingguLalu = (state) => state.bimtekAllDokumentasi?.mingguLaluDataset;
export const bimtekDokumentasiBulanIni = (state) => state.bimtekAllDokumentasi?.bulanIniDataset;
export const bimtekAllDokumentasi = (state) => state.bimtekAllDokumentasi?.documentasiDataset;
export default SLICE_OBJ.reducer;
