import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AboutUs } from 'services/CMS';

export const getAboutUs = createAsyncThunk('cms/aboutUs/getDetail', async (id) => {
  return AboutUs.getTentang(id);
});

export const getAboutUsLogs = createAsyncThunk('cms/aboutUs/getDetailLogs', async (id) => {
  return AboutUs.getTentangLogs(id);
});

export const doAboutUs = createAsyncThunk('cms/aboutUs/doAboutUs', async ({ id, action }) => {
  return AboutUs.doTentangWorkflow(id, action);
});

export const updateAboutUs = createAsyncThunk('cms/aboutUs/updateAboutUs', async ({ id, title, content, video_url }) => {
  return AboutUs.updateTentang(id, title, escape(content), video_url);
});

const REDUCER_NAME = 'cms/aboutUs';

const INITIAL_STATE = {
  canEdit: false,
  id: null,
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
  reducers: {
    setTitle(state, action) {
      state.new_title = action.payload;
    },
    setVideoUrl(state, action) {
      state.new_video_url = action.payload;
    },
    setContent(state, action) {
      state.new_content = action.payload;
    },
    setEditable(state, action) {
      state.canEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAboutUs.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getAboutUs.fulfilled, (state, action) => {
      state.status = 'idle';
      state.title = action.payload.title;
      try {
        state.content = unescape(action.payload.content);
      } catch (err) {
        state.content = action.payload.content;
      }
      state.video_url = action.payload.video_url;
      state.current_data_status = action.payload.status;
      state.id = action.payload.id;
      state.canEdit = false;
    });
    builder.addCase(getAboutUs.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.error.message;
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
    builder.addCase(doAboutUs.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(doAboutUs.fulfilled, (state, action) => {
      state.status = 'idle';
      alert(action.payload.message);
    });
    builder.addCase(doAboutUs.rejected, (state, action) => {
      state.status = 'error';
      alert(action.error.message);
      state.message = action.error.message;
    });

    builder.addCase(updateAboutUs.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(updateAboutUs.fulfilled, (state, action) => {
      state.status = 'idle';
      alert(action.payload.message);
    });
    builder.addCase(updateAboutUs.rejected, (state, action) => {
      state.status = 'error';
      alert(action.error.message);
      state.message = action.error.message;
    });
  },
});

export const { setTitle, setContent, setVideoUrl, setEditable } = SLICE_OBJ.actions;

export default SLICE_OBJ.reducer;
