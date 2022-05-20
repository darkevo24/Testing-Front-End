import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, post, put, get, deleteRequest } from 'utils/request';

const INITIAL_STATE = {
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
};

export const getListKonfigurasiPortal = createAsyncThunk('cms/getKonfigurasiPortal', async (params) => {
  const response = await get(`${apiUrls.konfigurasiPortal}`, {});
  return response?.data?.content;
});
const REDUCER_NAME = 'KONFIGURASI_PORTAL';
const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    // updateResult: (state, action) => {
    //   console.log('masuk keupdateresult');
    //   state.dataset.records = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getListKonfigurasiPortal.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getListKonfigurasiPortal.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload;
    });
    builder.addCase(getListKonfigurasiPortal.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching konfigurasi portal!';
    });
  },
});

export const konfiguasiPortalCmsListSelector = (state) => state.konfigurasiPortal?.dataset;
// export const detailDataSelector = (state) => state.konfigurasiPortal?.detaildataSet;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
