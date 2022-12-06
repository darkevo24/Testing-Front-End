import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { CMSTable } from 'components';
import { getStrukturOrganisasi, strukturDatasetSelector, setPreviewBidang } from './reducer';

import { ReactComponent as Plus } from 'assets/plus.svg';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';
import styled from 'styled-components';

const bem = bn('content-table');

const Wrapper = styled.div`
  width: 100%;
  margin: 40px;
`;

const CMSStrukturOrganisasi = () => {
  const addStruktur = () => {
    console.log('add struktur');
  };
  return (
    <Wrapper>
      <Row>
        <Col xs={3} clasName="p-5">
          <div className={cx(bem.e('title'), 'mb-16')}>Struktur Organisasi</div>
          <div className="w-100 d-flex justify-content-between mb-3">
            <Button
              onClick={() => addStruktur(false)}
              className="bg-white sdp-text-grey-dark border-gray-stroke"
              style={{ width: '15%' }}
              variant="secondary">
              -
            </Button>
            <Button
              onClick={() => addStruktur(false)}
              className="bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '80%' }}>
              Sekretariat SDI Tingkat Pusat
            </Button>
          </div>
          <Button className="mx-auto" variant="success" onClick={addStruktur}>
            <Plus width="16" />
            Tambah
          </Button>
        </Col>
        <Col xs={9}>
          <div>ttt</div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CMSStrukturOrganisasi;
