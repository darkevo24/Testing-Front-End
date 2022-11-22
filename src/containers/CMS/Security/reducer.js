import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  configSecurty: {
    configResult: [],
    configLoading: false,
    configError: null,
  },
  configFeature: {
    featureResult: [],
    featureLoading: false,
    featureError: null,
  },
  configValues: {
    valueResult: [],
    valueLoading: false,
    valueError: null,
  },
  loading: false,
  error: null,
};

export const CMS_CONFIG_SECURITY = 'CMS_CONFIG_SECURITY';

export const getListConfigSecurity = createAsyncThunk('cms/getListConfigSecurity', async (params) => {
  const response = await get(apiUrls.cmsConfigSecurity);
  return response?.data?.content[0]?.content;
});

export const getListConfigFeature = createAsyncThunk('cms/getListConfigFeature', async (params) => {
  const response = await get(apiUrls.cmsConfigFeature);
  return response?.data?.content;
});

export const getListValues = createAsyncThunk('cms/getListValues', async (params) => {
  const response = await get(`${apiUrls.cmsConfigSecurity}/values/${params}`);
  return response?.data?.content;
});

const cmsConfigSecurity = createSlice({
  name: CMS_CONFIG_SECURITY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListConfigSecurity.pending, (state, action) => {
      state.configSecurty.configLoading = true;
      state.configSecurty.configError = '';
    });
    builder.addCase(getListConfigSecurity.fulfilled, (state, action) => {
      state.configSecurty.configLoading = false;
      state.configSecurty.configResult = action.payload || [];
    });
    builder.addCase(getListConfigSecurity.rejected, (state, action) => {
      state.configSecurty.configLoading = false;
      state.configSecurty.configError = 'Error in fetching list config security!';
    });
    builder.addCase(getListConfigFeature.pending, (state, action) => {
      state.configFeature.featureLoading = true;
      state.configFeature.featureError = '';
    });
    builder.addCase(getListConfigFeature.fulfilled, (state, action) => {
      state.configFeature.featureLoading = false;
      state.configFeature.featureResult = action.payload || [];
    });
    builder.addCase(getListConfigFeature.rejected, (state, action) => {
      state.configFeature.featureLoading = false;
      state.configFeature.featureError = 'Error in fetching list config feature!';
    });
    builder.addCase(getListValues.pending, (state, action) => {
      state.configValues.valueLoading = true;
      state.configValues.valueError = '';
    });
    builder.addCase(getListValues.fulfilled, (state, action) => {
      state.configValues.valueLoading = false;
      state.configValues.valueResult = action.payload || [];
    });
    builder.addCase(getListValues.rejected, (state, action) => {
      state.configValues.valueLoading = false;
      state.configValues.valueError = 'Error in fetching list config security!';
    });
  },
});

export const configSecurityListSelector = (state) => state?.cmsSecurity?.configSecurty;
export const configListValueSelector = (state) => state?.cmsSecurity?.configValues;
export const configListFeatureSelector = (state) => state?.cmsSecurity?.configFeature;

export default cmsConfigSecurity.reducer;
