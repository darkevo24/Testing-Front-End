import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, post } from 'utils/request';

export const initialState = {
  chatSettings: {
    loading: false,
    error: '',
    record: {},
  },
  chatStatus: {
    loading: false,
    error: '',
    record: {},
  },
};

export const CHAT_REDUCER = 'CHAT_REDUCER';

export const getChatSettings = createAsyncThunk('portal/chatSettings', async () => {
  const response = await get(apiUrls.crmChatSettings);
  return response?.data;
});

export const getChatStatus = createAsyncThunk('portal/chatStatus', async (params) => {
  let email = '';

  // If params doesn't have email, get from local storage
  if (!params?.email) {
    email = localStorage.getItem('sdi_chat_email');
  }

  if (!params?.email && !email) {
    return {
      code: 'CAN_START_NEW',
    };
  } else {
    const response = await post(apiUrls.crmChatStatus, {
      email: params?.email || email,
    });
    return response?.data;
  }
});

export const createChatRequest = createAsyncThunk('portal/chatRequest', async (params) => {
  const { isLoggedIn, data } = params;
  try {
    await post(apiUrls.crmChatRequest, {
      ...data,
      isRegisteredUser: isLoggedIn,
    });

    const { email, name } = data;
    if (!isLoggedIn) {
      localStorage.setItem('sdi_chat_credentials', JSON.stringify({ email, name }));
    }
    return {
      code: 'WAITING_RESPONSE',
      email: data.email,
    };
  } catch (e) {
    alert(`Error: ${e?.data?.message}`);
    if (e?.data?.message === 'You have ongoing chat. We will refresh the page to continue the chat.') {
      const { email, name } = data;
      if (!isLoggedIn) {
        localStorage.setItem('sdi_chat_credentials', JSON.stringify({ email, name }));
      }
      window.location.reload();
    }
    return null;
  }
});

export const createChatHistory = createAsyncThunk('portal/chatHistory', async (params) => {
  const { chatLogsId, message } = params;
  const response = await post(apiUrls.crmChatHistory, {
    chatLogsId,
    message,
    isSentByUser: true,
    isSentByAdmin: false,
  });
  return response?.data;
});

export const createChatReview = createAsyncThunk('portal/chatReview', async (params) => {
  const { chatLogId, email, rating, description } = params;
  const response = await post(apiUrls.crmChatReview, {
    chatLogId,
    email,
    rating,
    description,
  });
  return response?.data;
});

const chatSlice = createSlice({
  name: CHAT_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChatSettings.pending, (state) => {
      state.chatSettings.loading = true;
    });
    builder.addCase(getChatSettings.fulfilled, (state, action) => {
      state.chatSettings.loading = false;
      state.chatSettings.record = action.payload;
    });
    builder.addCase(getChatSettings.rejected, (state) => {
      state.chatSettings.loading = false;
      state.chatSettings.error = 'Error getting chat settings!';
    });
    builder.addCase(getChatStatus.pending, (state) => {
      state.chatStatus.loading = true;
    });
    builder.addCase(getChatStatus.fulfilled, (state, action) => {
      state.chatStatus.loading = false;
      state.chatStatus.record = action.payload;
    });
    builder.addCase(getChatStatus.rejected, (state) => {
      state.chatStatus.loading = false;
      state.chatStatus.error = 'Error getting chat status!';
    });
    builder.addCase(createChatRequest.pending, (state) => {
      state.chatStatus.loading = true;
    });
    builder.addCase(createChatRequest.fulfilled, (state, action) => {
      state.chatStatus.loading = false;
      state.chatStatus.record = action.payload;
    });
    builder.addCase(createChatRequest.rejected, (state) => {
      state.chatStatus.loading = false;
      state.chatStatus.error = 'Error request chat!';
    });
  },
});

export const chatSettingsSelector = (state) => state.chat?.chatSettings;
export const chatStatusSelector = (state) => state.chat?.chatStatus;

export default chatSlice.reducer;
