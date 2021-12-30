import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DatePicker, Input } from 'components';
import TambahFormModal from './CMSDaftarTambahForm';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import DaftarDataProvider from 'containers/Daftar/DaftarDataProvider';
import DataVariableTable from 'containers/DataVariable/DataVariableTable';
import { formatOptions, jadwalPermutakhiranOptions } from 'utils/constants';
import {
  getAddDaftarSDGTujuan,
  getAddDaftarRKPpp,
  addTujuanSDGPillerOptionsSelector,
  addRkpPPOptionsSelector,
  katalogVariableDataSelector,
  getKatalogVariables,
  deleteVariableData,
} from 'containers/Daftar/reducer';
import cloneDeep from 'lodash/cloneDeep';

const schema = yup.object({
  instansi: yup.mixed().required(),
  nama: yup.string().required(),
  idKonsep: yup.string().required(),
  konsep: yup.string().required(),
  jadwalPemutakhiran: yup.mixed().required(),
  definisi: yup.string().required(),
  sumberDefinisi: yup.string().required(),
  tanggalDibuat: yup.date().required(),
  tanggalDiperbaharui: yup.date().required(),
  produsenData: yup.string().required(),
  indukData: yup.mixed().required(),
  format: yup.mixed().required(),
  linkAkses: yup.string().required(),
});

const CMSDaftarPage = ({ ...props }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [tableData, setTableData] = useState([]);
  const [apiError, setAPIError] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { result, error } = props.dafterDataWithId;
  const instansiOptions = props.instansiOptions;
  const dataindukOptions = props.dataindukOptions;
  const sdgPillerOptions = props.sdgPillerOptions;
  const rkpPNOptions = props.rkpPNOptions;
  const tujuanSDGPillerOptions = useSelector(addTujuanSDGPillerOptionsSelector);
  const rkpPPOptions = useSelector(addRkpPPOptionsSelector);
  const { pageSize, params, bodyParams, result: katalogResult } = useSelector(katalogVariableDataSelector);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      instansi: null,
      nama: '',
      idKonsep: '',
      konsep: '',
      jadwalPemutakhiran: null,
      definisi: '',
      sumberDefinisi: '',
      tanggalDibuat: '',
      tanggalDiperbaharui: '',
      produsenData: '',
      indukData: null,
      format: null,
      linkAkses: '',
    },
  });

  const fetchKatalogVariableData = (filterOverride = {}, reset = false) => {
    const { params: paramsOverride = {}, bodyParams: bodyParamsOverride = {} } = filterOverride;
    const filterParams = {
      ...cloneDeep(params),
      ...cloneDeep(paramsOverride),
    };
    if (reset) {
      filterParams.start = 0;
      filterParams.currentPage = 0;
    }
    const filterBodyParams = {
      ...cloneDeep(bodyParams),
      ...cloneDeep(bodyParamsOverride),
    };
    const filters = { params: filterParams, bodyParams: filterBodyParams };
    const daftarId = id;
    dispatch(getKatalogVariables({ daftarId, filters }));
  };

  useEffect(() => {
    if (id) fetchKatalogVariableData();
    if (id && result?.id !== +id) props.getDafterDataById(id);
  }, [id]);

  useEffect(() => {
    if (id && katalogResult?.records?.length) {
      setTableData(katalogResult?.records);
    }
  }, [katalogResult]);

  useEffect(async () => {
    if (!id) return;
    const [indukDataObjectKey] = Object.keys(result?.indukData || {});
    reset({
      instansi: { value: result?.instansiId, label: result?.instansi } || {},
      nama: result?.nama || '',
      idKonsep: result?.idKonsep || '',
      konsep: result?.konsep || '',
      jadwalPemutakhiran: jadwalPermutakhiranOptions.find((elem) => result?.jadwalPemutakhiran === elem.value) || {},
      definisi: result?.definisi || '',
      sumberDefinisi: result?.sumberDefinisi || '',
      tanggalDibuat: moment(result?.tanggalDibuat || new Date()).toDate() || '',
      tanggalDiperbaharui: moment(result?.tanggalDiperbaharui || new Date()).toDate() || '',
      produsenData: result?.produsenData || '',
      indukData: { value: indukDataObjectKey, label: result?.indukData[indukDataObjectKey] } || {},
      format: { value: result?.format, label: result?.format } || {},
      linkAkses: result?.linkAkses || '',
      kodePilar: { value: result?.kodePilar, label: result?.kodePilarDeskripsi } || {},
      kodeTujuan: { value: result?.kodeTujuan, label: result?.kodeTujuanDeskripsi } || {},
      kodePNRKP: { value: result?.kodePNRKP, label: result?.kodePNRKPDeskripsi } || {},
      kodePPRKP: { value: result?.kodePPRKP, label: result?.kodePPRKPDeskripsi } || {},
    });
  }, [result, id]);

  const goBack = () => {
    if (id) history.push(`/cms/daftar/${id}`);
    else history.push('/cms/daftar/');
  };

  const handleDataSubmit = async (formData) => {
    let clone = [...tableData];
    formData.pengaturanAkses = formData.pengaturanAkses.label;
    if (id) {
      await dispatch(props.dataVariableSubmit({ ...formData, idKatalog: id })).then((response) => {
        if ((response?.type || '').includes('rejected')) {
          setAPIError(response.error.message);
          return;
        }
        fetchKatalogVariableData();
      });
    } else {
      if (selectedRecord.nama) {
        const index = clone.indexOf(selectedRecord);
        clone[index] = formData;
        setTableData([...clone]);
      } else {
        if (tableData.length) {
          setTableData([...tableData, formData]);
        } else {
          setTableData([formData]);
        }
      }
    }
    setSelectedRecord({});
    setShowAddModal(false);
  };

  const handleEditModal = (formData) => {
    setShowAddModal(true);
    setSelectedRecord(formData);
  };

  const handleDelete = (formData) => {
    if (id && formData.id) {
      dispatch(deleteVariableData({ id: formData.id })).then((response) => {
        if ((response?.type || '').includes('rejected')) {
          setAPIError(response.error.message);
          return;
        }
        fetchKatalogVariableData();
      });
    } else {
      const clone = [...tableData];
      const index = clone.indexOf(formData);
      clone.splice(index, 1);
      setTableData([...clone]);
    }
  };

  const handleSubmitCallBack = async (apiResponse, hasError) => {
    if (hasError) {
      setAPIError(apiResponse.error.message);
      return null;
    }
    if (!tableData?.length) goBack();
    if (!apiResponse?.payload?.data?.content?.id) return null;
    const apiCall = tableData.map((item) => {
      if (!item.id) item.idKatalog = apiResponse.payload.data.content.id;
      return dispatch(props.dataVariableSubmit(item));
    });
    const response = await Promise.all(apiCall);
    const flag = false;
    response.forEach((item) => {
      if (!flag && (item?.type || '').includes('rejected')) {
        setAPIError(item.error.message);
      }
      if (!flag) goBack();

      return null;
    });
  };

  const handleDaftarFormSubmit = async (daftarFormData) => {
    if (id) daftarFormData.id = id;
    if (!id) daftarFormData['status'] = 0;
    props.handleDaftarFromSubmit(daftarFormData, handleSubmitCallBack, true);
  };

  const watchKodePilar = watch('kodePilar', false);
  const watchKodePNRKP = watch('kodePNRKP', false);

  useEffect(() => {
    if (watchKodePilar?.value) {
      dispatch(getAddDaftarSDGTujuan(watchKodePilar.value));
    }
  }, [watchKodePilar]);

  useEffect(() => {
    if (watchKodePNRKP?.value) {
      dispatch(getAddDaftarRKPpp(watchKodePNRKP.value));
    }
  }, [watchKodePNRKP]);

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(handleDaftarFormSubmit)}>
        <Row className="bg-gray-lighter ml-0">
          <Col className="pl-0">
            <div className="d-flex px-32 py-24 align-items-center border-bottom">
              <div className="sdp-heading mb-4">Data Baru</div>
              <div className="ml-24">
                <Button
                  variant="outline-secondary"
                  className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 py-13 px-40"
                  onClick={goBack}>
                  Batal
                </Button>
                <Button variant="light" type="submit" className="mr-16 bg-gray sdp-text-grey-dark br-4 py-13 px-32 border-0">
                  Simpan
                </Button>
              </div>
            </div>
          </Col>
          <Col lg="11" className="pl-32">
            <div className="py-32 pt-32">
              {error || apiError ? <label className="sdp-error mb-20">{error || apiError}</label> : null}
              <Row className="mb-16">
                <Col>
                  <SingleSelectDropdown
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="Instansi"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    rules={{ required: true }}
                    error={errors.instansi ? 'Instansi is required' : null}
                    data={instansiOptions}
                    name="instansi"
                    isLoading={false}
                    control={control}
                    noValue={true}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    labelClass="sdp-form-label fw-normal"
                    label="Nama Data"
                    error={errors.nama ? 'Nama Data is required' : null}
                    name="nama"
                    control={control}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <Input
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    labelClass="sdp-form-label fw-normal"
                    label="ID Konsep"
                    error={errors.idKonsep ? 'ID Konsep is required' : null}
                    name="idKonsep"
                    control={control}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    error={errors.konsep ? 'Konsep is required' : null}
                    labelClass="sdp-form-label fw-normal"
                    label="Konsep"
                    name="konsep"
                    control={control}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col xs="6">
                  <SingleSelectDropdown
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="Jadwal Pemutakhiran"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    rules={{ required: true }}
                    error={errors.jadwalPemutakhiran ? 'Jadwal Pemutakhiran is required' : null}
                    data={jadwalPermutakhiranOptions}
                    name="jadwalPemutakhiran"
                    isLoading={false}
                    control={control}
                    noValue={true}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <Input
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    labelClass="sdp-form-label fw-normal"
                    label="Definisi"
                    error={errors.definisi ? 'Definisi is required' : null}
                    name="definisi"
                    as="textarea"
                    control={control}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    labelClass="sdp-form-label fw-normal"
                    label="Sumber Definisi"
                    error={errors.sumberDefinisi ? 'Sumber Definisi is required' : null}
                    as="textarea"
                    name="sumberDefinisi"
                    control={control}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <DatePicker
                    group
                    label="Dibuat"
                    labelClass="sdp-form-label fw-normal"
                    control={control}
                    error={errors.tanggalDibuat ? 'Dibuat is required' : null}
                    name="tanggalDibuat"
                  />
                </Col>
                <Col>
                  <DatePicker
                    group
                    label="Diperbarui"
                    labelClass="sdp-form-label fw-normal"
                    error={errors.tanggalDiperbaharui ? 'Diperbarui is required' : null}
                    control={control}
                    name="tanggalDiperbaharui"
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <Input
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    error={errors.produsenData ? 'Produsen Data is required' : null}
                    labelClass="sdp-form-label fw-normal"
                    label="Produsen Data"
                    name="produsenData"
                    control={control}
                  />
                </Col>
                <Col>
                  <SingleSelectDropdown
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="Data Induk"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    error={errors.indukData ? 'Data Induk is required' : null}
                    rules={{ required: true }}
                    data={dataindukOptions}
                    name="indukData"
                    isLoading={false}
                    control={control}
                    noValue={true}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <SingleSelectDropdown
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="Format"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    rules={{ required: true }}
                    error={errors.format ? 'Format is required' : null}
                    data={formatOptions}
                    name="format"
                    isLoading={false}
                    control={control}
                    noValue={true}
                  />
                </Col>
                <Col>
                  <Input
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    labelClass="sdp-form-label fw-normal"
                    group
                    label="Link Akses"
                    error={errors.linkAkses ? 'Link Akses is required' : null}
                    name="linkAkses"
                    rightIcon="copy"
                    control={control}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <SingleSelectDropdown
                    name="kodePilar"
                    isLoading={false}
                    noValue={true}
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="Pilar SDGs"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    data={sdgPillerOptions}
                    control={control}
                  />
                </Col>
                <Col>
                  <SingleSelectDropdown
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="Tujuan SDGs"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    data={tujuanSDGPillerOptions}
                    name="kodeTujuan"
                    control={control}
                    noValue={true}
                  />
                </Col>
              </Row>
              <Row className="mb-16">
                <Col>
                  <SingleSelectDropdown
                    name="kodePNRKP"
                    isLoading={false}
                    noValue={true}
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="PN RKP"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    data={rkpPNOptions}
                    control={control}
                  />
                </Col>
                <Col>
                  <SingleSelectDropdown
                    name="kodePPRKP"
                    control={control}
                    noValue={true}
                    group
                    groupClass="mb-16"
                    groupProps={{
                      md: 12,
                      as: Col,
                    }}
                    label="PP RKP"
                    labelClass="sdp-form-label  fw-normal"
                    placeholder=""
                    data={rkpPPOptions}
                  />
                </Col>
              </Row>
            </div>
            <div className="pl-32 pt-32 pb-42 pr-32">
              <DataVariableTable
                manualPagination={false}
                search={!!id}
                showDeleteModal={handleDelete}
                showDataVariableFormModal={handleEditModal}
                fetchKatalogVariableData={fetchKatalogVariableData}
                data={tableData}
                cms
                cmsCreateForm={!id}
                params={params}
                pageSize={pageSize}
                daftar={result}
              />
              <Button variant="success" onClick={() => setShowAddModal(true)}>
                Tambah Variabel
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <TambahFormModal
        visible={showAddModal}
        data={selectedRecord}
        handleDataSubmit={handleDataSubmit}
        setModal={setShowAddModal}
        selectedRecord={selectedRecord}
      />
    </>
  );
};

const CMSDaftarForm = () => (
  <DaftarDataProvider>
    <CMSDaftarPage />
  </DaftarDataProvider>
);

export default CMSDaftarForm;
