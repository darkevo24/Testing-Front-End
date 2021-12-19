import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import Notification from 'components/Notification';
import CMSStrukturForm, { submitStrukturForm } from './Form.js';
import { useDispatch, useSelector } from 'react-redux';
import { createStrukturOrganisasi, updateStatus, detailDataSelector } from './reducer';
import { Loader } from 'components';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [bidang, setBidang] = useState(null);
  const [action, setAction] = useState('');
  const { loading, record: newData } = useSelector(detailDataSelector);

  const simpanData = () => {
    submitStrukturForm();
    setAction('simpan');
  };

  const kirimData = () => {
    submitStrukturForm();
    setAction('kirim');
  };

  useEffect(() => {
    if (bidang !== null) {
      dispatch(createStrukturOrganisasi({ payload: bidang })).then((res) => {
        res?.payload
          ? Notification.show({
              type: 'secondary',
              message: (
                <div>
                  Berita <span className="fw-bold">{res.payload.content.judul}</span> Berhasil Ditambahkan
                </div>
              ),
              icon: 'check',
              onClose: history.goBack(),
            })
          : Notification.show({
              message: (
                <div>
                  Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
                </div>
              ),
              icon: 'cross',
            });
      });
    }
  }, [bidang]);

  useEffect(() => {
    if (action === 'kirim' && newData) {
      dispatch(updateStatus({ id: newData.id, action: action })).then((res) => {
        res?.payload
          ? Notification.show({
              type: 'secondary',
              message: (
                <div>
                  Berita <span className="fw-bold">{res.payload.content.judul}</span> Berhasil Ditambahkan
                </div>
              ),
              icon: 'check',
              onClose: history.goBack(),
            })
          : Notification.show({
              message: (
                <div>
                  Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
                </div>
              ),
              icon: 'cross',
            });
      });
      setAction('');
    }
  }, [newData]);

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Bidang Baru
          <Button
            onClick={() => history.goBack()}
            className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button onClick={simpanData} className="ml-10" variant="secondary" style={{ width: '112px' }}>
            Simpan
          </Button>
          <Button onClick={kirimData} className="ml-10" variant="info" style={{ width: '112px' }}>
            Kirim
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <Row>
          <Col xs={9}>
            <CMSStrukturForm handleData={setBidang} />
          </Col>
        </Row>
      </div>
      {loading && <Loader fullscreen={true} />}
    </div>
  );
};

export default CMSJadwalBaru;
