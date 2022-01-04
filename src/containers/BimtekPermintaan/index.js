import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { getBimtekPermintaan, bimtekPermintaan } from './reducer';
import { NoPerminataanData } from 'components/Icons';
import bn from 'utils/bemNames';
import moment from 'moment';
import Pagination from 'components/Pagination';

const bem = bn('bimtek-permintaan');
const paginateParams = {
  page: 1,
  size: 10,
};

const BimtekPermintaan = () => {
  const dispatch = useDispatch();
  const { records: permintaanRecords, totalPages: pageNumber } = useSelector(bimtekPermintaan);

  useEffect(() => {
    dispatch(getBimtekPermintaan(paginateParams));
  }, []);

  const changePage = (props) => {
    dispatch(getBimtekPermintaan({ ...paginateParams, page: props.page }));
  };

  return (
    <BimtekLayout className="bimtek-permintaan">
      <Row className={bem.e('', 'mb-12 ml-0')}>
        {!permintaanRecords.length ? (
          <div className={bem.e('', 'd-flex justify-content-center align-items-center flex-column')}>
            <NoPerminataanData />
            <div className="text-black-50">No Data</div>
          </div>
        ) : (
          permintaanRecords.map((item, key) => (
            <PermintaanItem
              key={key}
              id={item.id}
              kodeBimtek={item.kodeBimtek}
              namaBimtek={item.namaBimtek}
              kota={item.kota}
              tanggal={moment(item.tanggalRequest).format('YYYY-MM-DD')}
              status={item.status}
              tagMateri={item.tagMateri}
            />
          ))
        )}
      </Row>
      {permintaanRecords?.length && <Pagination totalPages={pageNumber} onChangePage={(props) => changePage(props)} />}
    </BimtekLayout>
  );
};

const PermintaanItem = ({ id, kodeBimtek, namaBimtek, kota, tanggal, status, tagMateri }) => {
  const history = useHistory();
  const handlePermintaan = (id) => {
    history.push(`/bimtek-permintaan/${id}`);
  };

  return (
    <Row className={bem.e('item', 'ml p-10 d-flex align-items-center')} onClick={() => handlePermintaan(id)}>
      <Col lg={1} className="fs-16">
        {kodeBimtek}
      </Col>
      <Col lg={2} className="fs-16">
        {namaBimtek}
      </Col>
      <Col lg={2} className="fs-16">
        {tagMateri.join()}
      </Col>
      <Col lg={1} className="fs-16">
        {kota}
      </Col>
      <Col lg={2} className="fs-16">
        {tanggal}
      </Col>
      <Col lg={4} className="fs-16 d-flex align-items-center justify-content-start w-134">
        <hr className={bem.e('status')} />
        <span> {status} </span>
      </Col>
    </Row>
  );
};

export default BimtekPermintaan;
