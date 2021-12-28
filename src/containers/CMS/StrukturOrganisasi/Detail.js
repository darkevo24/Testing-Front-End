import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { PencilSvg, Trash } from 'components/Icons';
import { Loader, CMSTopDetail, CMSModal } from 'components';
import { LogStatus } from 'components/Sidebars/LogStatus';
import Notification from 'components/Notification';
import Modal from 'components/Modal';
import bn from 'utils/bemNames';
import { STATUS_DATA } from 'utils/constants';
import CMSStrukturForm, { submitStrukturForm } from './Form.js';
import {
  getStrukturOrganisasiById,
  getStrukturOrganisasiLogs,
  detailDataSelector,
  logDatasetSelector,
  updateStatus,
} from './reducer';

const bem = bn('content-detail');

const CMSStrukturDetail = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const { loading: logLoading, record: logRecord } = useSelector(logDatasetSelector);
  const [action, setAction] = useState('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id) => {
    dispatch(getStrukturOrganisasiById(id));
    dispatch(getStrukturOrganisasiLogs(id));
  };

  const updateData = () => {
    setModalConfirm(false);
    dispatch(updateStatus({ id: id, action: action }))
      .then((res) => notifyResponse(res))
      .then(() => fetchData(id));
  };

  const onTolak = () => {
    setModalConfirm(false);
    dispatch(updateStatus({ id: id, action: action, notes: notes }))
      .then((res) => notifyResponse(res))
      .then(() => fetchData(id));
  };

  const actionClick = (status) => {
    Promise.resolve()
      .then(() => setAction(status))
      .then(() => submitStrukturForm());
  };

  const onSubmit = (data) => {
    // open modal
    let label = '';
    switch (action) {
      case 'kirim':
        label = <span>Kirim Berita?</span>;
        break;
      case 'arsipkan':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">mengarsipkan</b> {record?.nama}?
          </span>
        );
        break;
      case 'tolak':
        break;
      case 'setujui':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menyetujui</b> {record?.nama}?
          </span>
        );
        break;
      case 'publish':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menayangkan</b> {record?.nama}?
          </span>
        );
        break;
      case 'unpublish':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">tidak menayangkan</b> {record?.nama}?
          </span>
        );
        break;
      default:
        return;
    }
    setModalLabel(label);
    setModalConfirm(true);
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: (
            <div>
              Bidang <span className="fw-bold">{res.payload.content.judul}</span> Berhasil Disimpan
            </div>
          ),
          icon: 'check',
        })
      : Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error?.message}</span> Data Tidak Disimpan
            </div>
          ),
          icon: 'cross',
        });
  };

  return (
    <div>
      <CMSTopDetail status={record?.status?.toLowerCase()} />
      <Row className={bem.e('section')}>
        <Col sm={9}>
          <div>
            <div className="d-flex justify-content-between mb-24">
              <div className={bem.e('title')}>Bidang Detail</div>
              {record?.status === STATUS_DATA.draft || record?.status === STATUS_DATA.rejected ? (
                <div>
                  <Button onClick={() => actionClick('arsipkan')} variant="secondary" className="mr-16">
                    <Trash />
                  </Button>
                  <Button
                    key="edit"
                    variant="outline-light"
                    className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                    onClick={() => history.push('/cms/struktur-form')}>
                    <PencilSvg />
                  </Button>
                  <Button onClick={() => actionClick('kirim')} variant="info" style={{ width: '112px' }}>
                    Kirim
                  </Button>
                </div>
              ) : record?.status === STATUS_DATA.waitingApproval ? (
                <div>
                  <Button
                    key="edit"
                    variant="outline-light"
                    className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                    onClick={() => history.push('/cms/struktur-form')}>
                    <PencilSvg />
                  </Button>
                  <Button
                    onClick={() => actionClick('tolak')}
                    className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke"
                    variant="secondary"
                    style={{ width: '112px' }}>
                    Tolak
                  </Button>
                  <Button onClick={() => actionClick('setujui')} variant="info" style={{ width: '112px' }}>
                    Setujui
                  </Button>
                </div>
              ) : record?.status === STATUS_DATA.approved || record?.status === STATUS_DATA.unpublished ? (
                <div>
                  <Button
                    key="edit"
                    variant="outline-light"
                    className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4"
                    onClick={() => history.push('/cms/struktur-form')}>
                    <PencilSvg />
                  </Button>
                  <Button onClick={() => actionClick('publish')} variant="info" style={{ width: '112px' }}>
                    Publish
                  </Button>
                </div>
              ) : record?.status === STATUS_DATA.published ? (
                <div>
                  <Button onClick={() => actionClick('unpublish')} variant="info" style={{ width: '112px' }}>
                    Unpublish
                  </Button>
                </div>
              ) : null}
            </div>
            {!loading ? <CMSStrukturForm dataValue={record} handleData={onSubmit} idBidang={id} disabled={true} /> : null}
          </div>
        </Col>
        <Col sm={3}>{logLoading ? null : <LogStatus data={logRecord} />}</Col>
        {(loading || logLoading) && <Loader fullscreen={true} />}
        {modalConfirm && action !== 'tolak' ? (
          <CMSModal
            loader={false}
            onClose={() => setModalConfirm(false)}
            confirmButtonAction={updateData}
            label={modalLabel}
          />
        ) : modalConfirm && action === 'tolak' ? (
          <Modal visible={true} onClose={() => setModalConfirm(false)} title="" showHeader={false} centered={true}>
            Apakah anda yakin ingin <span className="sdp-text-red">menolak</span> Bidang?
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
                onClick={() => setModalConfirm(false)}>
                Batal
              </Button>
              <Button className="br-4 px-39 py-13" variant="info" disabled={!notes.trim()} onClick={onTolak}>
                Konfirmasi
              </Button>
            </div>
          </Modal>
        ) : null}
      </Row>
    </div>
  );
};

export default CMSStrukturDetail;
