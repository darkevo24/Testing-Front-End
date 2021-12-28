import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cx from 'classnames';
import bn from 'utils/bemNames';
import { Loader, CMSModal } from 'components';
import Notification from 'components/Notification';
import CMSStrukturForm, { submitStrukturForm } from './Form.js';
import { createStrukturOrganisasi, updateStatus, detailDataSelector, setStrukturOrganisasi } from './reducer';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [bidang, setBidang] = useState(null);
  const [action, setAction] = useState('');
  const { loading, record } = useSelector(detailDataSelector);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalLabel, setModalLabel] = useState('');

  const actionClick = (status) => {
    Promise.resolve()
      .then(() => setAction(status))
      .then(() => submitStrukturForm());
  };

  const onSubmit = (data) => {
    setBidang(data);

    // open modal
    let label = '';
    switch (action) {
      case 'simpan':
        label = <span>Simpan Berita?</span>;
        break;
      case 'kirim':
        label = <span>Kirim Berita?</span>;
        break;
      default:
        return;
    }
    setModalLabel(label);
    setModalConfirm(true);
  };

  const submitBidang = () => {
    setModalConfirm(false);
    if (action === 'kirim') {
      // edit
      if (bidang.id) {
        return dispatch(setStrukturOrganisasi({ payload: bidang, id: bidang.id }))
          .then((res) => dispatch(updateStatus({ id: res.payload.content.id, action: action })))
          .then((res) => notifyResponse(res));
      }
      // create
      return dispatch(createStrukturOrganisasi({ payload: bidang }))
        .then((res) => dispatch(updateStatus({ id: res.payload.content.id, action: action })))
        .then((res) => notifyResponse(res));
    }
    // edit
    if (bidang.id) {
      return dispatch(setStrukturOrganisasi({ payload: bidang, id: bidang.id })).then((res) => notifyResponse(res));
    }
    // create
    return dispatch(createStrukturOrganisasi({ payload: bidang })).then((res) => notifyResponse(res));
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: (
            <div>
              Bidang <span className="fw-bold">{res.payload?.content?.nama}</span> Berhasil Disimpan
            </div>
          ),
          icon: 'check',
          onClose: history.goBack(),
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
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          {record.id ? 'Edit Bidang' : 'Bidang Baru'}
          <Button
            onClick={() => history.goBack()}
            className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button onClick={() => actionClick('simpan')} className="ml-10" variant="secondary" style={{ width: '112px' }}>
            Simpan
          </Button>
          <Button onClick={() => actionClick('kirim')} className="ml-10" variant="info" style={{ width: '112px' }}>
            Kirim
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <Row>
          <Col xs={9}>
            <CMSStrukturForm dataValue={record} handleData={onSubmit} />
          </Col>
        </Row>
      </div>
      {modalConfirm ? (
        <CMSModal
          loader={false}
          onClose={() => setModalConfirm(false)}
          confirmButtonAction={submitBidang}
          label={modalLabel}
        />
      ) : null}
      {loading && <Loader fullscreen={true} />}
    </div>
  );
};

export default CMSJadwalBaru;
