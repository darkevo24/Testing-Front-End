import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';
import { getBimtekPermintaan, bimtekPermintaan } from './reducer';
import moment from 'moment';

const BimtekPermintaan = () => {
  const dispatch = useDispatch();
  const { records: permintaanRecords } = useSelector(bimtekPermintaan);

  useEffect(() => {
    dispatch(getBimtekPermintaan());
  }, []);

  return (
    <BimtekLayout className="sdp-bimtek-materi">
      <Row className="mb-12">
        {permintaanRecords.map((item, key) => (
          <PermintaanItem
            key={key}
            kodeBimtek={item.kodeBimtek}
            namaBimtek={item.namaBimtek}
            kota={item.kota}
            tanggal={moment(item.tanggalRequest).format('YYYY-MM-DD')}
            status={item.status}
          />
        ))}
      </Row>
    </BimtekLayout>
  );
};

const PermintaanItem = ({ kodeBimtek, namaBimtek, kota, tanggal, status }) => {
  return (
    <Row>
      <Col sm={6} lg={12} className="d-flex justify-content-between align-items-center sdp-bimtek-materi__item">
        <Col className="fs-16 col-lg-2">{kodeBimtek}</Col>
        <Col className="fs-16 col-lg-3">{namaBimtek}</Col>
        <Col className="fs-16 col-lg-2">
          <LocationTag /> {kota}
        </Col>
        <Col className="fs-16 col-lg-2">{tanggal}</Col>
        <Col className="fs-16 col-lg-3">{status}</Col>
      </Col>
    </Row>
  );
};

export default BimtekPermintaan;
