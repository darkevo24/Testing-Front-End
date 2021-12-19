import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { apiUrls, defaultNumberOfRows, get, paginationParams } from 'utils/request';
import {
  mapOrStringsToFq,
  mapParamsToJsonString,
  mapParamsToOrString,
  pickValidDatasetPaginationParams,
} from 'utils/helper';

const facetFields = ['organization', 'kategori', 'tags', 'res_format'];

export const getInitialParams = () => ({
  currentPage: 0,
  'facet.field': facetFields,
  ...paginationParams,
});

export const initialState = {
  loading: false,
  dataset: {
    loading: false,
    error: null,
    result: null,
    searchFacets: null,
    pageSize: defaultNumberOfRows,
    params: getInitialParams(),
  },
  datasetTrending: {
    loading: false,
    error: null,
    records: [],
  },
  datasetPopular: {
    loading: false,
    error: null,
    records: [],
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
  const response = await get(apiUrls.dataset, { query: pickValidDatasetPaginationParams(data) });
  return response?.data?.result;
});

/**
 * Define needed action
 *
 */
export const getDatasetTrending = createAsyncThunk('beranda/datasetTrending', async (param) => {
  const response = await get(`${apiUrls.homeDataSetEndPoint}/${param}`);
  return response?.data?.content;
});

export const getDatasetPopular = createAsyncThunk('beranda/datasetPopular', async (param) => {
  const response = await get(`${apiUrls.homeDataSetEndPoint}/${param}`);
  return response?.data?.content;
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
      if (!state.dataset.searchFacets || state.dataset?.params?.resetFilter) {
        state.dataset.searchFacets = action.payload.search_facets;
      }
    });
    builder.addCase(getDataSet.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching dataset details!';
    });

    /***
     * Get Dataset Trending
     *
     */
    builder.addCase(getDatasetTrending.pending, (state) => {
      state.datasetTrending.loading = true;
    });
    builder.addCase(getDatasetTrending.fulfilled, (state, action) => {
      state.datasetTrending.loading = false;
      state.datasetTrending.records = action.payload || [];
    });
    builder.addCase(getDatasetTrending.rejected, (state) => {
      state.datasetTrending.loading = false;
      state.datasetTrending.error = true;
    });

    /***
     * Get Dataset Popular
     *
     */
    builder.addCase(getDatasetPopular.pending, (state) => {
      state.datasetPopular.loading = true;
    });
    builder.addCase(getDatasetPopular.fulfilled, (state, action) => {
      state.datasetPopular.loading = false;
      state.datasetPopular.records = action.payload || [];
    });
    builder.addCase(getDatasetPopular.rejected, (state) => {
      state.datasetPopular.loading = false;
      state.datasetPopular.error = true;
    });
  },
});

export const datasetSelector = (state) => state.beranda?.dataset;
export const datasetTrendingSelector = (state) => state.beranda?.datasetTrending;
export const datasetPopularSelector = (state) => state.beranda?.datasetPopular;

// export const { } = berandaSlice.actions;

export default berandaSlice.reducer;
