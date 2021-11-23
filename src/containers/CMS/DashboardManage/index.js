import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bn from 'utils/bemNames';

const bem = bn('content-table');

const CMSDashboardManage = (props) => {
  return (
    <Row className={bem.e('section')}>
      <Col sm={9} className="my-5">
        <div>
          <div className="d-flex justify-content-between mb-4 mx-5">
            <div className={bem.e('title')}>{props.title}</div>
          </div>
          <Row className="kesiapan-sdi-iframe-container mx-4">
            <Col className="justify-content-center align-items-center">
              <iframe
                id="iframedashboardmanage"
                width="1000"
                height="1000"
                frameBorder="0"
                seamless
                title={props.title}
                src={props.url}></iframe>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default CMSDashboardManage;
