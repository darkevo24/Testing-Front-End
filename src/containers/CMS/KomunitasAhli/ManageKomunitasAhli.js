import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import * as yup from 'yup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import Modal from 'components/Modal';
import {
  CMS_KOMUNITAS_LEVEL,
  CMS_KOMUNITAS_LEVEL_DAERAH,
  CMS_KOMUNITAS_LEVEL_PUSAT,
  CMS_KOMUNITAS_PENDIDIKAN,
  Kontak_list,
} from 'utils/constants';
import { apiUrls, get, post } from 'utils/request';
import { getInstansiData, instansiDataSelector } from 'containers/App/reducer';
import { useSelector } from 'react-redux';
import { FileInput, Input } from 'components';
import { usePrevious } from '../../../utils/hooks';

const schema = yup
  .object({
    nama: yup.string().required(),
    riwayat: yup.string().required(),
    bidangKeahlian: yup.mixed().required(),
    daerah: yup.mixed().required(),
    instansi: yup.mixed().required(),
    penyelenggara: yup.mixed().required(),
    pendidikan: yup.mixed().required(),
    level: yup.mixed().required(),
  })
  .required();

const KomunitasAhli = () => {
  const [showKontakModal, setShowKontakModal] = useState(false);
  const [bidangKeahlianData, setBidangKeahlianData] = useState([]);
  const [daerahData, setDaerahData] = useState([]);
  const [foto, setFoto] = useState(null);
  const [cv, setCV] = useState(null);
  const [errorInfo, setErrorInfo] = useState({});
  const [apiError, setAPIError] = useState('');

  const instansiData = useSelector(instansiDataSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const list = [{ value: '', label: 'No data', isDisabled: true }];
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kontak1: 'No Handphone',
      kontak2: 'Email',
      riwayat: '',
      nama: '',
      headphone: '',
      email: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      daerah: null,
      instansi: null,
      penyelenggara: null,
      pendidikan: null,
      level: null,
      foto: null,
      cv: null,
    },
  });
  const values = watch();
  const prevValues = usePrevious(values);

  useEffect(() => {
    if (values?.level?.value !== prevValues?.level?.value) {
      setValue('penyelenggara', {});
    }
  }, [values]);

  useEffect(() => {
    if (!instansiData?.result?.length) dispatch(getInstansiData());
    getBidangData();
    getDaerahData();
  }, []);

  const debounceSearch = useRef(
    debounce((searchTerm = 'a') => {
      getDaerahData(searchTerm.trim());
    }, 100),
  );

  const getBidangData = async () => {
    try {
      const { data: { content: cData = [] } = {} } = await get(apiUrls.bidangData);
      setBidangKeahlianData(cData?.length ? cData : list);
    } catch (e) {}
  };

  const getDaerahData = async (q = 'a') => {
    try {
      const { data: { content: dData = [] } = {} } = await get(apiUrls.daerahData, { data: { q } });
      setDaerahData(dData?.length ? dData : list);
    } catch (e) {}
  };

  const goBack = () => {
    history.push('/cms/komunitas-ahli');
  };

  const isValidFile = (size, type, file, key, message) => {
    const clone = { ...errorInfo };
    const isValid = file?.size < size && type.includes(file?.type);
    if (!isValid) {
      setErrorInfo({
        ...errorInfo,
        [key]: message,
      });
      return false;
    }
    delete clone[key];
    setErrorInfo(clone);
    return true;
  };

  const handleFoto = (file) => {
    const isValid = isValidFile(
      524288,
      ['image/jpeg', 'image/png', 'image/jpg'],
      file,
      'foto',
      'Only PNG, JPEG e JPG with Max 512Kb',
    );
    if (isValid) setFoto(file);
  };

  const handleCV = (file) => {
    const isValid = isValidFile(2097152, ['application/pdf'], file, 'cv', 'Only PDF with Max 2MB');
    if (isValid) setCV(file);
  };

  const uplodFoto = async () => {
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', foto);
      const response = await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } });
      return response?.data || {};
    } catch (e) {
      setAPIError(e.message);
    }
  };

  const uplodCV = async () => {
    try {
      let cvFormData = new FormData();
      cvFormData.append('file', cv);
      const response = await post(apiUrls.fileUpload, cvFormData, { headers: { 'Content-Type': undefined } });
      return response?.data || {};
    } catch (e) {
      setAPIError(e.message);
    }
  };

  const onSubmit = async (data) => {
    const clone = { ...errorInfo };
    if (!foto) clone['foto'] = 'foto is required';
    if (!cv) clone['cv'] = 'cv is required';
    if (!isEmpty(clone)) {
      setErrorInfo(clone);
      return;
    }
    const fotoLink = await uplodFoto();
    const cvLink = await uplodCV();
    try {
      const response = await post(apiUrls.cmsKomunitasAhliData, {
        nama: data.nama,
        bidangKeahlian: data?.bidangKeahlian?.value || '',
        daerah: {
          id: data?.daerah?.value,
        },
        instansi: {
          id: data?.instansi?.value,
        },
        level: data?.level?.value || '',
        penyelenggara: data?.penyelenggara?.value || '',
        pendidikan: data?.pendidikan?.value || '',
        riwayat: data.riwayat,
        foto: fotoLink || {},
        cv: cvLink || {},
        kontak: [
          { title: 'No Handphone', image: '', tipe: 'handphone', value: data?.handphone || '' },
          { title: 'Email', image: '', tipe: 'email', value: data?.email || '' },
          { title: '', image: '', tipe: 'facebook', value: data?.facebook || '' },
          { title: '', image: '', tipe: 'twitter', value: data?.twitter || '' },
          { title: '', image: '', tipe: 'instagram', value: data?.instagram || '' },
          { title: '', image: '', tipe: 'youtube', value: data?.youtube || '' },
        ],
      });
      goBack();
    } catch (e) {
      setAPIError(e.message);
    }
  };

  return (
    <div className="sdp-manage-komunitas-container">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-between border-bottom-gray-stroke">
          <div className="d-flex align-items-center">
            <label className="fw-bold fs-24 lh-29 p-32">Profil Ahli Baru</label>
            <Button
              key="Batal"
              variant="outline-light"
              className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-13 px-40"
              onClick={goBack}>
              Batal
            </Button>
            <Button
              key="Simpan"
              variant="light"
              type="submit"
              className="mr-16 bg-gray sdp-text-grey-dark br-4 py-13 px-32 border-0">
              Simpan
            </Button>
            {/*<Button key="kirim" className="mr-16 bg-info sdp-text-white br-4 py-13 px-40 border-0">*/}
            {/*  kirim*/}
            {/*</Button>*/}
          </div>
          {/*<div className="sdp-left-wrapper d-flex align-items-center mr-32">*/}
          {/*  <lable className="mr-12 sdp-text-disable">Saved 1 minutes ago</lable>*/}
          {/*  <label className="sdp-text-orange-light">Draft</label>*/}
          {/*</div>*/}
        </div>
        <div className="bg-gray-lighter p-32">
          <Row className="mb-3 px-24">
            {apiError ? <label className="sdp-error mb-20">{apiError}</label> : null}
            <Input
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              label="Nama Ahli"
              labelClass="sdp-form-label fw-normal"
              control={control}
              name="nama"
              error={errors?.nama?.message ? 'Nama Ahli is required' : ''}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="bidangKeahlian"
              control={control}
              label="Bidang Keahlian"
              labelClass="sdp-form-label  fw-normal"
              data={bidangKeahlianData
                .filter((item) => item.bidangKeahlian)
                .map((item) => ({ value: item.bidangKeahlian, label: item.bidangKeahlian }))}
              placeholder=""
              rules={{ required: true }}
              error={errors?.bidangKeahlian?.message ? 'Bidang Keahlian is required' : ''}
              isCreatable={true}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="daerah"
              control={control}
              label="Daerah"
              labelClass="sdp-form-label  fw-normal"
              data={daerahData.map((item) => ({ label: item.nama, value: item.id }))}
              placeholder=""
              onInputChange={debounceSearch}
              rules={{ required: true }}
              error={errors?.daerah?.message ? 'Daerah is required' : ''}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="instansi"
              control={control}
              label="Instansi / Lembaga"
              labelClass="sdp-form-label  fw-normal"
              error={errors?.instansi?.message ? 'Instansi is required' : ''}
              data={instansiData?.result.map((item) => ({ value: item.id, label: item.nama }))}
              placeholder=""
              isLoading={instansiData?.loading}
              rules={{ required: true }}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="level"
              control={control}
              label="Level"
              labelClass="sdp-form-label  fw-normal"
              error={errors?.level?.message ? 'Level is required' : ''}
              data={CMS_KOMUNITAS_LEVEL.map((item) => ({ value: item, label: item }))}
              placeholder=""
              rules={{ required: true }}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="penyelenggara"
              control={control}
              label="Penyelenggara"
              labelClass="sdp-form-label  fw-normal"
              error={errors?.penyelenggara?.message ? 'Penyelenggara is required' : ''}
              data={(values?.level?.value === 'Pusat' ? CMS_KOMUNITAS_LEVEL_PUSAT : CMS_KOMUNITAS_LEVEL_DAERAH).map(
                (item) => ({
                  value: item,
                  label: item,
                }),
              )}
              placeholder=""
              rules={{ required: true }}
            />
            <SingleSelectDropDown
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              name="pendidikan"
              control={control}
              label="Pendidikan"
              labelClass="sdp-form-label  fw-normal"
              error={errors?.pendidikan?.message ? 'Pendidikan is required' : ''}
              data={CMS_KOMUNITAS_PENDIDIKAN.map((item) => ({ value: item, label: item }))}
              placeholder=""
              rules={{ required: true }}
            />
            <Input
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
              }}
              rows={5}
              label="Riwayat Singkat"
              labelClass="sdp-form-label fw-normal"
              control={control}
              name="riwayat"
              rules={{ required: true }}
              type="text"
              as="textarea"
              maxLength={500}
              error={errors?.riwayat?.message ? 'Riwayat Singkat is required' : ''}
            />
            <FileInput
              error={errorInfo?.foto}
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
                controlId: 'formFile',
              }}
              label="Foto Profil"
              labelClass="sdp-form-label fw-normal"
              name="foto"
              control={control}
              uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
              handleOnChange={handleFoto}
            />
            <FileInput
              error={errorInfo?.cv}
              group
              groupClass="mb-16"
              groupProps={{
                md: 8,
                as: Col,
                controlId: 'formFile',
              }}
              label="CV Upload file"
              labelClass="sdp-form-label fw-normal"
              name="cv"
              control={control}
              uploadInfo="format .pdf max 2Mb"
              handleOnChange={handleCV}
            />
            <Form.Group as={Col} className="d-flex justify-content-between mb-16" md="8">
              <Col className="sdp-table-sub-title py-16" md="4">
                Kontak
              </Col>
              {/*<Col md="4" className="d-flex justify-content-end">*/}
              {/*  <button className="sdp-text-red border-0 bg-transparent" onClick={() => setShowKontakModal(true)}>*/}
              {/*    + Kontak*/}
              {/*  </button>*/}
              {/*</Col>*/}
            </Form.Group>
            <Row md="8" className="d-flex mb-16">
              <Form.Group md="4" as={Col} className="mb-16">
                <label className="sdp-form-label py-8">Kontak 1</label>
                <Form.Control type="text" name="kontak1" readOnly value="No Handphone" />
              </Form.Group>

              <Form.Group md="4" as={Col} className="mb-16 d-flex flex-column justify-content-end pr-0">
                <div className="d-flex">
                  <Input control={control} name="handphone" type="number" wrapperClass="flex-grow-1" />
                </div>
              </Form.Group>
            </Row>
            <Row md="8" className="d-flex mb-16">
              <Form.Group md="4" as={Col} className="mb-16">
                <label className="sdp-form-label py-8">Kontak 2</label>
                <Form.Control type="text" name="kontak1" readOnly value="Email" />
              </Form.Group>

              <Form.Group md="4" as={Col} className="mb-16 d-flex flex-column justify-content-end pr-0">
                <div className="d-flex">
                  <Input control={control} name="email" type="email" wrapperClass="flex-grow-1" />
                </div>
              </Form.Group>
            </Row>
            {Kontak_list.map((kontak, index) => (
              <Form.Group as={Col} className="d-flex justify-content-between mb-16" md="8">
                <Col md="12">
                  <Input
                    label={`Kontak ${index + 3}`}
                    control={control}
                    name={kontak.name}
                    type="text"
                    wrapperClass="flex-grow-1"
                    leftIcon={kontak.icon}
                    leftIconClass="py-15 px-20"
                  />
                </Col>
              </Form.Group>
            ))}
          </Row>
        </div>
        {/*{showKontakModal && (*/}
        {/*  <Modal*/}
        {/*    Visible={showKontakModal}*/}
        {/*    onClose={() => setShowKontakModal(false)}*/}
        {/*    title="Tambah Kontak"*/}
        {/*    actions={[*/}
        {/*      { variant: 'secondary', text: 'Batal', onClick: () => setShowKontakModal(false) },*/}
        {/*      { text: 'Konfirmasi', type: 'submit' },*/}
        {/*    ]}>*/}
        {/*    <Form noValidate onSubmit={handleList}>*/}
        {/*      <Form.Group as={Col} md="8" className="mb-16">*/}
        {/*        <label className="sdp-form-label py-8">Logo Sosmed</label>*/}
        {/*        <Form.Control type="file" name="logo" rules={{ required: true }} />*/}
        {/*      </Form.Group>*/}
        {/*      <Form.Group as={Col} md="8" className="mb-16">*/}
        {/*        <label className="sdp-form-label py-8">Link Tautan</label>*/}
        {/*        <Form.Control type="text" name="link" rules={{ required: true }} />*/}
        {/*      </Form.Group>*/}
        {/*    </Form>*/}
        {/*  </Modal>*/}
        {/*)}*/}
      </Form>
    </div>
  );
};

export default KomunitasAhli;
