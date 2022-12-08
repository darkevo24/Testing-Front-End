import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrls, get } from 'utils/request';

export const initialState = {
  loading: false,
  dataset: {
    records: [],
  },
  data: {
    records: [
      {
        id: '',
        label: 'Hubungi Kami',
        value: '',
      },
      {
        id: '',
        label: 'Permintaan Bimtek',
        value: '',
      },
      {
        id: '',
        label: 'Permintaan Data',
        value: '',
      },
    ],
    loading: false,
  },
  error: null,
};
export const getEmailData = createAsyncThunk('cms/getEmailData', async () => {
  const response = await get(`${apiUrls.cmsKonfigurasiEmail}/list`);
  return response?.data?.content;
});
export const getCMSLogAktifitasEmailData = createAsyncThunk('cms/getLogAktifitasEmail', async () => {
  const response = await get(`${apiUrls.cmsAuditTrialData}/list?feature=Configuration-Email`);
  return response?.data?.content;
});

export const CMS_LOG_AKTIFITAS_EMAIL_SLICE = 'CMS_LOG_AKTIFITAS_EMAIL_SLICE';

const cmsLogAktifitasEmailSlice = createSlice({
  name: CMS_LOG_AKTIFITAS_EMAIL_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmailData.pending, (state, action) => {
      state.data.loading = true;
      state.data.status = 'idel';
    });
    builder.addCase(getEmailData.fulfilled, (state, action) => {
      state.data.loading = false;
      let newRecords = [];
      initialState.data.records.forEach((record) => {
        action.payload.forEach((item) => {
          if (record.label === item.type) {
            if (item.email !== '') {
              record = { ...record, value: item.email, id: item.id };
              newRecords.push(record);
            }
          }
        });
        if (record.value === '') newRecords.push(record);
      });
      state.data.records = newRecords;
    });
    builder.addCase(getEmailData.rejected, (state, action) => {
      state.data.loading = false;
      state.data.error = action.error.message;
      state.data.status = 'error';
    });
    builder.addCase(getCMSLogAktifitasEmailData.pending, (state, action) => {
      state.dataset.loading = true;
      state.dataset.status = 'idel';
    });
    builder.addCase(getCMSLogAktifitasEmailData.fulfilled, (state, action) => {
      state.dataset.loading = false;
      state.dataset.records = action.payload.records;
    });
    builder.addCase(getCMSLogAktifitasEmailData.rejected, (state, action) => {
      state.dataset.loading = false;
      state.dataset.error = action.error.message;
      state.dataset.status = 'error';
    });
  },
});

export const cmsEmailDataSelector = (state) => state.cmsKonfigurasiLogEmail?.data;
export const cmsLogAktifitasDataSelector = (state) => state.cmsKonfigurasiLogEmail?.dataset;
export default cmsLogAktifitasEmailSlice.reducer;
