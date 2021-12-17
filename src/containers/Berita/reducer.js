import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const initialState = {
  tweet: {
    loading: false,
    error: null,
    records: [],
  },
  newsSearch: {
    loading: false,
    error: null,
    records: [],
  },
  latestNews: {
    loading: false,
    error: null,
    records: [],
  },
  popularTopic: {
    loading: false,
    error: null,
    records: [],
  },
  otherNews: {
    loading: false,
    error: null,
    records: [],
  },
};

export const USER_NEWS_PORTAL = 'USER_NEWS_PORTAL';

/**
 * Define needed action
 *
 */
export const getNewsSearch = createAsyncThunk('userNewsPortal/getNewsSearch', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

export const getLatestNews = createAsyncThunk('userNewsPortal/getLatestNews', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

export const getPopularTopic = createAsyncThunk('userNewsPortal/getPopularTopic', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

export const getOtherNews = createAsyncThunk('userNewsPortal/getOtherNews', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

export const getTweets = createAsyncThunk('cms/getTweets', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

const userNewsPortal = createSlice({
  name: USER_NEWS_PORTAL,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /***
     * Get news search
     *
     */
    builder.addCase(getNewsSearch.pending, (state, action) => {
      state.newsSearch.loading = true;
    });
    builder.addCase(getNewsSearch.fulfilled, (state, action) => {
      state.newsSearch.loading = false;
      state.newsSearch.records = [];
    });
    builder.addCase(getNewsSearch.rejected, (state) => {
      state.newsSearch.loading = false;
      state.newsSearch.error = true;
    });

    /***
     * Get Latest News
     *
     */
    builder.addCase(getLatestNews.pending, (state, action) => {
      state.latestNews.loading = true;
    });
    builder.addCase(getLatestNews.fulfilled, (state, action) => {
      state.latestNews.loading = false;
      state.latestNews.records = action.payload || [];
    });
    builder.addCase(getLatestNews.rejected, (state) => {
      state.latestNews.loading = false;
    });

    /***
     * Get Popular Topic
     *
     */
    builder.addCase(getPopularTopic.pending, (state, action) => {
      state.popularTopic.loading = true;
    });
    builder.addCase(getPopularTopic.fulfilled, (state, action) => {
      state.popularTopic.loading = false;
      state.popularTopic.records = action.payload || [];
    });
    builder.addCase(getPopularTopic.rejected, (state) => {
      state.popularTopic.loading = false;
    });

    /***
     * Get Other News
     *
     */
    builder.addCase(getOtherNews.pending, (state, action) => {
      state.otherNews.loading = true;
    });
    builder.addCase(getOtherNews.fulfilled, (state, action) => {
      state.otherNews.loading = false;
      state.otherNews.records = action.payload || [];
    });
    builder.addCase(getOtherNews.rejected, (state) => {
      state.otherNews.loading = false;
    });

    /**
     * Get Tweets
     *
     */
    builder.addCase(getTweets.pending, (state, action) => {
      state.tweet.loading = true;
    });
    builder.addCase(getTweets.fulfilled, (state, action) => {
      state.tweet.loading = false;
      state.tweet.records = action.payload || [];
    });
    builder.addCase(getTweets.rejected, (state) => {
      state.tweet.loading = false;
    });
  },
});

/**
 * Map necessary state
 */
export const newsSearchSelector = (state) => state.userPortalBerita?.newsSearch;
export const latestNewsSelector = (state) => state.userPortalBerita?.latestNews;
export const popularTopicSelector = (state) => state.userPortalBerita?.popularTopic;
export const otherNewsSelector = (state) => state.userPortalBerita?.otherNews;
export const tweetSelector = (state) => state.userPortalBerita?.tweet;

export default userNewsPortal.reducer;
