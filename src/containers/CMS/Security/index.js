import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSSecurity = () => {
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
            <div className="mb-15">Pemblokiran akun</div>
            <div className={cx(bem.e('list-blokir'))}>
              <span>Lama Waktu Pemblokiran Sementara</span>
              <span className="fw-bold bg-gray p-10">30 Menit</span>
            </div>
            <div className={cx(bem.e('list-blokir'))}>
              <span>Batas Blokir Sementara Untuk Blokir Permanen</span>
              <span className="fw-bold bg-gray p-10">2 Kali</span>
            </div>
            <div className={cx(bem.e('list-blokir'))}>
              <span>Batas waktu sejak login terakhir</span>
              <span className="fw-bold bg-gray p-10">1 Bulan</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CMSSecurity;
