import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { apiUrls, defaultNumberOfRows, get, paginationParams } from 'utils/request';
import {
  mapOrStringsToFq,
  mapParamsToJsonString,
  mapParamsToOrString,
  pickValidDatasetPaginationParams,
} from 'utils/helper';

const facetFields = ['organization', 'groups', 'tags', 'res_format'];

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    result: null,
    searchFacets: null,
    pageSize: defaultNumberOfRows,
    params: {
      currentPage: 0,
      'facet.field': facetFields,
      ...paginationParams,
    },
  },
  user: null,
  error: null,
};

export const BERANDA_REDUCER = 'BERANDA_REDUCER';

export const getDataSet = createAsyncThunk('beranda/getDataset', async (params) => {
  let data = cloneDeep(params);
  data = mapParamsToJsonString(data, ['facet.field']);
  data = mapParamsToOrString(data, facetFields);
  data = mapOrStringsToFq(data, facetFields);
  const response = await get(apiUrls.dataset, { data: pickValidDatasetPaginationParams(data) });
  return response?.result;
});

const berandaSlice = createSlice({
  name: BERANDA_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataSet.pending, (state, action) => {
      state.dataset.params = action.meta.arg;
      state.dataset.loading = true;
    });
    builder.addCase(getDataSet.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.result = action.payload;
      if (!state.dataset.searchFacets) {
        state.dataset.searchFacets = action.payload.search_facets;
      }
    });
    builder.addCase(getDataSet.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching dataset details!';
    });
  },
});

export const datasetSelector = (state) => state.beranda?.dataset;

// export const { } = berandaSlice.actions;

export default berandaSlice.reducer;
