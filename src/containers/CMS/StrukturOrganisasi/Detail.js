import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import CMSStrukturForm from './Form.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStrukturOrganisasiById,
  getStrukturOrganisasiLogs,
  detailDataSelector,
  logDatasetSelector,
  setStrukturOrganisasi,
} from './reducer';

import { Loader } from 'components';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';

const bem = bn('content-detail');

const CMSStrukturDetail = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const { loading: logLoading, record: logRecord } = useSelector(logDatasetSelector);
  const [bidang, setBidang] = useState(null);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id) => {
    dispatch(getStrukturOrganisasiById(id));
    dispatch(getStrukturOrganisasiLogs(id));
  };

  const simpanData = () => {
    if (!bidang) {
      return;
    }
    dispatch(setStrukturOrganisasi({ id: id, payload: bidang })).then(() => {
      history.goBack();
    });
  };

  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-24">
            <div className={bem.e('title')}>Bidang Detail</div>
            <div>
              <Button variant="secondary">
                <DeleteIcon />
              </Button>
              <Button
                onClick={() => history.goBack()}
                className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke"
                variant="secondary"
                style={{ width: '112px' }}>
                Batal
              </Button>
              <Button onClick={() => simpanData()} className="ml-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </div>
          {!loading ? <CMSStrukturForm dataValue={record} handleData={setBidang} /> : null}
        </div>
      </Col>
      <Col sm={3}>{!logLoading ? <LogStatus data={logRecord.slice(0, 5)} /> : null}</Col>
      {(loading || logLoading) && <Loader fullscreen={true} />}
    </Row>
  );
};

export default CMSStrukturDetail;
