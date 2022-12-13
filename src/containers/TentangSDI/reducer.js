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

// https://frozen-eyrie-20956.herokuapp.com/api/ticket
export const postTentang = createAsyncThunk('tentang/postTentang', async (param) => {
  // const response = await post(apiUrls.contactUs, param);
  const response = await post(apiUrls.contactUs, param);
  return response?.data?.content;
});

export const postContactUs = createAsyncThunk('tentang/contactUs', async (param) => {
  const response = await post(apiUrls.contactUsAdmin, param);
  return response?.data?.content;
});

export const postImage = createAsyncThunk('api/image', async (param) => {
  const response = await post(apiUrls.crmImageApi, param);
  return response?.data?.content;
});

export const getStruktur = createAsyncThunk('tentang/getStruktur', async () => {
  const response = await get(apiUrls.strukturOrganisasi);
  return response?.data;
});

export const getStrukturOrganisasiById = createAsyncThunk('cms/getStrukturOrganisasiById', async (id) => {
  const response = await get(`${apiUrls.strukturOrganisasi}/${id}`);
  return response?.data?.content;
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
    loading: true,
    error: '',
    initialData: {},
  },
  detaildataSet: {
    loading: false,
    error: '',
    record: {},
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
      state.strukturData.initialData = action.payload.content?.[0];
      state.strukturData.records = action.payload.content;
    });
    builder.addCase(getStruktur.rejected, (state, action) => {
      state.strukturData.loading = false;
      state.strukturData.error = action.error.message;
    });
    builder.addCase(getStrukturOrganisasiById.pending, (state, action) => {
      state.detaildataSet.loading = true;
    });
    builder.addCase(getStrukturOrganisasiById.fulfilled, (state, action) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.record = action.payload;
    });
    builder.addCase(getStrukturOrganisasiById.rejected, (state) => {
      state.detaildataSet.loading = false;
      state.detaildataSet.error = 'Error in fetching detail struktur data!';
    });
  },
});

export const tentangPublicSelector = (state) => state.tentang;
export const detailDataSelector = (state) => state.struktur?.detaildataSet;
export const strukturPublicSelector = (state) => state.tentang?.strukturData;
export const { updateResult } = SLICE_OBJ.actions;
export default SLICE_OBJ.reducer;
