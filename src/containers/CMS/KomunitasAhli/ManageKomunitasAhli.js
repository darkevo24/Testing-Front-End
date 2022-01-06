import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
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
import Modal from 'components/Modal';
import {
  CMS_KOMUNITAS_LEVEL,
  CMS_KOMUNITAS_LEVEL_DAERAH,
  CMS_KOMUNITAS_LEVEL_PUSAT,
  CMS_KOMUNITAS_PENDIDIKAN,
  Kontak_list,
} from 'utils/constants';
import { apiUrls, get, post, put } from 'utils/request';
import { getInstansiData, instansiDataSelector } from 'containers/App/reducer';
import { useSelector } from 'react-redux';
import { FileInput, Input } from 'components';
import { usePrevious } from 'utils/hooks';
import Spinner from 'react-bootstrap/Spinner';
import { cmsKomunitasAhliDetailDatasetSelector, getCMSKomunitasAhliDataById } from './reducer';
import { getValue } from './KomunitasAhliDetail';

const schema = yup.object({
  nama: yup.string().required('Nama is required'),
  riwayat: yup.string().required('Riwayat is required'),
  bidangKeahlian: yup.mixed().required('Bidang Keahlian is required'),
  daerah: yup.mixed().required('Daerah is required'),
  instansi: yup.mixed().required('Instansi is required'),
  penyelenggara: yup.mixed().required('Penyelenggara is required'),
  pendidikan: yup.mixed().required('Pendidikan is required'),
  level: yup.mixed().required('Level is required'),
  email: yup.string().email('Must be a valid email'),
});

const KomunitasAhli = () => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fotoUpload, setFotoUpload] = useState(false);
  const [cvUpload, setCVUpload] = useState(false);
  const [formData, setFormData] = useState({});
  const [bidangKeahlianData, setBidangKeahlianData] = useState([]);
  const [daerahData, setDaerahData] = useState([]);
  const [foto, setFoto] = useState(null);
  const [cv, setCV] = useState(null);
  const [errorInfo, setErrorInfo] = useState({});
  const [apiError, setAPIError] = useState('');
  const { id } = useParams();
  const instansiData = useSelector(instansiDataSelector);
  const { record, error } = useSelector(cmsKomunitasAhliDetailDatasetSelector);

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
      bidangKeahlian: null,
    },
  });
  const values = watch();
  const prevValues = usePrevious(values);

  useEffect(() => {
    let inputBox = document.getElementById('inputBox');

    let invalidChars = ['-', '+', 'e'];

    inputBox.addEventListener('input', () => {
      this.value = this.value.replace(/[e]/gi, '');
    });

    inputBox.addEventListener('keydown', (e) => {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    });
  }, []);

  useEffect(() => {
    if (!id) return;
    if (record.id !== +id) dispatch(getCMSKomunitasAhliDataById(id));
    else {
      setDefaultData();
    }
  }, [id]);

  useEffect(() => {
    if (record.id !== +id) return;
    setDefaultData();
  }, [record]);

  const setDefaultData = () => {
    const fields = [
      { name: 'riwayat', value: record?.riwayat || '' },
      { name: 'nama', value: record?.nama || '' },
      { name: 'handphone', value: getValue(record, 'handphone') },
      { name: 'email', value: getValue(record, 'email') },
      { name: 'facebook', value: getValue(record, 'facebook') },
      { name: 'twitter', value: getValue(record, 'twitter') },
      { name: 'instagram', value: getValue(record, 'instagram') },
      { name: 'youtube', value: getValue(record, 'youtube') },
      { name: 'bidangKeahlian', value: { value: record?.bidangKeahlian, label: record?.bidangKeahlian } },
      { name: 'daerah', value: { value: record?.daerah?.id, label: record?.daerah?.nama } },
      { name: 'instansi', value: { value: record?.instansi?.id, label: record?.instansi?.nama } },
      { name: 'penyelenggara', value: { value: record?.penyelenggara, label: record?.penyelenggara } },
      { name: 'pendidikan', value: { value: record?.pendidikan, label: record?.pendidikan } },
      { name: 'level', value: { value: record?.level, label: record?.level } },
    ];
    fields.forEach(({ name, value }) => setValue(name, value));
  };

  useEffect(() => {
    if (prevValues?.level?.value && values?.level?.value !== prevValues?.level?.value) {
      setValue('penyelenggara', null);
    }
  }, [values]);

  useEffect(() => {
    if (!id) {
      setFotoUpload(true);
      setCVUpload(true);
    }
    if (!instansiData?.result?.length) dispatch(getInstansiData());
    getBidangData();
    getDaerahData();
  }, []);

  const debounceSearch = useRef(
    debounce((searchTerm = 'a') => {
      getDaerahData(searchTerm);
    }, 300),
  );

  const getBidangData = async () => {
    try {
      const { data: { content: cData = [] } = {} } = await get(apiUrls.bidangData);
      setBidangKeahlianData(cData?.length ? cData : list);
    } catch (e) {}
  };

  const getDaerahData = async (q = 'a') => {
    try {
      const { data: { content: dData = [] } = {} } = await get(apiUrls.daerahData, { query: { q } });
      setDaerahData(dData?.length ? dData : list);
    } catch (e) {}
  };

  const goBack = () => {
    if (id) history.push(`/cms/komunitas-ahli-detail/${+id}`);
    else history.push('/cms/komunitas-ahli');
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
      setErrorInfo({ ...errorInfo, all: (errorInfo?.all || '') + ' Foto upload: ' + e.message });
      setLoader(false);
    }
  };

  const uplodCV = async () => {
    try {
      let cvFormData = new FormData();
      cvFormData.append('file', cv);
      const response = await post(apiUrls.fileUpload, cvFormData, { headers: { 'Content-Type': undefined } });
      return response?.data || {};
    } catch (e) {
      setErrorInfo({ ...errorInfo, all: (errorInfo?.all || '') + ' CV upload: ' + e.message });
      setLoader(false);
    }
  };

  const handleDataSubmit = (data) => {
    const clone = { ...errorInfo };
    if ((!id && !foto) || (id && !record?.foto?.size && !foto)) clone['foto'] = 'foto is required';
    if ((!id && !cv) || (id && !record?.cv?.size && !cv)) clone['cv'] = 'cv is required';
    if (!isEmpty(clone)) {
      setErrorInfo(clone);
      return;
    }
    setShowModal(true);
    setFormData(data);
  };

  const onSubmit = async () => {
    setLoader(true);
    let fotoLink, cvLink;
    if (!id || (id && (foto || cv))) {
      if (foto) fotoLink = await uplodFoto();
      if (cv) cvLink = await uplodCV();
    }
    if ((foto && !fotoLink) || (cv && !cvLink)) {
      setShowModal(false);
      setLoader(false);
    } else {
      try {
        const method = id ? put : post;
        const url = id ? `${apiUrls.cmsKomunitasAhliData}/${+id}` : apiUrls.cmsKomunitasAhliData;
        let params = {
          nama: formData.nama,
          bidangKeahlian: formData?.bidangKeahlian?.value || '',
          daerah: {
            id: formData?.daerah?.value,
          },
          instansi: {
            id: formData?.instansi?.value,
          },
          level: formData?.level?.value || '',
          penyelenggara: formData?.penyelenggara?.value || '',
          pendidikan: formData?.pendidikan?.value || '',
          riwayat: formData.riwayat,
          foto: fotoLink || record?.foto || {},
          cv: cvLink || record?.cv || {},
          kontak: [
            { title: 'No Handphone', image: '', tipe: 'handphone', value: formData?.handphone || '' },
            { title: 'Email', image: '', tipe: 'email', value: formData?.email || '' },
            { title: '', image: '', tipe: 'facebook', value: formData?.facebook || '' },
            { title: '', image: '', tipe: 'twitter', value: formData?.twitter || '' },
            { title: '', image: '', tipe: 'instagram', value: formData?.instagram || '' },
            { title: '', image: '', tipe: 'youtube', value: formData?.youtube || '' },
          ],
        };
        if (id) {
          params = {
            ...params,
            kode: record.kode,
          };
        }
        await method(url, params);
        goBack();
      } catch (e) {
        setLoader(false);
        setShowModal(false);
        setAPIError(e.message);
      }
    }
  };

  return (
    <div className="sdp-manage-komunitas-container">
      <Form noValidate onSubmit={handleSubmit(handleDataSubmit)}>
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
          </div>
        </div>
        <div className="bg-gray-lighter p-32">
          <Row className="mb-3 px-24">
            {apiError || errorInfo?.all || error ? (
              <label className="sdp-error mb-20">{apiError || errorInfo?.all || error}</label>
            ) : null}
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
              error={errors?.nama?.message}
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
              data={bidangKeahlianData.map((item) => ({ value: item.id, label: item.nama }))}
              placeholder=""
              error={errors?.bidangKeahlian?.message}
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
              error={errors?.daerah?.message}
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
              error={errors?.instansi?.message}
              data={(instansiData?.result || []).map((item) => ({ value: item.id, label: item.nama }))}
              placeholder=""
              isLoading={instansiData?.loading}
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
              error={errors?.level?.message}
              data={CMS_KOMUNITAS_LEVEL.map((item) => ({ value: item, label: item }))}
              placeholder=""
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
              error={errors?.penyelenggara?.message}
              data={(values?.level?.value === 'Pusat' ? CMS_KOMUNITAS_LEVEL_PUSAT : CMS_KOMUNITAS_LEVEL_DAERAH).map(
                (item) => ({
                  value: item,
                  label: item,
                }),
              )}
              placeholder=""
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
              error={errors?.pendidikan?.message}
              data={CMS_KOMUNITAS_PENDIDIKAN.map((item) => ({ value: item, label: item }))}
              placeholder=""
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
              type="text"
              as="textarea"
              maxLength={500}
              error={errors?.riwayat?.message}
            />
            {id ? (
              <Form.Group as={Col} className="mt-5 mb-10" md="8">
                <label className="sdp-form-label mb-8">Foto Profil</label>
                <div className="cms-komunitas-ahli-file-input input-data d-flex align-items-center border-gray-stroke p-9 br-4">
                  <div className="br-12 m-16">
                    <img src={record?.foto?.location} alt="" className="brp-50" height="120px" width="120px" />
                  </div>
                  <label className="sdp-text-black bg-gray cursor-pointer" onClick={() => setFotoUpload(true)}>
                    + Upload new file
                  </label>
                </div>
                {!fotoUpload ? <label className="sdp-text-red mt-8">{errorInfo.foto}</label> : null}
              </Form.Group>
            ) : null}
            {fotoUpload ? (
              <FileInput
                error={errorInfo?.foto}
                group
                groupClass="mb-16"
                groupProps={{
                  md: 8,
                  as: Col,
                  controlId: 'formFile',
                }}
                label={!id ? 'Foto Profil' : ''}
                labelClass="sdp-form-label fw-normal"
                name="foto"
                control={control}
                uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
                handleOnChange={handleFoto}
              />
            ) : null}
            {id ? (
              <Form.Group as={Col} className="mt-5 mb-10" md="8">
                <label className="sdp-form-label mb-8">CV</label>
                <div className="cms-komunitas-ahli-file-input input-data d-flex align-items-center border-gray-stroke p-9 br-4">
                  <label className="sdp-text-blue bg-light-blue mr-10">{record?.cv?.fileName}</label>
                  <label className="sdp-text-black bg-gray cursor-pointer" onClick={() => setCVUpload(true)}>
                    + Upload new file
                  </label>
                </div>
                {!cvUpload ? <label className="sdp-text-red mt-8">{errorInfo.cv}</label> : null}
              </Form.Group>
            ) : null}
            {cvUpload ? (
              <FileInput
                error={errorInfo?.cv}
                group
                groupClass="mb-16"
                groupProps={{
                  md: 8,
                  as: Col,
                  controlId: 'formFile',
                }}
                label={!id ? 'CV Upload file' : ''}
                labelClass="sdp-form-label fw-normal"
                name="cv"
                control={control}
                uploadInfo="format .pdf max 2Mb"
                handleOnChange={handleCV}
              />
            ) : null}
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
                  <Input id="inputBox" control={control} name="handphone" type="number" wrapperClass="flex-grow-1" />
                </div>
              </Form.Group>
            </Row>
            <Row md="8" className="d-flex mb-16">
              <Form.Group md="12" as={Col} className="mb-16">
                <label className="sdp-form-label py-8">Kontak 2</label>
              </Form.Group>
              <Form.Group md="4" as={Col} className="mb-16 d-flex">
                <Form.Control type="text" name="kontak1" className="email-input" readOnly value="Email" />
              </Form.Group>
              <Form.Group md="4" as={Col} className="mb-16 d-flex flex-column">
                <Input
                  control={control}
                  name="email"
                  error={errors?.email?.message}
                  type="email"
                  wrapperClass="flex-grow-1"
                />
              </Form.Group>
            </Row>
            {Kontak_list.map((kontak, index) => (
              <Form.Group key={kontak.name} as={Col} className="d-flex justify-content-between mb-16" md="8">
                <Col md="12">
                  <Input
                    label={`Kontak ${index + 3}`}
                    labelClass="fw-normal"
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
      </Form>
      <Modal visible={showModal} onClose={() => setShowModal(false)} title="" showHeader={false}>
        <label className="p-24">Simpan Perubahan Data?</label>
        <div className="d-flex justify-content-end mt-50">
          <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button className="br-4 px-39 py-13" variant="info" onClick={onSubmit}>
            {loader && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />}
            Konfirmasi
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default KomunitasAhli;
