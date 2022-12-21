import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, post } from 'utils/request';

export const initialState = {
  ticket: {
    loading: false,
    error: '',
    record: {},
  },
};

export const REVIEW_TICKET_REDUCER = 'REVIEW_TICKET_REDUCER';

export const getTicket = createAsyncThunk('review-ticket/detail', async (params) => {
  const response = await get(`${apiUrls.crmTicketDetail}/${params.id}`);
  return response?.data;
});

export const postTicketReview = createAsyncThunk('review-ticket/post', async (param) => {
  const response = await post(apiUrls.crmTicketReview, param);
  return response?.data?.content;
});

const reviewTicketSlice = createSlice({
  name: REVIEW_TICKET_REDUCER,
  initialState,
  reducers: {},
});

export default reviewTicketSlice.reducer;
