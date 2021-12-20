import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    payload: {},
    loading: false,
    error: null,
    page: 0,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
  },
  error: null,
};

export const KOMUNITAS_AHLI_SLICE = 'KOMUNITAS_AHLI_SLICE';

export const getKomunitasAhliData = createAsyncThunk('cms/getKomunitasAhliData', async ({ page, ...rest }) => {
  const response = await get(apiUrls.portalKomunitasAhliData, { query: { page: page + 1, size: 10, ...rest } });
  return response?.data?.content;
});

const komunitasAhliSlice = createSlice({
  name: KOMUNITAS_AHLI_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKomunitasAhliData.pending, (state, action) => {
      const { page = 0, payload } = action.meta.arg || {};
      state.dataset.page = page || 0;
      state.dataset.payload = payload || {};
      state.dataset.loading = true;
    });
    builder.addCase(getKomunitasAhliData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
    });
    builder.addCase(getKomunitasAhliData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.records = [];
      state.dataset.totalRecords = 0;
      state.dataset.error = 'Error in fetching komunitas ahli data!';
    });
  },
});

export const komunitasAhliDatasetSelector = (state) => state.komunitasAhli?.dataset;
export default komunitasAhliSlice.reducer;
