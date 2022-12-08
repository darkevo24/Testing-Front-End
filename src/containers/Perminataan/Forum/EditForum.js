import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'components/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Input from 'components/Input';
import { DatePicker, FileInput } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, DROPDOWN_LIST } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { perminataanDatasetSelector, perminataanForumErrorSelector, putPerminataanData, updateResult } from '../reducer';
import { getInstansiData, instansiDataSelector } from 'containers/App/reducer';
import isEmpty from 'lodash/isEmpty';
import { usePrevious } from 'utils/hooks';
import moment from 'moment';
import { post } from 'utils/request';
import { apiUrls } from 'utils/constants';
import { SingleSelectDropdown } from 'components/DropDown/SingleSelectDropDown';

export const EditForum = ({ onClose, data, initialCall }) => {
  const dispatch = useDispatch();
  const { newRecord, records, loading } = useSelector(perminataanDatasetSelector);
  const instansiDetail = useSelector(instansiDataSelector);
  const apiError = useSelector(perminataanForumErrorSelector);
  const [fileErr, setFileErr] = useState(false);
  const [file, setFile] = useState('');
  const [notPDF, setNotPDF] = useState(false);
  const prevRecord = usePrevious(newRecord) || {};
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      deskripsi: data.deskripsi,
      tujuanPermintaan: data.tujuanPermintaan,
      tanggalTarget: new Date(data.tanggalTarget),
      tipeDataText: data?.tipeData,
      tipeData: { value: data?.jenisData || '', label: data?.jenisData || '' },
      instansiSumber: { value: data?.instansi?.id || '', label: data?.instansi?.nama || '' },
      officialMemo: {
        location: data?.officialMemo?.location || '',
        fileName: data?.officialMemo?.fileName || '',
      },
    },
  });

  const value = watch();

  useEffect(() => {
    if (!instansiDetail?.result?.length) dispatch(getInstansiData());
    if (data?.officialMemo?.fileName) {
      setFile(data?.officialMemo?.fileName);
    } else {
      setFile('');
    }
  }, []);

  useEffect(() => {
    const index = records.findIndex((item) => item.id === newRecord?.id);
    if (index !== -1 || isEmpty(newRecord)) return;
    dispatch(updateResult([...records, newRecord]));
    if (isEmpty(prevRecord) && !isEmpty(newRecord)) {
      onClose();
    }
  }, [newRecord]);

  const uploadMemo = async (fileData) => {
    const fileFormData = new FormData();
    fileFormData.append('file', fileData);
    //check if file is pdf
    if (fileData.type === 'application/pdf') {
      try {
        const res = await post(apiUrls.publicFileUpload, fileFormData, { headers: { 'Content-Type': '' } });
        setValue('officialMemo', res.data, { shouldValidate: true });
        setFileErr(true);
        setNotPDF(false);
        setFile(fileData.name);
      } catch (error) {}
    } else {
      setNotPDF(true);
    }
  };

  const onSubmit = (detail) => {
    if (loading) return;
    dispatch(
      putPerminataanData({
        id: data.id,
        deskripsi: detail.deskripsi,
        tujuanPermintaan: detail.tujuanPermintaan,
        tanggalTarget: moment(detail.tanggalTarget).format('YYYY-MM-DD'),
        instansi: {
          id: detail?.instansiSumber.value,
        },
        jenisData: detail?.tipeData?.value !== 'Lainnya' ? detail?.tipeData.value : detail.tipeDataText,
        officialMemo: detail.officialMemo,
      }),
    ).then((e) => {
      if (e?.error?.message) return;
      initialCall();
      onClose();
    });
  };

  return (
    <Modal size="lg" visible={true} onClose={onClose} title="Ubah Permintaan Data">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 px-24">
          <Input
            group
            label="Data yang diminta"
            name="deskripsi"
            control={control}
            rules={{ required: true }}
            error={errors?.deskripsi ? 'Data yang diminta is required' : ''}
            labelClass="sdp-form-label py-8 mb-0 fw-normal"
          />
          <Input
            group
            label="Tujuan Permintaan Data"
            name="tujuanPermintaan"
            control={control}
            rules={{ required: true }}
            error={errors?.tujuanPermintaan ? 'Tujuan Permintaan Data is required' : ''}
            labelClass="sdp-form-label py-8 mb-0 fw-normal"
          />
          <Form.Group as={Col} md="12" className="mb-16">
            <label className="sdp-form-label py-8">Tipe Data</label>
            <SingleSelectDropdown
              data={DROPDOWN_LIST.map((item) => ({ value: item, label: item }))}
              placeholder=""
              control={control}
              className="sdp-form-label "
              error={errors?.tipeData?.message ? 'Tipe Data is required' : ''}
              name="tipeData"
            />
          </Form.Group>
          {value.tipeData?.value === 'Lainnya' && (
            <Input
              group
              label="Add New Tipe Data"
              name="tipeDataText"
              control={control}
              rules={{ required: true }}
              error={errors?.tipeDataText ? 'Tipe Data is required' : ''}
              labelClass="sdp-form-label py-8 mb-0 fw-normal"
            />
          )}
          <Form.Group as={Col} md="12" className="mb-16">
            <label className="sdp-form-label py-8">Instansi Sumber Data</label>
            <SingleSelectDropdown
              data={(instansiDetail?.result || []).map((item) => ({ value: item.id, label: item.nama }))}
              placeholder=""
              control={control}
              className="sdp-form-label "
              error={errors?.instansiSumber?.message ? 'Instansi Sumber Data is required' : ''}
              isLoading={instansiDetail?.loading || false}
              name="instansiSumber"
            />
          </Form.Group>
          <DatePicker
            group
            label="Target Waktu"
            labelClass="sdp-form-label py-8 mb-0 fw-normal"
            name="tanggalTarget"
            control={control}
            error={errors?.tanggalTarget ? 'Target Waktu is required' : ''}
            rules={{ required: true }}
          />
          <FileInput
            label="Surat Permintaan Data"
            group
            name="officialMemo"
            control={control}
            uploadInfo="Upload File (format .pdf max. 15MB)"
            handleOnChange={uploadMemo}
          />
          <div>{file !== '' ? `${file} is selected` : 'no file selected'}</div>
          {notPDF && 'File harus berformat PDF'}
          {apiError ? (
            <Form.Group as={Col} md="12" className="mb-16">
              <label className="sdp-text-red">{apiError}</label>
            </Form.Group>
          ) : null}
        </Row>
        <div className="d-flex justify-content-end px-24">
          <Button variant="light" className="border-0 mr-12 mb-12 px-62 py-12 bg-transparent sdp-text-red" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="outline-primary" className="br-40 mb-12 mr-12 px-54 py-12">
            {loading && (
              <Spinner
                variant="danger"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-10"
              />
            )}
            Simpan
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
