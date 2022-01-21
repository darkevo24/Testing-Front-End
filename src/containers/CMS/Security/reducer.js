import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  configSecurty: {
    configResult: [],
    configLoading: false,
    configError: null,
  },
  loading: false,
  error: null,
};

export const CMS_CONFIG_SECURITY = 'CMS_CONFIG_SECURITY';

export const getListConfigSecurity = createAsyncThunk('cms/getListConfigSecurity', async (params) => {
  const response = await get(apiUrls.cmsConfigSecurity);
  console.log(response);
  // return response?.data?.content;
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
      state.configSecurty.configResult = action.payload?.content || [];
    });
    builder.addCase(getListConfigSecurity.rejected, (state, action) => {
      state.configSecurty.configLoading = false;
      state.configSecurty.configError = 'Error in fetching list config security!';
    });
  },
});

export const configSecurityListSelector = (state) => state?.cmsConfigSecurity?.configSecurty;

export default cmsConfigSecurity.reducer;
