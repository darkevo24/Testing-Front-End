import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bn from '../../../utils/bemNames';
import React from 'react';

const bem = bn('content-table');

const CMSKesiapanSDI = () => {
  return (
    <Row className={bem.e('section')}>
      <Col sm={9} className="my-5">
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Kesiapan SDI</div>
            <Row className="kesiapan-sdi-iframe-container">
              <Col className="justify-content-center align-items-center">
                <iframe
                  width="1000"
                  height="1000"
                  frameBorder="0"
                  seamless
                  src="http://103.170.104.187:8088/r/28?standalone=true"></iframe>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CMSKesiapanSDI;
