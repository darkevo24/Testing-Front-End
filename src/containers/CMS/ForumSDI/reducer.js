import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get } from 'utils/request';

export const initialState = {
  dataset: {
    payload: {},
    loading: false,
    error: null,
    page: 0,
    records: [],
    size: defaultNumberOfRows,
    totalRecords: null,
    totalPages: null,
  },
  forumSDIDetail: {
    detailResult: null,
    detailLoading: false,
    detailError: null,
  },
  forumSDIStatus: {
    statusResult: null,
    statusLoading: false,
    statusError: null,
  },
  forumSDITopik: {
    topikResult: null,
    topikLoading: false,
    topikError: null,
  },
  forumSDITags: {
    tagsResult: null,
    tagsLoading: false,
    tagsError: null,
  },
  loading: false,
  error: null,
};

export const CMS_FORUM_SDI_SLICE = 'CMS_FORUM_SDI_SLICE';

export const getCMSForumSDIListData = createAsyncThunk('cms/getCMSForumSDIListData', async ({ page, payload }) => {
  const response = await get(apiUrls.cmsForumSDI, { query: { page: page + 1, size: 10, ...payload } });
  return response?.data?.content;
});
export const getCMSForumSDIDataById = createAsyncThunk('cms/getCMSForumSDIDataById', async (params) => {
  const response = await get(`${apiUrls.cmsForumSDI}/${params}`);
  return response?.data?.content;
});
export const getCMSForumSDITopik = createAsyncThunk('cms/getCMSForumSDITopik', async (params) => {
  const response = await get(`${apiUrls.cmsForumSDI}/topik`);
  return response?.data?.content;
});
export const getCMSForumSDIStatus = createAsyncThunk('cms/getCMSForumSDIStatus', async () => {
  const response = await get(`${apiUrls.cmsForumSDI}/status`);
  return response?.data;
});
export const getCMSForumSDITags = createAsyncThunk('cms/getCMSForumSDITags', async () => {
  const response = await get(`${apiUrls.cmsForumSDI}/tags`);
  return response?.data;
});

const cmsForumSDISlice = createSlice({
  name: CMS_FORUM_SDI_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCMSForumSDIListData.pending, (state, action) => {
      const { page = 0, payload = {} } = action.meta.arg || {};
      state.dataset.page = page || 0;
      state.dataset.payload = payload;
      state.dataset.loading = true;
    });
    builder.addCase(getCMSForumSDIListData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
      state.dataset.totalRecords = action.payload.totalRecords;
      state.dataset.totalPages = action.payload.totalPages;
    });
    builder.addCase(getCMSForumSDIListData.rejected, (state) => {
      state.dataset.loading = false;
      state.dataset.error = 'Error in fetching forum sdi list data!';
    });
    builder.addCase(getCMSForumSDIDataById.pending, (state, action) => {
      state.forumSDIDetail.detailLoading = true;
      state.forumSDIDetail.detailError = '';
    });
    builder.addCase(getCMSForumSDIDataById.fulfilled, (state, action) => {
      state.forumSDIDetail.detailLoading = false;
      state.forumSDIDetail.detailResult = action.payload;
    });
    builder.addCase(getCMSForumSDIDataById.rejected, (state, action) => {
      state.forumSDIDetail.detailError = 'Error in fetching forum sdi detail data!';
    });
    builder.addCase(getCMSForumSDIStatus.pending, (state, action) => {
      state.forumSDIStatus.statusLoading = true;
    });
    builder.addCase(getCMSForumSDIStatus.fulfilled, (state, action) => {
      state.forumSDIStatus.statusLoading = false;
      state.forumSDIStatus.statusResult = action.payload.content;
    });
    builder.addCase(getCMSForumSDIStatus.rejected, (state, action) => {
      state.forumSDIStatus.statusError = 'Error in fetching forum sdi status data!';
    });
    builder.addCase(getCMSForumSDITags.pending, (state, action) => {
      state.forumSDITags.tagsLoading = true;
      state.forumSDITags.tagsError = '';
    });
    builder.addCase(getCMSForumSDITags.fulfilled, (state, action) => {
      state.forumSDITags.tagsLoading = false;
      state.forumSDITags.tagsResult = action.payload;
    });
    builder.addCase(getCMSForumSDITags.rejected, (state, action) => {
      state.forumSDITags.tagsError = 'Error in fetching forum sdi tags data!';
    });
    builder.addCase(getCMSForumSDITopik.pending, (state, action) => {
      state.forumSDITopik.topikLoading = true;
      state.forumSDITopik.topikError = '';
    });
    builder.addCase(getCMSForumSDITopik.fulfilled, (state, action) => {
      state.forumSDITopik.topikLoading = false;
      state.forumSDITopik.topikResult = action.payload;
    });
    builder.addCase(getCMSForumSDITopik.rejected, (state, action) => {
      state.forumSDITopik.topikError = 'Error in fetching forum sdi topik data!';
    });
  },
});

export const cmsForumSDIGetListSelector = (state) => state?.cms?.cmsForumSdi?.dataset;
export const cmsForumSDIGetStatusSelector = (state) => state?.cms?.cmsForumSdi?.forumSDIStatus;
export const cmsForumSDIGetTagsSelector = (state) => state?.cms?.cmsForumSdi?.forumSDITags;
export const cmsForumSDIGetTopikSelector = (state) => state?.cms?.cmsForumSdi?.forumSDITopik;
export const cmsForumSDIGetDetailSelector = (state) => state?.cms?.cmsForumSdi?.forumSDIDetail;

export default cmsForumSDISlice.reducer;
