import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';
import PenggunaForm, { submitpenggunaForm } from './PenggunaForm.js';
import { post } from 'utils/request';
import { apiUrls } from 'utils/constants';
import Notification from 'components/Notification';
import styled from 'styled-components';
import moment from 'moment/moment.js';

const bem = bn('content-create');

const ButtonWrapper = styled.div`
  margin-bottom: 25px;
`;

const PenggunaBaru = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/managemen-pengguna');
  };

  const submitData = async (userData) => {
    const addData = {
      ...userData,
      employeeStatus: userData.employeeStatus.value,
      instansi: { id: userData.instansi },
      unitKerja: { id: userData.unitKerja.value },
      roles: userData.roles.label,
      startActiveDate: moment(userData.startActiveDate).format('YYYY-MM-DD'),
      endActiveDate: moment(userData.endActiveDate).format('YYYY-MM-DD'),
    };
    try {
      await post(apiUrls.penggunaManagement, addData);
      Notification.show({
        type: 'secondary',
        message: 'User Added Successfully',
        icon: 'check',
      });
      history.push('/managemen-pengguna');
    } catch (err) {
      Notification.show({
        type: 'warning',
        message: err.data.message,
        icon: 'cross',
      });
    }
  };

  return (
    <div className="d-flex row mt-32 justify-content-center">
      <div className="col-lg-6 mr-20">
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Tambah Pengguna Baru</div>
        <ButtonWrapper>
          <Button className={cx(bem.e('button'), 'w-20')} variant="secondary" onClick={backToTable}>
            Batal
          </Button>
          <Button className={cx(bem.e('button'), 'ml-15')} variant="info" onClick={submitpenggunaForm}>
            Simpan
          </Button>
        </ButtonWrapper>
        <PenggunaForm onSubmit={submitData} />
      </div>
    </div>
  );
};

export default PenggunaBaru;
