import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const initialState = {
  getList: {
    result: null,
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
};

export const CMS_FORUM_SDI_SLICE = 'CMS_FORUM_SDI_SLICE';

export const getCMSForumSDIData = createAsyncThunk('cms/getCMSForumSDIData', async () => {
  const response = await get(apiUrls.cmsForumSdi);
  return response;
});

const cmsForumSDISlice = createSlice({
  name: CMS_FORUM_SDI_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCMSForumSDIData.pending, (state, action) => {
      state.getList.loading = true;
    });
    builder.addCase(getCMSForumSDIData.fulfilled, (state, action) => {
      state.getList.loading = false;
      state.getList.result = action.payload;
    });
    builder.addCase(getCMSForumSDIData.rejected, (state) => {
      state.getList.loading = false;
      state.getList.error = 'Error in fetching forum sdi list data!';
    });
  },
});

export const cmsForumSdiGetListSelector = (state) => state.cms?.forumSdi?.getList;

export default cmsForumSDISlice.reducer;
