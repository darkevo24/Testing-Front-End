import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import bn from 'utils/bemNames';
import cx from 'classnames';
import {
  getListConfigSecurity,
  configSecurityListSelector,
  getListConfigFeature,
  configListFeatureSelector,
} from './reducer';

const bem = bn('content-create');

const CMSSecurity = () => {
  const dispatch = useDispatch();
  const { configResult } = useSelector(configSecurityListSelector);
  const { featureResult } = useSelector(configListFeatureSelector);

  const initialCall = () => {
    dispatch(getListConfigSecurity());
    dispatch(getListConfigFeature());
  };

  useEffect(() => {
    initialCall();
  }, []);

  const history = useHistory();
  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-20')}>Sekuriti</div>
        <Button
          variant="outline"
          onClick={() => history.push('/cms/security/edit')}
          className="text-center px-35 border-gray-stroke">
          Ubah
        </Button>
      </div>
      <div className={bem.e('body')}>
        <Row className="justify-content-between">
          <Col xs={4}>
            {configResult
              ? configResult.map((data, index) => (
                  <div className={cx(bem.e('list-blokir'))} key={index}>
                    <span>{data.label}</span>
                    <span className="fw-bold bg-gray p-10">{data.value + ' ' + data.unit}</span>
                  </div>
                ))
              : 'Gagal Menampilkan Data'}
            {featureResult
              ? featureResult.map((data, index) => (
                  <div className={cx(bem.e('list-blokir'))} key={index}>
                    <span>Batas Waktu Link Lupa Password</span>
                    <span className="fw-bold bg-gray p-10">{data.value + ' ' + data.type}</span>
                  </div>
                ))
              : 'Gagal Menampilkan Data'}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CMSSecurity;
