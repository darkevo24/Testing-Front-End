import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, post } from 'utils/request';

export const initialState = {
  ticket: {
    loading: false,
    error: '',
    record: {},
  },
};

export const CHAT_REDUCER = 'CHAT_REDUCER';

export const getTicket = createAsyncThunk('review-ticket/detail', async (params) => {
  console.log({ params });
  const response = await get(`${apiUrls.crmTicketDetail}/${params.id}`);
  return response?.data;
});

export const postTicketReview = createAsyncThunk('review-ticket/post', async (param) => {
  const response = await post(apiUrls.crmTicketReview, param);
  return response?.data?.content;
});

const chatSlice = createSlice({
  name: CHAT_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicket.pending, (state) => {
      state.chatSettings.loading = true;
    });
    builder.addCase(getTicket.fulfilled, (state, action) => {
      state.chatSettings.loading = false;
      state.chatSettings.record = action.payload;
    });
    builder.addCase(getTicket.rejected, (state) => {
      state.chatSettings.loading = false;
      state.chatSettings.error = 'Error getting chat settings!';
    });
  },
});

export const chatSettingsSelector = (state) => state.chat?.chatSettings;
export const chatStatusSelector = (state) => state.chat?.chatStatus;

export default chatSlice.reducer;
