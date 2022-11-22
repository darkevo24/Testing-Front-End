import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Notification from 'components/Notification';
import LogStatus from './LogStatus';
import bn from 'utils/bemNames';
import { apiUrls } from 'utils/constants';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { put } from 'utils/request';
import PenggunaForm, { submitpenggunaForm } from './PenggunaForm';
import moment from 'moment/moment.js';
import { getPenggunaDetails, getPenggunaLogs, penggunanDataDetailSelector, penggunanLogsSelector } from './reducer';
import styled from 'styled-components';
import { date } from 'yup/lib/locale';

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const PenggunaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [editable, setEditable] = useState(true);
  //   const [notes, setNotes] = useState('');
  //   const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);
  const { records: penggunaDetailsData } = useSelector(penggunanDataDetailSelector);
  //   const [changeStatus, setChangeStatus] = useState('');
  const { records: logData } = useSelector(penggunanLogsSelector);
  //   const user = useSelector(userSelector);
  //   const isRecordCreator = penggunaDetailsData?.createdBy?.id === user.id;

  useEffect(() => {
    dispatch(getPenggunaLogs(id));
  }, [id]);

  const fetchPenggunanData = (id) => {
    dispatch(getPenggunaLogs(id));
    dispatch(getPenggunaDetails(id));
  };

  const submitData = async (data) => {
    const editData = {
      employeeIdNumber: data.employeeIdNumber,
      employeeStatus: data.employeeStatus.value,
      name: data.name,
      email: data.email,
      phoneArea: data.phoneArea,
      phoneNumber: data.phoneNumber,
      supervisorName: data.supervisorName,
      officialMemo: data.officialMemo,
      instansi: {
        id: data.instansi.id ? data.instansi.id : data.instansi.value,
      },
      unitKerja: {
        id: data.unitKerja.value,
      },
      roles: data.roles.value,
      startActiveDate: data.startActiveDate,
      endActiveDate: data.endActiveDate,
    };
    try {
      const response = await put(`${apiUrls.penggunaManagement}/${data.id}`, editData);
      Notification.show({
        type: 'secondary',
        message: 'User Updated Successfully',
        icon: 'check',
      });
      setEditable(true);
    } catch (e) {
      Notification.show({
        type: 'warning',
        message: e.data.message,
        icon: 'cross',
      });
    }
  };

  return (
    <div className="d-flex row mt-32 justify-content-center">
      <div className="col-lg-6 mr-20">
        <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
          <span style={{ color: 'gray' }}>{penggunaDetailsData.name}</span> - {penggunaDetailsData.roles}
          <div>
            {!editable ? (
              <>
                <Button
                  key="Batal"
                  variant="light"
                  className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40 py-13"
                  onClick={() => setEditable(false)}>
                  Batal
                </Button>
                <Button variant="info" className="mr-16 br-4 px-40 py-13" onClick={submitpenggunaForm}>
                  Simpan
                </Button>
              </>
            ) : (
              <Button variant="outline-light" onClick={() => setEditable(false)}>
                <Edit />
              </Button>
            )}
          </div>
        </div>
        <PenggunaForm disabled={editable} data={id} onSubmit={submitData} onStatusChange={() => fetchPenggunanData(id)} />
      </div>
      <div className="col-lg-2">
        <Title>Log Status</Title>{' '}
        {logData.length > 0 ? (
          logData.map((log) => <LogStatus log={log} key={log.id} />)
        ) : (
          <div className="mt-15">Log Status Tidak Ada</div>
        )}
      </div>
    </div>
  );
};
export default PenggunaDetail;
