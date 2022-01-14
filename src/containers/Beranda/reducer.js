import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { tokenSelector } from 'containers/Login/reducer';
import { apiUrls, defaultNumberOfRows, get, paginationParams, post } from 'utils/request';
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
  'facet.limit': 500,
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
  logTrendingOrPopular: {
    loading: false,
    error: '',
    records: [],
  },
  user: null,
  error: null,
};

export const BERANDA_REDUCER = 'BERANDA_REDUCER';

export const getDataSet = createAsyncThunk('beranda/getDataset', async (params, { getState }) => {
  const state = getState();
  const token = tokenSelector(state);
  let data = cloneDeep(params);
  if (!token) {
    data.q = [data.q];
    if (data.kategori?.length) {
      data.kategori.forEach(({ id }) => data.q.push(`kategori=${id}`));
    }
    delete data.kategori;
    data.q = data.q.filter(Boolean).join('&');
  } else if (data.kategori?.length) {
    data.kategori = data.kategori.map(({ id }) => ({ id: id.replace(/ /g, '*') }));
  }
  data = mapParamsToJsonString(data, ['facet.field']);
  data = mapParamsToOrString(data, facetFields);
  data = mapOrStringsToFq(data, facetFields);

  // Note: adding this until katalog backedn team provides more details
  // data.ext_bbox = '99.00878906249999%2C-6.315298538330033%2C120.80566406250001%2C2.8113711933311403';
  // data.ext_prev_extent = '97.119140625%2C-10.487811882056683%2C122.6953125%2C7.013667927566642';
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

export const logHomeTrendingOrPopular = createAsyncThunk(
  'beranda/logHomeTrendingOrPopular',
  async (param, { rejectWithValue }) => {
    try {
      return await post(apiUrls.homeDataSetEndPoint, param);
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

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

    /***
     * Log Home Or Trending.
     *
     */
    builder.addCase(logHomeTrendingOrPopular.pending, (state) => {
      state.logTrendingOrPopular.loading = true;
    });
    builder.addCase(logHomeTrendingOrPopular.fulfilled, (state, action) => {
      state.logTrendingOrPopular.loading = false;
      state.logTrendingOrPopular.records = action.payload.records;
    });
    builder.addCase(logHomeTrendingOrPopular.rejected, (state) => {
      state.logTrendingOrPopular.loading = false;
      state.logTrendingOrPopular.error = 'Error !';
    });
  },
});

export const datasetSelector = (state) => state.beranda?.dataset;
export const datasetTrendingSelector = (state) => state.beranda?.datasetTrending;
export const datasetPopularSelector = (state) => state.beranda?.datasetPopular;

// export const { } = berandaSlice.actions;

export default berandaSlice.reducer;
