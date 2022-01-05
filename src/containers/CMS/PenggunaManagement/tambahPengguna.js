import React from 'react';
import { Button } from 'react-bootstrap';
import bn from 'utils/bemNames';
import cx from 'classnames';
import CMSpenggunaForm, { submitpenggunaForm } from './CMSPenggunaForm';
import { post } from 'utils/request';
import { apiUrls } from 'utils/constants';
import Notification from 'components/Notification';

const bem = bn('content-create');

const TambahPengguna = () => {
  const submitData = async (userData) => {
    const addData = {
      ...userData,
      employeeStatus: userData.employeeStatus.value,
      instansi: { id: userData.instansi.value },
      unitKerja: { id: userData.unitKerja.value },
    };
    try {
      const response = await post(apiUrls.penggunaManagement, addData);
      if (response.data.status === 'FAILED') {
        Notification.show({
          type: 'warning',
          message: `${response.data.message}`,
          icon: 'cross',
        });
      } else {
        Notification.show({
          type: 'secondary',
          message: 'User Added Successfully',
          icon: 'check',
        });
      }
    } catch (err) {
      Notification.show({
        type: 'warning',
        message: 'Something went wrong',
        icon: 'cross',
      });
    }
  };

  return (
    <div className={bem.b()}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Tambah Pengguna Baru
          <Button className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={submitpenggunaForm}>
            Kirim
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
