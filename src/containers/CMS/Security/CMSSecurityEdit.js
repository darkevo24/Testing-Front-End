import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import bn from 'utils/bemNames';
import { getListConfigSecurity, configSecurityListSelector } from './reducer';
import { Modal } from 'components';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import cx from 'classnames';

const bem = bn('content-create');

const CMSSecurityEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const configResult = useSelector(configSecurityListSelector);

  const [showModal, setShowModal] = useState('');
  const [duration, setDuration] = useState([]);

  const initialCall = () => {
    dispatch(getListConfigSecurity());
  };

  useEffect(() => {
    initialCall();
  }, []);

  console.log(configResult);

  const typeValue = [
    {
      status: 'Menit',
    },
    {
      status: 'Jam',
    },
    {
      status: 'Hari',
    },
  ];

  const valueBlockPermanen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleBlokirSementara = (params) => {
    if (!params) {
      setDuration([]);
    }

    if (params === 'Menit') {
      const array = Array.from({ length: 59 }, (_, index) => index + 1);
      setDuration(array);
    }

    if (params === 'Jam') {
      const array = Array.from({ length: 23 }, (_, index) => index + 1);
      setDuration(array);
    }

    if (params === 'Hari') {
      const array = Array.from({ length: 30 }, (_, index) => index + 1);
      setDuration(array);
    }
  };

  const listStatus = typeValue.map((data) => ({ value: data.status, label: data.status }));
  const listDuration = duration.map((data) => ({ value: data, label: data }));
  const listBlockPermanent = valueBlockPermanen.map((data) => ({ value: data, label: data }));

  const handleCloseModal = () => {
    setShowModal('');
  };

  const onSubmitSecurity = () => {};

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-20')}>
          Sekuriti
          <Button onClick={() => history.goBack()} className="ml-24 px-35" variant="secondary">
            Batal
          </Button>
          <Button className="ml-10 px-35" variant="info" onClick={() => setShowModal('submit')}>
            Simpan
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <Row className="justify-content-between">
          <Col xs={8}>
            <Row className="align-items-center mb-20">
              <Col md={6}>
                <span>Lama Waktu Pemblokiran Sementara</span>
              </Col>
              <Col md={3}>
                <SingleDropDown
                  className="mr-10 w-100"
                  placeHolder="Pilih Durasi"
                  data={[{ value: '', label: 'Pilih Durasi' }, ...listDuration]}
                  // onChange={(selected) => setStatus(selected.value)}
                />
              </Col>
              <Col md={3}>
                <SingleDropDown
                  className="mr-10 w-100"
                  placeHolder="Pilih Tipe"
                  data={[{ value: '', label: 'Pilih Tipe' }, ...listStatus]}
                  onChange={(selected) => handleBlokirSementara(selected.value)}
                />
              </Col>
            </Row>
            <Row className="align-items-center mb-20">
              <Col md={6}>
                <span>Batas Blokir Sementara Untuk Blokir Permanen</span>
              </Col>
              <Col md={3}>
                <SingleDropDown
                  className="mr-10 w-100"
                  placeHolder="Pilih Durasi"
                  data={[{ value: '', label: 'Pilih Durasi' }, ...listBlockPermanent]}
                  // onChange={(selected) => setStatus(selected.value)}
                />
              </Col>
              <Col md={3}>
                <span>Kali</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {showModal === 'submit' && (
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" title="Tambah Pembicari Baru" visible={showModal}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue"> Menyimpan </span>
              Perubahan sekuriti ?
            </p>
          </div>
          <div className="d-flex justify-content-end mt-20">
            <Button className="mr-10 px-35" variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button type="submit" className="ml-10 px-35" variant="info">
              Konfirmasi
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CMSSecurityEdit;
