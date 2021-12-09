import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Kontak_list } from 'utils/constants';
import { ReadOnlyInputs } from 'components';
import { LeftChevron, PencilSvg, Trash } from 'components/Icons';
import { getStatusClass, prefixID } from 'utils/helper';
import moment from 'moment';
import {
  getCMSKomunitasAhliDataById,
  getCMSKomunitasAhliLogById,
  cmsKomunitasAhliDetailDatasetSelector,
  cmsKomunitasAhliLogDatasetSelector,
} from './reducer';
import RowLoader from 'components/Loader/RowLoader';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'components/Modal';
import { apiUrls, deleteRequest, post } from 'utils/request';
import { CMSModal } from './CMSModals';

const KomunitasAhli = () => {
  const [showKirimModal, setShowKirimModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [showSetujuiModal, setShowSetujuiModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [apiError, setAPIError] = useState('');
  const [notes, setNotes] = useState('');
  const { loading, record, error } = useSelector(cmsKomunitasAhliDetailDatasetSelector);
  const { loading: logLoading, record: logRecord } = useSelector(cmsKomunitasAhliLogDatasetSelector);
  const status = (record?.status || '').toLowerCase();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {}, []);

  const goBack = () => {
    history.push('/cms/komunitas-ahli');
  };

  useEffect(() => {
    if (!id) goBack();
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getCMSKomunitasAhliDataById(id));
    dispatch(getCMSKomunitasAhliLogById(id));
  };

  const handleAPICall = async (method, url, params) => {
    try {
      setLoader(true);
      await method(url, {}, params);
      hanleCloseModal();
      initialCall();
    } catch (e) {
      hanleCloseModal();
      setAPIError(e.message);
    }
  };
  const onKirim = async () => {
    handleAPICall(post, `${apiUrls.cmsKomunitasAhliData}/${record.id}/kirim`);
  };

  const onDelete = async () => {
    handleAPICall(deleteRequest, `${apiUrls.cmsKomunitasAhliData}/${record.id}/`);
  };

  const onSetujui = async () => {
    handleAPICall(post, `${apiUrls.cmsKomunitasAhliData}/${record.id}/setujui`);
  };

  const onTolak = async () => {
    handleAPICall(post, `${apiUrls.cmsKomunitasAhliData}/${record.id}/tolak`, { query: { notes } });
  };

  const hanleCloseModal = () => {
    setShowKirimModal(false);
    setLoader(false);
    setShowDeleteModal(false);
  };

  const list = [
    {
      label: 'Kode Ahli',
      value: record?.kode || '',
    },
    {
      label: 'Nama Ahli',
      value: record?.nama || '',
    },
    {
      label: 'Bidang Keahlian',
      value: record?.bidangKeahlian || '',
    },
    {
      label: 'Daerah',
      value: record?.daerah?.nama || '',
    },
    {
      label: 'Instansi / Lembaga',
      value: record?.instansi?.nama || '',
    },
    {
      label: 'Level',
      value: record?.level,
    },
    {
      label: 'Penyelenggara',
      value: record?.penyelenggara || '',
    },
    {
      label: 'Pendidikan',
      value: record?.pendidikan || '',
    },
  ];

  const divClass = getStatusClass(status);
  const getValue = (key) => {
    const rec = (record.kontak || []).find((item) => item.tipe === key);
    return rec?.value || '';
  };

  return (
    <div className="sdp-komunitas-detail-container">
      <div className="d-flex">
        <Button variant="light" className="bg-white border-gray-stroke" onClick={goBack}>
          <LeftChevron variant="gray" />
        </Button>
        <div className={`br-2 p-12 flex-grow-1 flex-center  ${divClass?.divBG || ''}`}>
          <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || record?.status || ''}</span>
        </div>
      </div>
      <Row className="mt-40">
        <Col xs={12} md={6} className="ml-184">
          <div className="d-flex align-items-center justify-content-between">
            <label className="fw-bold fs-24 lh-29 p-32">Profil Ahli</label>
            {!loading && (
              <div>
                <Button
                  key="edit"
                  variant="light"
                  className="mr-16 br-4 bg-gray border-0"
                  onClick={() => setShowDeleteModal(true)}>
                  <Trash />
                </Button>
                {status === 'draft' ? (
                  <>
                    <Button
                      key="edit"
                      variant="outline-light"
                      className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                      onClick={() => history.push('/cms/manage-komunitas-ahli')}>
                      <PencilSvg />
                    </Button>
                    <Button
                      key="kirim"
                      variant="info"
                      className="mr-16 br-4 px-40 border-0"
                      onClick={() => setShowKirimModal(true)}>
                      Kirim
                    </Button>
                  </>
                ) : null}
                {status === 'menunggu_persetujuan' ? (
                  <>
                    <Button
                      key="tolak"
                      variant="outline-light"
                      className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
                      onClick={() => setShowTolakModal(true)}>
                      Tolak
                    </Button>
                    <Button
                      key="Setujui"
                      variant="info"
                      className="mr-16 br-4 px-40 border-0"
                      onClick={() => setShowSetujuiModal(true)}>
                      Setujui
                    </Button>
                  </>
                ) : null}
              </div>
            )}
          </div>
          <div className="mb-3 px-24">
            {apiError || error ? <label className="sdp-error mb-20">{apiError || error}</label> : null}
            {list.map((item) =>
              loading ? (
                <RowLoader />
              ) : (
                <ReadOnlyInputs
                  group
                  label={item.label}
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  value={item.value}
                />
              ),
            )}
            {loading ? (
              <RowLoader />
            ) : (
              <ReadOnlyInputs
                group
                rows={3}
                label="Riwayat Singkat"
                labelClass="sdp-form-label fw-normal"
                type="text"
                as="textarea"
                value={record?.riwayat || ''}
              />
            )}
            <Form.Group as={Col} className="d-flex justify-content-between mt-5" md="12">
              <Col className="sdp-table-sub-title" md="12">
                Kontak
              </Col>
            </Form.Group>
            {loading ? (
              <RowLoader />
            ) : (
              <div className="d-flex mb-16">
                <ReadOnlyInputs
                  group
                  groupClass="mb-16"
                  groupProps={{
                    md: 6,
                    as: Col,
                  }}
                  label="Kontak 1"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  value="No Handphone"
                />

                <Form.Group md="6" as={Col} className="mb-16 d-flex flex-column justify-content-end pr-0">
                  <div className="d-flex">
                    <ReadOnlyInputs
                      label=""
                      labelClass="sdp-form-label fw-normal"
                      type="text"
                      value={getValue('handphone')}
                    />
                  </div>
                </Form.Group>
              </div>
            )}
            {loading ? (
              <RowLoader />
            ) : (
              <div className="d-flex mb-16">
                <ReadOnlyInputs
                  group
                  groupClass="mb-16"
                  groupProps={{
                    md: 6,
                    as: Col,
                  }}
                  label="Kontak 2"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  value="Email"
                />

                <Form.Group md="6" as={Col} className="mb-16 d-flex flex-column justify-content-end pr-0">
                  <div className="d-flex">
                    <ReadOnlyInputs label="" labelClass="sdp-form-label fw-normal" type="text" value={getValue('email')} />
                  </div>
                </Form.Group>
              </div>
            )}
            {Kontak_list.map((kontak, index) => (
              <Form.Group as={Col} className="d-flex justify-content-between mb-16" md="12">
                <Col md="12">
                  {loading ? (
                    <RowLoader />
                  ) : (
                    <ReadOnlyInputs
                      label={`Kontak ${index + 3}`}
                      labelClass="sdp-form-label fw-normal"
                      type="text"
                      wrapperClass="flex-grow-1"
                      leftIcon={kontak.icon}
                      leftIconClass="py-15 px-20"
                      className="h-auto"
                      value={getValue(kontak.name)}
                    />
                  )}
                </Col>
              </Form.Group>
            ))}
          </div>
        </Col>
        <Col xs={6} md={3} className="">
          <label className="fs-20 lh-25 pt-32 fw-bold">Log Status</label>
          <div className="d-flex flex-column mt-24">
            {logLoading ? (
              <RowLoader />
            ) : (
              (logRecord || []).map((item) => {
                const status = (item?.data?.status || '').toLowerCase();
                const classDetail = getStatusClass(status);
                return (
                  <div className="mb-24">
                    <div className="d-flex align-items-center">
                      <span className="fs-14 lh-17 sdp-text-black-dark w-100">
                        {moment(item.createdAt).format('DD MMMM YYYY')}
                      </span>
                      <div className="border-gray-stroke h-0 w-100" />
                    </div>
                    <div className="d-flex mt-12 ">
                      <div className={`br-2 py-4 px-6 mr-8 h-fit-content ${classDetail?.divBG || ''}`}>
                        <span className={`fs-14 lh-17 ${classDetail?.textColor || ''}`}>
                          {classDetail?.text || item.data.status}
                        </span>
                      </div>
                      <span className="sdp-text-disable">
                        {status === 'selesai'
                          ? 'Data Pengguna Sudah dapat digunakan.'
                          : 'Dataset sudah dapat di akses di portal data.go.id'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Col>
      </Row>
      {showKirimModal && (
        <CMSModal
          visible={showKirimModal}
          onClose={() => setShowKirimModal(false)}
          label="Kirim Profil Ahli?"
          cancelButtonText="Batal"
          loader={loader}
          confirmButtonText="Konfirmasi"
          confirmButtonAction={onKirim}
        />
      )}
      {showSetujuiModal && (
        <CMSModal
          visible={showSetujuiModal}
          onClose={() => setShowSetujuiModal(false)}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">menyetujui</span> Profil Ahli{' '}
              <b>{prefixID(record.id, 'KA')}</b>?
            </>
          }
          cancelButtonText="Batal"
          loader={loader}
          confirmButtonText="Konfirmasi"
          confirmButtonAction={onSetujui}
        />
      )}
      {showDeleteModal && (
        <CMSModal
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-error">menghapus</span> Jadwal Bimbingan Teknis{' '}
              <b>{prefixID(record.id, 'KA')}</b>?
            </>
          }
          cancelButtonText="Batal"
          loader={loader}
          confirmButtonText="Konfirmasi"
          confirmButtonAction={onDelete}
        />
      )}
      {showTolakModal && (
        <Modal visible={true} onClose={() => setShowTolakModal(false)} title="" showHeader={false} centered={true}>
          Apakah anda yakin ingin <span className="sdp-text-red">menolak</span> Profil Ahli <b>{prefixID(id, 'PD')}</b>?
          <textarea
            placeholder="Tulis Catatan"
            name="catatan"
            value={notes}
            onChange={({ target: { value = '' } = {} }) => setNotes(value.trim())}
            className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"
            required
          />
          <div className="d-flex justify-content-end">
            <Button
              className="br-4 mr-8 px-57 py-13 bg-transparent"
              variant="light"
              onClick={() => setShowTolakModal(false)}>
              Batal
            </Button>
            <Button className="br-4 px-39 py-13" variant="info" disabled={!notes.trim()} onClick={onTolak}>
              {loader && (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
              )}
              Konfirmasi
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default KomunitasAhli;
