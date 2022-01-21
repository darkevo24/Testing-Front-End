import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isFunction from 'lodash/isFunction';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import bn from 'utils/bemNames';
import { apiUrls, put } from 'utils/request';
import { getListConfigSecurity, getListValues, configSecurityListSelector, configListValueSelector } from './reducer';
import { Modal, Notification } from 'components';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import cx from 'classnames';

const bem = bn('content-create');

const CMSSecurityEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { configResult, configLoading } = useSelector(configSecurityListSelector);
  const { valueResult, valueLoading } = useSelector(configListValueSelector);

  const [loading, setLoading] = useState(false);
  const [paramsValue, setParamsValue] = useState('');
  const [showModal, setShowModal] = useState('');
  const [valueBlokir, setValueBlokir] = useState('');
  const [valueBatasBlokir, setValueBatasBlokir] = useState('');
  const [typeBlokir, setTypeBlokir] = useState('');
  const [typeBatasBlokir, setTypeBatasBlokir] = useState('');

  const initialCall = () => {
    dispatch(getListConfigSecurity());
  };

  useEffect(() => {
    initialCall();
  }, []);

  useEffect(() => {
    if (paramsValue) return dispatch(getListValues(paramsValue));
  }, [paramsValue]);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', message, 'check');
      initialCall();
      isFunction(callBack) && callBack();
      setLoading(false);
    } catch (e) {
      handleNotification('secondary', e?.data?.message, 'cross');
      handleCloseModal();
      setLoading(false);
    }
  };

  const handleConfigValue = (params, index) => {
    switch (index) {
      case 0:
        setValueBlokir(params);
        break;
      case 1:
        setValueBatasBlokir(params);
        break;
      default:
        return null;
    }
  };

  const handleConfigType = (params) => {
    switch (params) {
      case 'Menit':
        setTypeBlokir(params);
        setParamsValue('menit');
        break;
      case 'Jam':
        setTypeBlokir(params);
        setParamsValue('jam');
        break;
      case 'Hari':
        setTypeBlokir(params);
        setParamsValue('hari');
        break;
      case 'Kali':
        setTypeBatasBlokir(params);
        setParamsValue('kali');
        break;
      default:
        return null;
    }
  };

  const listDurationValue = valueResult.map((data) => ({ value: data, label: data }));

  const handleCloseModal = () => {
    setShowModal('');
  };

  const onSubmit = () => {
    handleAPICall(
      put,
      apiUrls.cmsConfigSecurity,
      {
        data: {
          data: [
            {
              title: 'Pemblokiran Akun',
              content: configResult.map((data, index) => {
                if (index === 0) {
                  return {
                    ...data,
                    value: valueBlokir ? valueBlokir : data.value,
                    unit: typeBlokir ? typeBlokir : data.unit,
                  };
                }
                return {
                  ...data,
                  value: valueBatasBlokir ? valueBatasBlokir : data.value,
                  unit: typeBatasBlokir ? typeBatasBlokir : data.unit,
                };
              }),
            },
          ],
        },
      },
      'Perubahan sekuriti telah berhasil disimpan',
    );
  };

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
            {configResult
              ? configResult.map((data, index) => (
                  <Row className="align-items-center mb-20" key={index}>
                    <Col md={6}>
                      <span>{data.label}</span>
                    </Col>
                    <Col md={3}>
                      <SingleDropDown
                        className="mr-10 w-100"
                        placeHolder={data.value}
                        data={
                          paramsValue
                            ? [...listDurationValue]
                            : data.listOfValue.map((data) => ({
                                value: data,
                                label: data,
                              }))
                        }
                        onChange={(selected) => handleConfigValue(selected.value, index)}
                      />
                    </Col>
                    <Col md={3}>
                      <SingleDropDown
                        className="mr-10 w-100"
                        placeHolder={data.unit}
                        data={data.listOfType.map((data) => ({
                          value: data,
                          label: data,
                        }))}
                        onChange={(selected) => handleConfigType(selected.value)}
                      />
                    </Col>
                  </Row>
                ))
              : 'Tidak Ada Data'}
          </Col>
        </Row>
      </div>
      {showModal === 'submit' && (
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" title="Tambah Pembicari Baru" visible={showModal}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue"> menyimpan </span>
              perubahan sekuriti ?
            </p>
          </div>
          <div className="d-flex justify-content-end mt-20">
            <Button className="mr-10 px-35" variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button type="submit" className="ml-10 px-35" variant="info" onClick={onSubmit}>
              Konfirmasi
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CMSSecurityEdit;
