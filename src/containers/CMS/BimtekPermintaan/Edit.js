import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, Input, Modal } from 'components';
import Notification from 'components/Notification';
import { CMSModal } from 'components/CMSStatusModals';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { getStatusClass, prefixID } from 'utils/helper';
import { apiUrls, post, put } from 'utils/request';
import bn from 'utils/bemNames';
import { LeftChevron } from 'components/Icons';
import { DetailHeader } from './detailHeader';
import { bimtekLogSelector, bimtekPermintaanDataDetail, getPermintaanDataDetail, getListLogAktifitas } from './reducer';

const bem = bn('content-detail');

const CMSBimtekPermintaanEdit = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records } = useSelector(bimtekLogSelector);
  const detailPermintaan = useSelector(bimtekPermintaanDataDetail);
  const [showModal, setShowModal] = useState('');
  const [loader, setLoader] = useState(false);

  const initialCall = () => {
    dispatch(getListLogAktifitas({ id }));
    dispatch(getPermintaanDataDetail({ id }));
  };

  useEffect(() => {
    initialCall();
  }, []);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      setLoader(true);
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', `${message}`, 'check');
      initialCall();
    } catch (e) {
      setLoader(true);
      handleNotification('secondary', `Error, ${e?.data?.message}`, 'cross');
      handleCloseModal();
    }
  };

  const data = useMemo(() => detailPermintaan || {}, [detailPermintaan]);
  const status = (detailPermintaan?.status || '').toLowerCase();

  useEffect(() => {
    reset({
      default: data,
      namaBimbinganTeknis: data.namaBimtek,
      tempatBimbinganTeknis: data.tempat,
      jamMulaiDisetujuiUpdate: !data.tanggalMulaiDisetujui ? '' : moment(data.tanggalMulaiDisetujui).format('hh:mm'),
      jamSelesaiDisetujuiUpdate: !data.tanggalSelesaiDisetujui ? '' : moment(data.tanggalSelesaiDisetujui).format('hh:mm'),
      tanggalMulaiDisetujuiUpdate: !data.tanggalMulaiDisetujui
        ? ''
        : moment(data.tanggalMulaiDisetujui).format('DD/MM/YYYY'),
      tanggalSelesaiDisetujuiUpdate: !data.tanggalSelesaiDisetujui
        ? ''
        : moment(data.tanggalSelesaiDisetujui).format('DD/MM/YYYY'),
    });
  }, [data]);

  const schema = yup
    .object({
      namaBimbinganTeknis: yup.string().required(),
      tempatBimbinganTeknis: yup.string().required(),
      tanggalMulaiDisetujuiUpdate: yup.string().required(),
      tanggalSelesaiDisetujuiUpdate: yup.string().required(),
      jamMulaiDisetujuiUpdate: yup.string().required(),
      jamSelesaiDisetujuiUpdate: yup.string().required(),
    })
    .required();

  const schemaTolak = yup.object({ catatanTolak: yup.string().required() }).required();

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const {
    control: controlTolak,
    formState: { errors: errorsTolak },
    reset: resetTolak,
    handleSubmit: handleSubmitTolak,
  } = useForm({
    resolver: yupResolver(schemaTolak),
    defaultValues: {
      catatanTolak: '',
    },
  });

  const goBack = () => {
    history.push('/cms/bimtek-permintaan');
  };

  const onSubmitProses = () => {
    handleAPICall(
      put,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/APPROVED`,
      { data: { catatan: 'approved' } },
      'Berhasil merubah status menjadi approved',
    );
  };

  const onSubmitTolak = (data) => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/REJECTED`,
      { data: { catatan: data.catatanTolak } },
      'Berhasil menolak Bimtek Permintaan Data',
    );
  };

  const onSubmitPublish = () => {
    handleAPICall(
      put,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/PUBLISHED`,
      { data: { catatan: 'publish' } },
      'Berhasil merubah status menjadi publish',
    );
  };

  const onSubmitUnpublish = () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/UNPUBLISHED`,
      { data: { catatan: 'unpublish' } },
      'Berhasil merubah status menjadi unpublish',
    );
  };

  const onSubmitSetujuiBimbingan = (data) => {
    const tanggalMulaiDisetujui = `${moment(data.tanggalMulaiDisetujuiUpdate).format('YYYY-MM-DD')} ${
      data.jamMulaiDisetujuiUpdate
    }:00`;
    const tanggalSelesaiDisetujui = `${moment(data.tanggalSelesaiDisetujuiUpdate).format('YYYY-MM-DD')} ${
      data.jamSelesaiDisetujuiUpdate
    }:00`;
    const obj = {
      id: data.default.id,
      namaBimtek: data.namaBimbinganTeknis,
      tagMateri: data.default.tagMateri,
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
      kota: data.default.kotaId,
      alamat: data.tempatBimbinganTeknis,
    };
    handleAPICall(put, `${apiUrls.cmsBimtekJadwal}/${id}`, { data: obj }, 'Berhasil Menyetujui Bimbingan Teknis');
  };

  const handleCloseModal = () => {
    setLoader(false);
    setShowModal('');
  };
  const divClass = getStatusClass(status || '');
  return (
    <div className={bem.e('cms-permintaan-detail')}>
      <div className="d-flex align-items-center">
        <button className="bg-white border-gray-stroke p-10" onClick={goBack}>
          <LeftChevron />
        </button>
        <div className={`br-2 p-12 flex-grow-1 flex-center  ${divClass?.divBG || ''}`}>
          <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || records?.status || ''}</span>
        </div>
      </div>
      <Row className={bem.e('section')}>
        <Col sm={9}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Permintaan Bimbingan Teknis Baru</div>
              <DetailHeader handleModal={(type) => setShowModal(type)} history={history} status={status} />
            </div>
            <Form className="sdp-form">
              <Input readOnly group label="Nama Lengkap" name="default.requestor.nama" control={control} />
              <Input readOnly group label="Dinas Instansi" name="default.requestor.instansiName" control={control} />
              <Input readOnly group label="No. Handphoen" name="default.requestor.noHp" control={control} />
              <Input readOnly group label="Kota Pelaksana" name="default.kota" control={control} />
              <Input readOnly group label="Provinsi/Kab/Kota" name="default.requestor.provinsiName" control={control} />
              <Input readOnly group label="Jabatan / Peran Daftar" name="default.requestor.roles" control={control} />
              <Input readOnly group label="Email" name="default.requestor.email" control={control} />
              <Input
                readOnly
                group
                label="Ekspektasi Jumlah Peserta"
                name="default.ekspektasiJumlahPeserta"
                control={control}
              />
              <Input readOnly group label="Tagging Materi" name="default.tagMateri" control={control} />
              <Input
                group
                readOnly={data.status === 'WAITING_REQUEST_APPROVAL' ? false : true}
                label="Nama Bimbingan Teknis"
                name="namaBimbinganTeknis"
                control={control}
                error={errors.namaBimbinganTeknis?.message}
              />
              <Input
                group
                readOnly={data.status === 'WAITING_REQUEST_APPROVAL' ? false : true}
                label="Tempat"
                name="tempatBimbinganTeknis"
                control={control}
                error={errors.tempatBimbinganTeknis?.message}
              />
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    readOnly={data.status === 'WAITING_REQUEST_APPROVAL' ? false : true}
                    label="Tanggal Mulai Pelaksanaan Disetujui"
                    name="tanggalMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.tanggalMulaiDisetujuiUpdate?.message}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    readOnly={data.status === 'WAITING_REQUEST_APPROVAL' ? false : true}
                    className="m-0"
                    type="time"
                    label=""
                    name="jamMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.jamMulaiDisetujuiUpdate?.message}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    readOnly={data.status === 'WAITING_REQUEST_APPROVAL' ? false : true}
                    label="Tanggal Selesai Pelaksanaan Disetujui"
                    name="tanggalSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.tanggalSelesaiDisetujuiUpdate?.message}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    readOnly={data.status === 'WAITING_REQUEST_APPROVAL' ? false : true}
                    className="m-0"
                    type="time"
                    label=""
                    name="jamSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.jamSelesaiDisetujuiUpdate?.message}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={records} />
        </Col>
        {showModal === 'setujui' && (
          <CMSModal
            onClose={handleCloseModal}
            label={
              <>
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Menyetujui </span>
                Permintaan Bimbingan Teknis <b> {prefixID(id, 'JB')}</b>?
              </>
            }
            loader={loader}
            confirmButtonAction={onSubmitProses}
          />
        )}
        {showModal === 'publish' && (
          <CMSModal
            onClose={handleCloseModal}
            label={
              <>
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Merubah Status </span>
                Permintaan Bimbingan Teknis <b> {prefixID(id, 'JB')}</b>? menjadi Publish
              </>
            }
            loader={loader}
            confirmButtonAction={onSubmitPublish}
          />
        )}
        {showModal === 'unpublish' && (
          <CMSModal
            onClose={handleCloseModal}
            label={
              <>
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Merubah Status </span>
                Permintaan Bimbingan Teknis <b> {prefixID(id, 'JB')}</b>? menjadi Unpuplish
              </>
            }
            loader={loader}
            confirmButtonAction={onSubmitUnpublish}
          />
        )}
        {showModal === 'tolak' && (
          <Modal
            showHeader={false}
            className="cms-bimtek-permintaan-detail"
            title="Tambah Pembicari Baru"
            visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="text-danger"> Menolak </span>
                Permintaan Bimbingan Teknis {prefixID(id, 'BP')} ?
              </p>
            </div>
            <Form onSubmit={handleSubmitTolak(onSubmitTolak)} noValidate>
              <Input as="textarea" name="catatanTolak" control={controlTolak} error={errorsTolak.catatanTolak?.message} />
              <div className="d-flex justify-content-end mt-20">
                <Button className="mr-10 px-35" variant="secondary" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10 px-35" variant="info">
                  Tolak
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'proses' && (
          <CMSModal
            onClose={handleCloseModal}
            label={
              <>
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Menyetujui </span>
                Permintaan Bimbingan Teknis
                <b> {prefixID(id, 'JB')}</b>?
              </>
            }
            loader={loader}
            confirmButtonAction={handleSubmit(onSubmitSetujuiBimbingan)}
          />
        )}
      </Row>
    </div>
  );
};

export default CMSBimtekPermintaanEdit;
