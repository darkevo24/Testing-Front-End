import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';
import CMSpenggunaForm, { submitpenggunaForm } from './CMSPenggunaForm';
import { post } from 'utils/request';
import { apiUrls } from 'utils/constants';
import Notification from 'components/Notification';

const bem = bn('content-create');

const TambahPengguna = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/cms/pengguna-management');
  };

  const submitData = async (userData) => {
    const addData = {
      ...userData,
      employeeStatus: userData.employeeStatus.value,
      instansi: { id: userData.instansi.value },
      unitKerja: { id: userData.unitKerja.value },
    };
    try {
      await post(apiUrls.penggunaManagement, addData);
      Notification.show({
        type: 'secondary',
        message: 'User Added Successfully',
        icon: 'check',
      });
      history.push('/cms/pengguna-management');
    } catch (err) {
      Notification.show({
        type: 'warning',
        message: err.data.message,
        icon: 'cross',
      });
    }
  };

  return (
    <div className={bem.b()}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Tambah Pengguna Baru
          <Button className={cx(bem.e('button'), 'ml-24')} variant="secondary" onClick={backToTable}>
            Batal
          </Button>
          <Button className={cx(bem.e('button'), 'ml-10')} variant="info" onClick={submitpenggunaForm}>
            Simpan
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSpenggunaForm onSubmit={submitData} />
      </div>
    </div>
  );
};

export default TambahPengguna;
