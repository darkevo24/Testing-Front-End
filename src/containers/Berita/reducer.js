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
  news: {
    loading: false,
    error: null,
    record: {},
  },
  latestNews: {
    loading: false,
    error: null,
    records: [],
    status: 'idel',
  },
  highlightedNews: {
    loading: false,
    error: null,
    records: [],
    status: 'idel',
  },
  popularTopic: {
    status: 'idel',
    loading: false,
    error: null,
    records: [],
  },
  otherNews: {
    status: 'idel',
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
  const response = await get(`${apiUrls.userBeritaLatest}/${param}`);
  return response?.data?.content;
});
export const gethighlightedNews = createAsyncThunk('userNewsPortal/gethighlightedNews', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});
export const getNewsDetail = createAsyncThunk('userNewsPortal/getNewsDetail', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

export const getPopularTopic = createAsyncThunk('userNewsPortal/getPopularTopic', async (param) => {
  const response = await get(`${apiUrls.userBeritaPortal}/${param}`);
  return response?.data?.content;
});

export const getOtherNews = createAsyncThunk('userNewsPortal/getOtherNews', async (param) => {
  const response = await get(`${apiUrls.userBeritaPopular}/${param}`);
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
     * Get highlighted News
     */
    builder.addCase(gethighlightedNews.pending, (state, action) => {
      state.highlightedNews.loading = true;
      state.highlightedNews.status = 'loading';
    });
    builder.addCase(gethighlightedNews.fulfilled, (state, action) => {
      state.highlightedNews.loading = false;
      state.highlightedNews.records = action.payload || [];
      state.highlightedNews.status = 'success';
    });
    builder.addCase(gethighlightedNews.rejected, (state) => {
      state.highlightedNews.loading = false;
      state.highlightedNews.error = true;
      state.highlightedNews.status = 'error';
    });

    /***
     * Get Latest News
     *
     */
    builder.addCase(getLatestNews.pending, (state, action) => {
      state.latestNews.loading = false;
      state.latestNews.status = 'loading';
    });
    builder.addCase(getLatestNews.fulfilled, (state, action) => {
      state.latestNews.loading = true;
      state.latestNews.records = action.payload || [];
      state.latestNews.status = 'success';
    });
    builder.addCase(getLatestNews.rejected, (state) => {
      state.latestNews.loading = true;
      state.latestNews.status = 'failed';
    });
    /**
     * Get News Detail
     */

    builder.addCase(getNewsDetail.pending, (state, action) => {
      state.news.loading = true;
    });
    builder.addCase(getNewsDetail.fulfilled, (state, action) => {
      state.news.loading = false;
      state.news.record = action.payload || {};
    });
    builder.addCase(getNewsDetail.rejected, (state) => {
      state.news.loading = false;
      state.news.error = true;
    });

    /***
     * Get Popular Topic
     *
     */
    builder.addCase(getPopularTopic.pending, (state, action) => {
      state.popularTopic.loading = true;
      state.popularTopic.status = 'loading';
    });
    builder.addCase(getPopularTopic.fulfilled, (state, action) => {
      state.popularTopic.loading = false;
      state.popularTopic.records = action.payload || [];
      state.popularTopic.status = 'success';
    });
    builder.addCase(getPopularTopic.rejected, (state) => {
      state.popularTopic.loading = false;
      state.popularTopic.status = 'failed';
    });

    /***
     * Get Other News
     *
     */
    builder.addCase(getOtherNews.pending, (state, action) => {
      state.otherNews.loading = true;
      state.otherNews.status = 'loading';
    });
    builder.addCase(getOtherNews.fulfilled, (state, action) => {
      state.otherNews.loading = false;
      state.otherNews.records = action.payload || [];
      state.otherNews.status = 'success';
    });
    builder.addCase(getOtherNews.rejected, (state) => {
      state.otherNews.loading = false;
      state.otherNews.status = 'failed';
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
export const highlightedNewsSelector = (state) => state.userPortalBerita?.highlightedNews;
export const newsDetailSelector = (state) => state.userPortalBerita?.news;
export const popularTopicSelector = (state) => state.userPortalBerita?.popularTopic;
export const otherNewsSelector = (state) => state.userPortalBerita?.otherNews;
export const tweetSelector = (state) => state.userPortalBerita?.tweet;

export default userNewsPortal.reducer;
