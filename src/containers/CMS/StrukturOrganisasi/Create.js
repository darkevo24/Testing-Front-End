import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import CMSStrukturForm from './Form.js';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();

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
          <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
            Simpan
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }}>
            Kirim
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <Row>
          <Col xs={9}>
            <CMSStrukturForm />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CMSJadwalBaru;
