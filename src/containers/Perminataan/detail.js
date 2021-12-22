import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'components/Modal';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  getPerminataanLogDataById,
  getPerminataanDataById,
  detailDatasetSelector,
  logDatasetSelector,
  kirimsetSelector,
  setKirimPerminataanData,
  getPerminataanData,
} from './reducer';
import { BackArrow, PencilSvg } from 'components/Icons';
import { getPerminataanInfo, getUserInfo } from './constant';
import { prefixID, getStatusClass } from 'utils/helper';
import { userSelector } from '../Login/reducer';
import { Loader, ReadOnlyInputs } from 'components';
import { EditForum } from './Forum/EditForum';

export const PerminataanDetail = () => {
  const [catatan, setCatatan] = useState('');
  const [catatanError, setCatatanError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { loading, record, page } = useSelector(detailDatasetSelector);
  const { loading: logLoading, record: logRecord } = useSelector(logDatasetSelector);
  const history = useHistory();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { loading: kirimLoading, error: kirimError } = useSelector(kirimsetSelector);
  const { id } = useParams();
  const status = (record?.status || '').toLowerCase();

  const goBack = () => {
    history.push('/permintaan-data');
  };

  useEffect(() => {
    if (!id) goBack();
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getPerminataanDataById(id));
    dispatch(getPerminataanLogDataById(id));
  };

  const confirmSubmit = () => {
    if (kirimLoading) return;
    if (!catatan.trim()) {
      setCatatanError('Required');
      return;
    }
    const url = status === 'diproses' ? 'batal' : 'kirim';
    const actionPromise = setKirimPerminataanData({ id: id, payload: { catatan }, url });
    dispatch(actionPromise).then(() => {
      initialCall();
      setShowConfirmModal(false);
      dispatch(getPerminataanData(page));
    });
  };

  const divClass = getStatusClass(status);
  const logSelesai = logRecord.find((item) => item.data.status === 'SELESAI');
  return (
    <div className="sdp-perminataan-detail-container my-40 mx-400">
      <Row className="mt-40">
        <Col xs={12} md={9} className="">
          <div className="">
            <div className="d-flex p-16 br-4 border-gray-stroke justify-content-between br-box br-box-shadow">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center cursor-pointer" onClick={goBack}>
                  <BackArrow variant="blue" />
                  <span className="sdp-text-blue mx-12">List Permintaan Data</span>
                </div>

                <span className="sdp-text-grey-dark mr-12"> / </span>
                <spn className="sdp-text-black-dark">{prefixID(id, 'PD')}</spn>
              </div>
              {status === 'draft' && (
                <div className="d-flex">
                  <Button
                    variant="light"
                    className="bg-transparent mr-8 border-gray-stroke br-4"
                    onClick={() => setShowEditModal(true)}>
                    <PencilSvg />
                  </Button>
                  <Button onClick={() => setShowConfirmModal(true)}>Kirim Permintaan</Button>
                </div>
              )}
              {status === 'diproses' && (
                <Button className="bg-red-light sdp-text-red" onClick={() => setShowConfirmModal(true)}>
                  Batalkan Permintaan
                </Button>
              )}
            </div>
            <div className={`br-2 p-12 d-flex justify-content-center align-items-center ${divClass?.divBG || ''}`}>
              <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || record?.status || ''}</span>
            </div>

            <div className="border-gray-stroke mt-24 br-4">
              <div className="p-16 border-bottom-gray-stroke">
                <span className="sdp-text-grey-dark">Informasi Peminta Data</span>
              </div>
              <div className="p-24">
                {getUserInfo(user).map((item) => (
                  <div className="d-flex justify-content-between mb-16">
                    <span className="fs-14 lh-17 sdp-text-black-dark">{item.title}</span>
                    <span className="fs-14 lh-17 sdp-text-black-dark">{item.data}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-gray-stroke mt-24 br-4">
              <div className="p-16 border-bottom-gray-stroke">
                <span className="sdp-text-grey-dark">Permintaan Data</span>
              </div>
              <div className="p-24">
                {getPerminataanInfo(record).map((item) => (
                  <div className="d-flex justify-content-between  mb-16">
                    <span className="fs-14 lh-17 sdp-text-black-dark">{item.title}</span>
                    <span className="fs-14 lh-17 sdp-text-black-dark">{item.data}</span>
                  </div>
                ))}
              </div>
            </div>

            {status === 'selesai' && (
              <div className="border-gray-stroke mt-24 br-4">
                <div className="p-16 border-bottom-gray-stroke">
                  <span className="sdp-text-grey-dark">Url Dataset</span>
                </div>
                <div className="p-24 cursor-pointer">
                  <div className="d-flex align-items-center mb-10">
                    <span className="d-flex fs-14 lh-17 sdp-text-black-dark w-100 align-items-center">
                      {moment(logSelesai?.createdAt).format('DD MMMM YYYY')}
                      <div className="border-gray-stroke h-0 w-25 ml-12" />
                    </span>
                  </div>
                  <ReadOnlyInputs value={record.urlDataset} rightIcon="copy" rightIconClass="bg-gray" />
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <span className="fs-20 lh-25">Log Status</span>
          <div className="d-flex flex-column mt-24">
            {logRecord.map((item) => {
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
                    <span className="sdp-text-disable">{item.remark}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      {showConfirmModal && (
        <Modal visible={true} onClose={() => setShowConfirmModal(false)} title="" showHeader={false} centered={true}>
          Apakah anda yakin ingin {status === 'diproses' ? <span className="sdp-text-red">membatalkan</span> : 'mengirim'}{' '}
          permintaan data <b>{prefixID(id, 'PD')}</b>
          <textarea
            placeholder="Tulis Catatan"
            name="catatan"
            value={catatan}
            onChange={({ target: { value = '' } = {} }) => setCatatan(value)}
            className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"
            required
          />
          <label className="sdp-text-red">{kirimError || catatanError}</label>
          <div className="d-flex justify-content-end">
            <Button
              className="br-4 mr-8 px-57 py-13 bg-transparent"
              variant="light"
              onClick={() => setShowConfirmModal(false)}>
              Batal
            </Button>
            <Button className="br-4 px-39 py-13" variant="info" onClick={confirmSubmit}>
              {kirimLoading && (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
              )}
              Konfirmasi
            </Button>
          </div>
        </Modal>
      )}
      {showEditModal && <EditForum data={record} onClose={() => setShowEditModal(false)} initialCall={initialCall} />}
      {(loading || logLoading) && <Loader fullscreen={true} />}
    </div>
  );
};
