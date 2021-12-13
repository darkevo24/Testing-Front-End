import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import { setDetailBerita, setEditBerita, detailDataSelector } from '../BeritaBaru/reducer';
import { useDispatch, useSelector } from 'react-redux';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { CMSForm, Loader } from 'components';
import { submitBeritaForm } from 'components/CMSForm';
import { Trash, EyeSvg, SaveSvg } from 'components/Icons';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';

const bem = bn('content-detail');

const CMSBeritaDetail = (props) => {
  const idBerita = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const fetchData = (params) => {
    dispatch(setDetailBerita(params));
  };

  useEffect(() => {
    fetchData({ id: idBerita });
  }, [idBerita]);

  const [beritaStatus, setBeritaStatus] = useState(record);
  // DRAFT = 0, WAITING = 1, PUBLISH/APPROVE = 2, REJECT = 3, UNPUBLISH = 4, DELETE = 5
  const actionSubmit = (status) => {
    setBeritaStatus(status);
    if (status === 5) {
      return;
    }
    submitBeritaForm();
  };

  const onSubmit = (data) => {
    data.publishDate = data.publishDate ? data.publishDate + ' ' + data.publishTime : '';

    data.status = beritaStatus;
    dispatch(setEditBerita({ payload: data, id: idBerita })).then((res) => {
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
  };

  return (
    <Row className={bem.e('section')}>
      <Col sm={8}>
        <div>
          <div className="d-flex justify-content-between mb-3">
            <div className={bem.e('title')}>Edit Berita</div>
            {record?.status === 1 ? (
              <div>
                <Button variant="secondary" onClick={() => actionSubmit(5)}>
                  <Trash />
                </Button>
                <Button variant="light" className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                  <EyeSvg />
                </Button>
                <Button
                  onClick={() => actionSubmit(0)}
                  variant="light"
                  className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                  <SaveSvg />
                </Button>
                <Button
                  onClick={() => actionSubmit(3)}
                  variant="light"
                  className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                  style={{ width: '112px' }}>
                  Tolak
                </Button>
                <Button onClick={() => actionSubmit(2)} className="ml-10" variant="info" style={{ width: '112px' }}>
                  Publish
                </Button>
              </div>
            ) : record?.status === 2 ? (
              <div>
                <Button variant="secondary" onClick={() => actionSubmit(5)}>
                  <Trash />
                </Button>
                <Button variant="light" className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                  <EyeSvg />
                </Button>
                <Button
                  onClick={() => actionSubmit(0)}
                  variant="light"
                  className="ml-8 bg-white sdp-text-grey-dark border-gray-stroke">
                  <SaveSvg />
                </Button>
                <Button
                  onClick={() => actionSubmit(4)}
                  variant="light"
                  className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                  style={{ width: '112px' }}>
                  Unpublish
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="secondary" onClick={() => actionSubmit(5)}>
                  <Trash />
                </Button>
                <Button
                  variant="light"
                  className="ml-10 bg-white border-gray-stroke sdp-text-black-dark"
                  style={{ width: '112px' }}>
                  Lihat
                </Button>
                <Button onClick={() => actionSubmit(1)} className="ml-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            )}
          </div>
          {!loading ? <CMSForm data={record} onSubmit={onSubmit} /> : null}
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={[]} />
      </Col>
      {loading && <Loader fullscreen={true} />}
    </Row>
  );
};

export default CMSBeritaDetail;
