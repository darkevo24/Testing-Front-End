import { useParams } from 'react-router-dom';
import bn from 'utils/bemNames';
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LeftChevron } from 'components/Icons';
import { ReactComponent as PlusIcon } from 'assets/plus-red.svg';
import DeleteIcon from 'assets/delete.svg';
import EditIcon from 'assets/edit.svg';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Input } from 'components';
import { useForm } from 'react-hook-form';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import {
  getInstansiDetail,
  instansiDetailSelector,
  instansiLogsSelector,
  getInstansiLogs,
  instansiUnitKejiraSelector,
  getInstansiUnitKejira,
  updateInstaStatus,
  deleteUnitKerja,
} from '../reducer';
import { LogStatus } from 'components/Sidebars/LogStatus';
import UnitKejiraList from '../UnitKerja/UnitKejiraList';
import { getCookieByName, cookieKeys } from 'utils/cookie';

const INSTANSI_STATUS = {
  accepted: 'APPROVED',
  waiting_approval: 'WAITING_APPROVAL',
  rejected: 'REJECTED',
  deleted: 'DELETED',
};

const bem = bn('instansi-data');

const InstansiDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { content } = useSelector(instansiDetailSelector);
  const { records } = useSelector(instansiLogsSelector);
  const unitKejira = useSelector(instansiUnitKejiraSelector);
  const [showModal, setShowModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [currentUnitKejira, setCurrentUnitKejira] = useState(null);
  const [instansiStatus, setInstansiStatus] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const user = getCookieByName(cookieKeys.user);

  const data = useMemo(() => content || {}, [content]);
  const dataLogsData = useMemo(() => records || [], [records]);
  const dataUnitKejira = useMemo(() => unitKejira || [], [unitKejira]);
  const status = useMemo(() => data.status || '', [data]);

  const fetchDetail = () => {
    dispatch(getInstansiDetail(id));
  };
  const fetchDatasetLog = () => {
    return dispatch(getInstansiLogs(`logs/${id}`));
  };
  const fetchUnitKejira = () => {
    return dispatch(getInstansiUnitKejira(`${id}/unit-kerja?size=-1`));
  };

  useEffect(() => {
    fetchDetail();
    fetchDatasetLog();
    fetchUnitKejira();
  }, []);
  useEffect(() => {
    reset(data);
    setIsOwner(user?.id === data?.createdBy?.id);
  }, [data]);

  const backToTable = () => {
    history.push('/cms/instansi');
  };
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const onSubmitStatus = (data) => {
    const obj = {
      id,
      status: instansiStatus,
      payload: {
        note: data.catatan,
      },
    };
    dispatch(updateInstaStatus(obj)).then((_res) => {
      if (_res.payload) {
        Notification.show({
          type: 'secondary',
          message: <div> Berhasil Update Status </div>,
          icon: 'check',
        });
        fetchDetail();
      } else {
        Notification.show({
          type: 'secondary',
          message: <div> Gagal Update Status </div>,
          icon: 'cross',
        });
      }
    });

    reset();
    setShowModal(false);
  };
  const onUnitKejiraEdit = (unitId) => {
    history.push(`/cms/instansi/${id}/edit-unit-kerja/${unitId}`);
  };
  const onUnitKejiraDelete = (unitId) => {
    setCurrentUnitKejira(unitId);
    setShowUnitModal(true);
  };
  const onUnitKejiraDeleteSubmit = (_data) => {
    const obj = {
      instansiId: id,
      unitId: currentUnitKejira,
    };
    dispatch(deleteUnitKerja(obj)).then((_res) => {
      if (_res.payload) {
        Notification.show({
          type: 'secondary',
          message: <div> Berhasil Delete Unit Kerja </div>,
          icon: 'check',
        });
      } else {
        Notification.show({
          type: 'secondary',
          message: <div> Gagal Delete Unit Kerja </div>,
          icon: 'cross',
        });
      }
    });

    reset();
    setShowUnitModal(false);
  };

  const StatusBar = () => {
    return (
      <div className="d-flex flex-row status-row">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className={bem.e('status', status.toLowerCase())}>{status}</Row>
      </div>
    );
  };

  const handleUnitKejira = (path) => {
    history.push(path);
  };

  const handleInstansiKirim = () => {
    setInstansiStatus(INSTANSI_STATUS.waiting_approval);
    setShowModal(true);
  };
  const handModalOpen = (statusValue) => {
    setShowModal(true);
    setInstansiStatus(statusValue);
  };

  const ModalHeader = () => {
    switch (instansiStatus) {
      case INSTANSI_STATUS.accepted:
        return (
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Anda yakin untuk
              <span className="text-info"> menyetujui</span>
              Instansi ini?
            </p>
          </div>
        );
      case INSTANSI_STATUS.rejected:
        return (
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Anda yakin untuk
              <span className="text-danger"> tidak setuju </span>
              Instansi ini?
            </p>
          </div>
        );
      case INSTANSI_STATUS.deleted:
        return (
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> menghapus </span>
              {data.nama}
            </p>
            <strong>{data.kode}</strong> ?
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={bem.e('sdp-instansi-data')}>
      <StatusBar />
      <Row className={bem.e('section')}>
        <Col sm={8} className="my-5">
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Detail</div>
              <div className={bem.e('draft-active-action')}>
                {!isOwner ? (
                  <>
                    <img
                      className="mx-4 cursor-pointer"
                      src={DeleteIcon}
                      alt="delete"
                      onClick={(e) => handModalOpen(INSTANSI_STATUS.deleted)}
                    />
                    <img
                      className="mx-4 cursor-pointer"
                      src={EditIcon}
                      alt="edit"
                      onClick={(e) => handleUnitKejira(`edit/${id}`)}
                    />

                    {status === 'APPROVED' && (
                      <>
                        <Button
                          className="mx-4"
                          variant="outline-secondary"
                          onClick={(e) => handModalOpen(INSTANSI_STATUS.rejected)}>
                          Tolak
                        </Button>
                        <Button
                          className="mx-4"
                          variant="info"
                          disabled={isOwner}
                          onClick={(e) =>
                            handModalOpen(status === 'DRAFT' ? INSTANSI_STATUS.waiting_approval : INSTANSI_STATUS.accepted)
                          }>
                          Setuju
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <img
                      className="mx-4"
                      src={DeleteIcon}
                      alt="delete"
                      onClick={(e) => handModalOpen(INSTANSI_STATUS.deleted)}
                    />
                    <img
                      className="mx-4 cursor-pointer"
                      src={EditIcon}
                      alt="edit"
                      onClick={(e) => handleUnitKejira(`edit/${id}`)}
                    />
                    {status === 'DRAFT' && (
                      <Button key="Kirim" variant="info" className="mr-16 br-4 px-40 py-13" onClick={handleInstansiKirim}>
                        Kirim
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            <Form className="sdp-form" noValidate>
              <Input disabled group label="Kode Instansi " name="kode" control={control} />
              <Input disabled group label="Nama Instansi Permintaan data" name="nama" control={control} />
              <Input disabled group label="Level Instansi" name="level" control={control} />
            </Form>
            {data?.logo?.location && (
              <Form.Group as={Col} className="mt-5" md="12">
                <label className="sdp-form-label">Logo Instansi</label>
                <div className="d-flex align-items-center bg-gray border-gray-stroke p-9 br-4">
                  <div className="px-16 py-9">
                    <img src={data?.logo?.location} alt="no foto" height="128px" width="128px" className="brp-50" />
                  </div>
                  <label className="sdp-text-blue">{data?.logo?.fileName}</label>
                </div>
              </Form.Group>
            )}
          </div>
        </Col>
        <Col sm={3} className="my-5">
          <LogStatus data={dataLogsData} />
        </Col>
      </Row>
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div className="d-flex flex-col">
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('subtitle')}>Daftar Unit Kerja</div>
              <div className="d-flex cursor-pointer" onClick={(e) => handleUnitKejira(`${id}/new-unit-kerja`)}>
                <PlusIcon className={bem.e('plus-icon')} />
                <span className="text-danger">Tambah Unit Kerja</span>
              </div>
            </div>
            <div className="my-5">
              <UnitKejiraList dataset={dataUnitKejira} onEdit={onUnitKejiraEdit} onDelete={onUnitKejiraDelete} />
            </div>
          </div>
        </Col>

        <Modal
          className="modal-permintaan-detail"
          showHeader={false}
          visible={showModal}
          onClose={() => setShowModal(!showModal)}>
          <ModalHeader />

          <Form onSubmit={handleSubmit(onSubmitStatus)} noValidate>
            <Form.Group as={Col} md="12" className="mb-16">
              <Input
                name="catatan"
                as="textarea"
                control={control}
                rules={{ required: true }}
                placeholder="Tulis catatan"
                type="text"
              />
              <span className="length">0/140</span>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setShowModal(!showModal)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          className="modal-permintaan-detail"
          showHeader={false}
          visible={showUnitModal}
          onClose={() => setShowUnitModal(!showUnitModal)}>
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> menghapus </span> Unit Kerja
            </p>{' '}
            <strong>{currentUnitKejira}</strong> ?
          </div>

          <Form onSubmit={handleSubmit(onUnitKejiraDeleteSubmit)} noValidate>
            <Form.Group as={Col} md="12" className="mb-16">
              <Input
                name="catatan"
                as="textarea"
                control={control}
                rules={{ required: true }}
                placeholder="Tulis catatan"
                type="text"
              />
              <span className="length">0/140</span>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setShowUnitModal(!showUnitModal)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default InstansiDetail;
