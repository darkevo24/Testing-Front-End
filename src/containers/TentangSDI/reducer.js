import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get, post } from 'utils/request';

export const getTentang = createAsyncThunk('tentang/getTentang', async () => {
  const response = await get(apiUrls.aboutUs, {});
  return response?.data?.content[0];
});

// export const postTentang = createAsyncThunk('tentang/postTentang', async (param) => {
//   const response = await post(apiUrls.hubungiKami, param);
//   return response?.data?.content;
// });

export const postTentang = createAsyncThunk('tentang/postTentang', async (param) => {
  const response = await post('https://frozen-eyrie-20956.herokuapp.com/api/ticket', param);
  return response?.data?.content;
});

export const getStruktur = createAsyncThunk('tentang/getStruktur', async () => {
  const response = await get(apiUrls.strukturDataPublic, {});
  return response?.data;
});

const REDUCER_NAME = 'tentang';

const INITIAL_STATE = {
  status: 'idle',
  tentang_list: [],
  dataset: null,
  loading: false,
  error: '',
  postTentang: {
    records: [],
    loading: false,
    error: '',
  },
  strukturData: {
    records: [],
    loading: false,
    error: '',
  },
};

const SLICE_OBJ = createSlice({
  name: REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    updateResult: (state, action) => {
      state.dataset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTentang.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTentang.fulfilled, (state, action) => {
      state.loading = false;
      state.dataset = action.payload;
    });
    builder.addCase(getTentang.rejected, (state, action) => {
      state.loading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
    builder.addCase(postTentang.pending, (state) => {
      state.postTentang.loading = true;
    });
    builder.addCase(postTentang.fulfilled, (state, action) => {
      state.postTentang.loading = false;
      state.postTentang.records = action.payload || [];
    });
    builder.addCase(postTentang.rejected, (state, action) => {
      state.postTentang.loading = false;
    });

    builder.addCase(getStruktur.pending, (state, action) => {
      state.strukturData.loading = true;
    });
    builder.addCase(getStruktur.fulfilled, (state, action) => {
      state.strukturData.loading = false;
      state.strukturData.records = action.payload;
    });
    builder.addCase(getStruktur.rejected, (state, action) => {
      state.strukturData.loading = false;
      state.strukturData.error = action.error.message;
    });
  },
});

export const tentangPublicSelector = (state) => state.tentang;
export const strukturPublicSelector = (state) => state.tentang?.strukturData;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
