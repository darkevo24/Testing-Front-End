import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useHistory } from 'react-router-dom';
import { setDetailBerita, detailDataSelector } from '../BeritaBaru/reducer';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { CMSForm, Loader } from 'components';
import bn from 'utils/bemNames';

const bem = bn('content-detail');

const CMSBeritaDetail = (props) => {
  const idBerita = props.match.params.id;
  // const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const fetchData = (params) => {
    dispatch(setDetailBerita(params));
  };

  useEffect(() => {
    fetchData({ id: idBerita });
  }, [idBerita]);

  return (
    <Row className={bem.e('section')}>
      <Col sm={8}>
        <div>
          <div className="d-flex justify-content-between mb-3">
            <div className={bem.e('title')}>Edit Berita</div>
            <div>
              <Button variant="secondary">
                <DeleteIcon />
              </Button>
              <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
                Lihat
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </div>
          {!loading ? <CMSForm data={record} /> : null}
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
