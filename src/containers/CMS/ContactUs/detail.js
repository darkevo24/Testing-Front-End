import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CMSTopDetail, Loader } from 'components';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';

import CMSContactForm from './form';
import { getDetailKontak, getLogKontak, contactDetailSelector, logDataSelector } from './reducer';

const bem = bn('content-detail');

const CMSContactDetail = (props) => {
  const idContact = props.match.params.id;
  const dispatch = useDispatch();
  const { loading, record } = useSelector(contactDetailSelector);
  const { records: logRecords } = useSelector(logDataSelector);
  const [canEdit, setCanEdit] = useState(false);
  const fetchData = (params) => {
    dispatch(getDetailKontak(params));
    dispatch(getLogKontak(params));
  };

  useEffect(() => {
    fetchData({ id: idContact });
  }, [idContact]);

  useEffect(() => {
    if (record && record.status === 'DRAFT') {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }, [record]);

  return (
    <div>
      <CMSTopDetail status={record?.status?.toLowerCase()} />
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between mb-3">
              <div className={bem.e('title')}>Contact Us</div>
              {/*<div>button</div>*/}
            </div>
            {!loading && <CMSContactForm data={record} disabled={!canEdit} />}
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={logRecords} />
        </Col>
      </Row>
      {loading && <Loader fullscreen={true} />}
    </div>
  );
};

export default CMSContactDetail;
