import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const getFormulirPendaftaranData = createAsyncThunk('formulirPendaftaran/getFormulirPendaftaranData', async () => {
  const response = await get(apiUrls.formulirPendaftaran);
  return response?.data;
});

const REDUCER_NAME = 'FORMULIR_PENDAFTARAN_REDUCER';

const INITIAL_STATE = {
  pendaftaranDataset: {
    status: 'idle',
    records: [],
    message: null,
  },
  detailDataset: {
    loading: false,
    error: '',
    record: {},
  },
  logdataset: {
    loading: false,
    error: '',
    records: [],
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(getFormulirPendaftaranData.pending, (state, action) => {
      state.detailDataset.loading = true;
    });
    builder.addCase(getFormulirPendaftaranData.fulfilled, (state, action) => {
      state.detailDataset.loading = false;
      state.pendaftaranDataset.records = action.payload.content;
    });
    builder.addCase(getFormulirPendaftaranData.rejected, (state, action) => {
      state.detailDataset.loading = false;
      state.pendaftaranDataset.message = action.error.message;
    });
  },
});

export const formulirPendaftaranDatasetSelector = (state) => state.formulirPendaftaran?.pendaftaranDataset;
export const formulirPendaftaranDatasetDetailSelector = (state) => state.formulirPendaftaran?.detailDataset;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
