import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AboutUs } from 'services/CMS';

export const getAboutUs = createAsyncThunk('cms/aboutUs/getDetail', async (id) => {
  return AboutUs.getTentang(id);
});

export const getAboutUsLogs = createAsyncThunk('cms/aboutUs/getDetailLogs', async (id) => {
  return AboutUs.getTentangLogs(id);
});

const REDUCER_NAME = 'ABOUT_US_DETAIL_REDUCER';

const INITIAL_STATE = {
  canEdit: false,
  title: '',
  content: '',
  video_url: '',
  current_data_status: '',
  status: 'idle',
  logs: {
    status: 'idle',
    records: [],
  },
  message: '',
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAboutUs.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAboutUs.fulfilled, (state, action) => {
      state.status = 'idle';
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.video_url = action.payload.video_url;
      state.current_data_status = action.payload.status;
    });
    builder.addCase(getAboutUs.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.payload.message;
    });
    builder.addCase(getAboutUsLogs.pending, (state, action) => {
      state.logs.status = 'loading';
    });
    builder.addCase(getAboutUsLogs.fulfilled, (state, action) => {
      state.logs.status = 'idle';
      state.logs.records = action.payload;
    });
    builder.addCase(getAboutUsLogs.rejected, (state, action) => {
      state.logs.status = 'error';
    });
  },
});

export default SLICE_OBJ.reducer;
