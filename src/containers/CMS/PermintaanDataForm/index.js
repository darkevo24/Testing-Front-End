import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import isFunction from 'lodash/isFunction';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getPermintaanDataDetail, getPermintaanDataDetailLog, permintaanDataDetailSelector } from './reducer';
import { getStatusClass, prefixID } from 'utils/helper';
import { apiUrls, post } from 'utils/request';
import Notification from 'components/Notification';
import { Input } from 'components';
import { DetailHeader } from './detailHeader';
import bn from 'utils/bemNames';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { LeftChevron } from 'components/Icons';
import Modal from 'components/Modal';

const bem = bn('content-detail');

const CMSPermintaanDataView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { result, dataLog } = useSelector(permintaanDataDetailSelector);
  const [objRequired, setObjRequired] = useState({});
  const [showModal, setShowModal] = useState('');

  const history = useHistory();
  const status = (result?.status || '').toLowerCase();
  const goBack = () => {
    history.push('/cms/permintaan-data');
  };

  const initialCall = () => {
    dispatch(getPermintaanDataDetail(id));
    dispatch(getPermintaanDataDetailLog(id));
  };

  const data = useMemo(() => result || {}, [result]);
  useEffect(() => {
    initialCall();
  }, []);

  const schema = yup.object(objRequired).required();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  useEffect(() => {
    setValue('deskripsi', data?.deskripsi);
    setValue('tujuanPermintaan', data?.tujuanPermintaan);
    setValue('instansi.nama', data?.instansi?.nama);
    setValue('tanggalTarget', moment(data?.tanggalTarget).format('DD/MM/YYYY'));
    setValue('jenisData', data?.jenisData);
    setValue('urlDataset', data?.urlDataset);
    switch (data.status) {
      case 'TERKIRIM':
        return setObjRequired({
          catatan: yup.string().required(),
        });
      case 'DIPROSES':
        return setObjRequired({
          catatan: yup.string().required(),
          urlDatasetNew: yup.string().required(),
        });
      default:
        return null;
    }
  }, [data]);

  const handleCloseModal = () => {
    setShowModal('');
  };

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', `${message}`, 'check');
      initialCall();
      isFunction(callBack) && callBack();
    } catch (e) {
      console.log(e);
      handleNotification('secondary', `Error, ${e.message}`, 'cross');
      handleCloseModal();
    }
  };

  const onSubmitTolak = (data) => {
    let obj = {
      catatan: data.catatan,
    };
    handleAPICall(
      post,
      `${apiUrls.detailPermintaanData}/${id}/tolak`,
      { data: obj },
      'Permintaan Data Berhasil Ditolak',
      goBack,
    );
  };

  const onSubmitProses = (data) => {
    let obj = {
      catatan: data.catatan,
    };
    handleAPICall(
      post,
      `${apiUrls.detailPermintaanData}/${id}/proses`,
      { data: obj },
      'Permintaan Data Berhasil Diproses',
      goBack,
    );
  };

  const onSubmitSelesai = (data) => {
    let obj = {
      catatan: data.catatan,
      urlDataset: data.urlDatasetNew,
    };
    handleAPICall(
      post,
      `${apiUrls.detailPermintaanData}/${id}/selesai`,
      { data: obj },
      'Permintaan Data Berhasil Diselesaikan',
      goBack,
    );
  };

  const divClass = getStatusClass(status || '');
  return (
    <div className={bem.e('cms-permintaan-data')}>
      <div className="d-flex align-items-center">
        <button className="bg-white border-gray-stroke p-10" onClick={goBack}>
          <LeftChevron />
        </button>
        <div className={`br-2 p-12 flex-grow-1 flex-center  ${divClass?.divBG || ''}`}>
          <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || result?.status || ''}</span>
        </div>
      </div>
      <Row className={bem.e('section')}>
        <Col sm={9} className="my-5">
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Detail</div>
              <div>
                <DetailHeader handleModal={(type) => setShowModal(type)} history={history} status={status} />
              </div>
            </div>
            <Form className="sdp-form" noValidate>
              <Input disabled group label="Deskripsi Data" name="deskripsi" control={control} />
              <Input disabled group label="Tujuan Permintaan data" name="tujuanPermintaan" control={control} />
              <Input disabled group label="Target Waktu" name="tanggalTarget" control={control} />
              <Input disabled group label="Produsen Data" name="instansi.nama" control={control} />
              <Input disabled group label="Jenis Data" name="jenisData" control={control} />
              <Input disabled group isLink label="URL Dataset" name="urlDataset" control={control} />
            </Form>
            <div>
              <h5 className="fw-bold mb-3 border-bottom-gray-stroke py-2">Informasi Peminta Data</h5>
              <ul>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Nama Lengkap</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.user?.name}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">NIP/NIK</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data?.user?.nik}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Instansi</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data?.instansi?.nama}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Unit Kerja</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data?.user?.unitKerja?.nama}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Status Kepegawaian</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data?.user?.status}</p>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </Col>
        <Col sm={3} className="my-5">
          <LogStatus data={dataLog} />
        </Col>
        {showModal === 'tolak' && (
          <Modal className="modal-permintaan-detail" showHeader={false} visible={showModal} onClose={handleCloseModal}>
            <div className="mt-20 mb-20">
              <p className="font-weight-bold mb-0">
                Apakah anda yakin ingin
                <span className="text-danger"> menolak </span>
                Permintaan Data
              </p>
              {prefixID(id, 'PD')} ?
            </div>
            <Form onSubmit={handleSubmit(onSubmitTolak)} noValidate>
              <Form.Group as={Col} md="12" className="mb-16">
                <Input
                  name="catatan"
                  as="textarea"
                  control={control}
                  rules={{ required: true }}
                  placeholder="Tulis catatan"
                  type="text"
                  error={errors.catatan?.message}
                />
                <span className="length">0/140</span>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Proses
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'proses' && (
          <Modal
            className="modal-permintaan-detail"
            showHeader={false}
            visible={showModal}
            onClose={handleCloseModal}
            title="">
            <div className="mt-20 mb-20">
              <p className="font-weight-bold mb-0">
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> memproses </span>
                Permintaan Data
              </p>
              {prefixID(id, 'PD')} ?
            </div>
            <Form onSubmit={handleSubmit(onSubmitProses)} noValidate>
              <Form.Group as={Col} md="12" className="mb-16">
                <Input
                  name="catatan"
                  as="textarea"
                  control={control}
                  rules={{ required: true }}
                  placeholder="Tulis catatan"
                  type="text"
                  error={errors.catatan?.message}
                />
                <span className="length">0/140</span>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Proses
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'selesai' && (
          <Modal showHeader={false} className="modal-permintaan-data-proses" visible={showModal} onClose={handleCloseModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Menyelesaikan </span>
                Permintaan Data
              </p>
              <span className="font-weight-bold"> {prefixID(id, 'PD')} </span>?
            </div>
            <div className="alert"> Masukan url dataset terkait pada kolom berikut </div>
            <Form onSubmit={handleSubmit(onSubmitSelesai)} noValidate>
              <InputGroup>
                <div className="url">URL</div>
                <Input
                  name="urlDatasetNew"
                  control={control}
                  type="text"
                  rules={{ required: true }}
                  error={errors.urlDatasetNew?.message}
                />
              </InputGroup>
              <Form.Group as={Col} md="12" className="mb-16 mt-15">
                <Input
                  name="catatan"
                  as="textarea"
                  control={control}
                  rules={{ required: true }}
                  placeholder="Tulis catatan"
                  type="text"
                  error={errors.catatan?.message}
                />
                <span className="length">0/140</span>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Selesai
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </Row>
    </div>
  );
};

export default CMSPermintaanDataView;
