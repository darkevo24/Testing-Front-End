import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bn from 'utils/bemNames';

const bem = bn('content-table');

const CMSDashboardManage = (props) => {
  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div className="p-32">
          <div className="d-flex justify-content-between mb-32">
            <div className={bem.e('title')}>{props.title}</div>
          </div>
          <div className="kesiapan-sdi-iframe-container">
            <iframe
              id="iframedashboardmanage"
              width="1000"
              height="600"
              frameBorder="0"
              seamless
              title={props.title}
              src={props.url}></iframe>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CMSDashboardManage;
