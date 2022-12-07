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

const Arrow = styled.i`
  border: solid gray;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;

  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

const CMSStrukturOrganisasi = () => {
  const dispatch = useDispatch();
  const { records: organizations } = useSelector(strukturDatasetSelector);
  const fetchData = (params) => {
    return dispatch(getStrukturOrganisasi(params));
  };
  const [newButton, setNewButton] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const addStruktur = () => {
    //add new button counter
    setNewButton(Number(newButton + 1));
    console.log(newButton);
  };
  return (
    <Wrapper>
      <Row>
        <Col xs={3} clasName="p-5">
          <div className={cx(bem.e('title'), 'mb-16')}>Struktur Organisasi</div>
          <div style={{ marginBottom: '25px' }}>
            {organizations.map((org) => (
              <div className="w-100 d-flex justify-content-between" style={{ marginBottom: '5px' }}>
                <Button onClick={() => addStruktur(false)} style={{ width: '15%' }} variant="secondary">
                  -
                </Button>
                <Button
                  onClick={() => addStruktur(false)}
                  className="bg-white sdp-text-grey-dark border-gray-stroke"
                  variant="secondary"
                  style={{ width: '80%' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    {' '}
                    <div style={{ display: 'flex', flex: 'start' }}>{org.organizationName}</div>
                    <div style={{ textAlign: 'left' }}>
                      <Arrow />
                    </div>
                  </div>
                </Button>
              </div>
            ))}
            {newButton > 0 &&
              Array.from(Array(newButton).keys()).map((i) => (
                <div className="w-100 d-flex justify-content-between" style={{ marginBottom: '5px' }}>
                  <Button onClick={() => addStruktur(false)} style={{ width: '15%' }} variant="secondary">
                    -
                  </Button>
                  <Button
                    className="bg-white sdp-text-grey-dark border-gray-stroke"
                    variant="secondary"
                    style={{ width: '80%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                      {' '}
                      <Form.Control
                        type="text"
                        placeholder="Nama Struktur"
                        className="sdp-input"
                        style={{ width: '100%', border: 'none' }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <Arrow />
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            {/* {newButton && (
              <div className="w-100 d-flex justify-content-between" style={{ marginBottom: '5px' }}>
                <Button onClick={() => addStruktur(false)} style={{ width: '15%' }} variant="secondary">
                  -
                </Button>
                <Button
                  onClick={() => addStruktur(false)}
                  className="bg-white sdp-text-grey-dark border-gray-stroke"
                  variant="secondary"
                  style={{ width: '80%' }}>
                  <div style={{ width: '100%', display: 'flex' }}>
                    {' '}
                    <div style={{ display: 'flex', flex: 'start' }}>
                      <Form.Control
                        type="text"
                        placeholder="Nama Struktur"
                        className="sdp-input"
                        style={{ width: '100%', border: 'none' }}
                      />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <Arrow />
                    </div>
                  </div>
                </Button>
              </div>
            )} */}
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
