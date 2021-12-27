import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, defaultNumberOfRows, get, post, put, deleteRequest } from 'utils/request';

export const initialState = {
  dataset: {
    loading: false,
    error: null,
    page: 0,
    status: '',
    records: [],
    size: defaultNumberOfRows,
    totalPages: null,
    totalRecords: null,
  },
  detail: {
    loading: false,
    records: [],
  },
  list: {
    loading: false,
    records: [],
  },
  postDokumentasi: {
    loading: false,
    records: [],
  },
  deleteDokumentasi: {
    loading: false,
    records: [],
  },
  logs: {
    loading: false,
    error: null,
    logAktifitas: [],
  },
  status: {
    loading: false,
    error: null,
    status: null,
  },
};

export const BIMTEK_DOKUMENTASI = 'BIMTEK_DOKUMENTASI';

export const getDokumentasi = createAsyncThunk('bimtek-dokumentasi/getListBimtekDokumentasi', async (params) => {
  const response = await get(apiUrls.cmsBimtekDokumentasi, {
    query: { page: params.page + 1, size: 10, namaBimtek: params.namaBimtek },
  });
  return response;
});

export const getDokumentasiDetail = createAsyncThunk('bimtek-dokumentasi/getListBimtekDokumentasiDetail', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekDokumentasi}/${params}`);
  return response;
});

export const getJadwalBimtekList = createAsyncThunk('bimtek-dokumentasi/getListDokumentasi', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekJadwal}/select-list`);
  return response;
});

export const getListLogAktifitas = createAsyncThunk('bimtek-dokumentasi/getListLogs', async (params) => {
  const response = await get(`${apiUrls.cmsBimtekLogs}/${params}`);
  return response?.data?.content?.records;
});

export const postImageDokumentasi = createAsyncThunk('bimtek-dokumentasi/posImageDokumentasi', async (params) => {
  const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi`, {
    dokumentasi: [
      {
        isiDokumentasi: params.isiDokumentasi,
        urlVidio: params.urlVidio,
        images: params.images,
      },
    ],
  });
  return response;
});

export const updateDokumentasiDetail = createAsyncThunk('bimtek-dokumentasi/postUpdateDokumentasiDetail', async (params) => {
  const response = await put(`${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}`, {
    isiDokumentasi: params.isiDokumentasi,
    urlVidio: params.urlVidio,
  });
  return response;
});

export const deleteDokumentasiDetail = createAsyncThunk(
  'bimtek-dokumentasi/deleteBimtekDokumentasiDetail',
  async (params) => {
    const response = await deleteRequest(`${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}`);
    return response;
  },
);

export const postImageDokumentasiDetail = createAsyncThunk(
  'bimtek-dokumentasi/postImageDokumentasiDetail',
  async (params) => {
    const response = await post(`${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}/images`, {
      images: params.images,
    });
    return response;
  },
);

export const postStatusDraft = createAsyncThunk('/bimtek-dokumentasi/changeStatusDraft', async (params) => {
  const response = await post(
    `${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}/ubah-status/WAITING_APPROVAL`,
    { catatan: 'Ubah ke waiting Approval' },
  );
  return response;
});

export const postStatusWaitingApproval = createAsyncThunk(
  '/bimtek-dokumentasi/changeStatusWaitingApproval',
  async (params) => {
    const response = await post(
      `${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}/ubah-status/APPROVED`,
      { catatan: 'Ubah ke Approved' },
    );
    return response;
  },
);

export const postStatusApproved = createAsyncThunk('/bimtek-dokumentasi/changeStatusApproved', async (params) => {
  const response = await post(
    `${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}/ubah-status/PUBLISHED`,
    { catatan: 'Ubah ke Publish' },
  );
  return response;
});

export const postStatusPublish = createAsyncThunk('/bimtek-dokumentasi/changeStatusPublish', async (params) => {
  const response = await post(
    `${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}/ubah-status/UNPUBLISHED`,
    { catatan: 'Ubah ke Unpublish' },
  );
  return response;
});

export const postStatusRejected = createAsyncThunk('/bimtek-dokumentasi/changeStatusPublish', async (params) => {
  const response = await post(
    `${apiUrls.cmsBimtekJadwal}/${params.id}/dokumentasi/${params.idDokumentasi}/ubah-status/REJECTED`,
    { catatan: 'Ubah ke Rejected' },
  );
  return response;
});

const BimtekDokumentasiSlice = createSlice({
  name: BIMTEK_DOKUMENTASI,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDokumentasi.pending, (state, action) => {
      state.dataset.loading = true;
    });
    builder.addCase(getDokumentasi.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.data.content.records;
      state.dataset.page = action.payload.data.content.page - 1;
      state.dataset.totalPages = action.payload.data.content.totalPages;
      state.dataset.totalRecords = action.payload.data.content.totalRecords;
    });
    builder.addCase(getDokumentasi.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = 'Invalid data';
    });
    builder.addCase(getDokumentasiDetail.pending, (state, action) => {
      state.detail.loading = true;
    });
    builder.addCase(getDokumentasiDetail.fulfilled, (state, action) => {
      state.detail.loading = false;
      state.detail.records = action.payload.data.content;
    });
    builder.addCase(getDokumentasiDetail.rejected, (state, action) => {
      state.detail.loading = false;
      state.detail.error = 'Invalid data';
    });
    builder.addCase(getListLogAktifitas.pending, (state, action) => {
      state.logs.loading = true;
    });
    builder.addCase(getListLogAktifitas.fulfilled, (state, action) => {
      state.logs.loading = false;
      state.logs.logAktifitas = action.payload;
    });
    builder.addCase(getListLogAktifitas.rejected, (state, action) => {
      state.logs.loading = false;
      state.logs.error = 'Invalid data';
    });
    builder.addCase(getJadwalBimtekList.pending, (state, action) => {
      state.list.loading = true;
    });
    builder.addCase(getJadwalBimtekList.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.records = action.payload.data.content.records;
    });
    builder.addCase(getJadwalBimtekList.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = 'Invalid data';
    });
    builder.addCase(postImageDokumentasi.pending, (state, action) => {
      state.postDokumentasi.loading = true;
    });
    builder.addCase(postImageDokumentasi.fulfilled, (state, action) => {
      state.postDokumentasi.loading = false;
      state.postDokumentasi.records = action.payload;
    });
    builder.addCase(postImageDokumentasi.rejected, (state, action) => {
      state.postDokumentasi.loading = false;
      state.postDokumentasi.error = 'Invalid data';
    });
    builder.addCase(postImageDokumentasiDetail.pending, (state, action) => {
      state.postDokumentasi.loading = true;
    });
    builder.addCase(postImageDokumentasiDetail.fulfilled, (state, action) => {
      state.postDokumentasi.loading = false;
      state.postDokumentasi.records = action.payload;
    });
    builder.addCase(postImageDokumentasiDetail.rejected, (state, action) => {
      state.postDokumentasi.loading = false;
      state.postDokumentasi.error = 'Invalid data';
    });
    builder.addCase(updateDokumentasiDetail.pending, (state, action) => {
      state.postDokumentasi.loading = true;
    });
    builder.addCase(updateDokumentasiDetail.fulfilled, (state, action) => {
      state.postDokumentasi.loading = false;
      state.postDokumentasi.records = action.payload;
    });
    builder.addCase(updateDokumentasiDetail.rejected, (state, action) => {
      state.postDokumentasi.loading = false;
      state.postDokumentasi.error = 'Invalid data';
    });
    builder.addCase(deleteDokumentasiDetail.pending, (state, action) => {
      state.deleteDokumentasi.loading = true;
    });
    builder.addCase(deleteDokumentasiDetail.fulfilled, (state, action) => {
      state.deleteDokumentasi.loading = false;
      state.deleteDokumentasi.records = action.payload;
    });
    builder.addCase(deleteDokumentasiDetail.rejected, (state, action) => {
      state.deleteDokumentasi.loading = false;
      state.deleteDokumentasi.error = 'Invalid data';
    });
    builder.addCase(postStatusDraft.pending, (state, action) => {
      state.status.loading = true;
    });
    builder.addCase(postStatusDraft.fulfilled, (state, action) => {
      state.status.loading = false;
      state.status.status = action.payload;
    });
    builder.addCase(postStatusDraft.rejected, (state, action) => {
      state.status.loading = false;
      state.status.error = 'Invalid data';
    });
    builder.addCase(postStatusWaitingApproval.pending, (state, action) => {
      state.status.loading = true;
    });
    builder.addCase(postStatusWaitingApproval.fulfilled, (state, action) => {
      state.status.loading = false;
      state.status.status = action.payload;
    });
    builder.addCase(postStatusWaitingApproval.rejected, (state, action) => {
      state.status.loading = false;
      state.status.error = 'Invalid data';
    });
    builder.addCase(postStatusApproved.pending, (state, action) => {
      state.status.loading = true;
    });
    builder.addCase(postStatusApproved.fulfilled, (state, action) => {
      state.status.loading = false;
      state.status.status = action.payload;
    });
    builder.addCase(postStatusApproved.rejected, (state, action) => {
      state.status.loading = false;
      state.status.error = 'Invalid data';
    });
    builder.addCase(postStatusPublish.pending, (state, action) => {
      state.status.loading = true;
    });
    builder.addCase(postStatusPublish.fulfilled, (state, action) => {
      state.status.loading = false;
      state.status.status = action.payload;
    });
    builder.addCase(postStatusPublish.rejected, (state, action) => {
      state.status.loading = false;
      state.status.error = 'Invalid data';
    });
  },
});

export const bimtekDokumentasiSelector = (state) => state.cmsBimtekDokumentasi.dataset;
export const bimtekDokumentasiDetailSelector = (state) => state.cmsBimtekDokumentasi.detail;
export const bimtekListSelector = (state) => state.cmsBimtekDokumentasi.list;
export const bimtekLogAktifitas = (state) => state.cmsBimtekDokumentasi.logs;

export default BimtekDokumentasiSlice.reducer;
