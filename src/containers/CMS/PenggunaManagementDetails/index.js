import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { LeftChevron, Trash } from 'components/Icons';
import bn from 'utils/bemNames';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { getPenggunaLogs, penggunanDataDetailSelector, penggunanLogsSelector } from './reducer';
import CMSpenggunaForm, { submitpenggunaForm } from '../PenggunaManagement/CMSPenggunaForm';
import Notification from 'components/Notification';
import { put, deleteRequest } from 'utils/request';
import { apiUrls } from 'utils/constants';

const bem = bn('content-detail');

const CMSPenggunaManagementView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [editable, setEditable] = useState(true);
  const { records: penggunaDetailsData } = useSelector(penggunanDataDetailSelector);
  const [changeStatus, setChangeStatus] = useState('');
  const { records: logData } = useSelector(penggunanLogsSelector);

  useEffect(() => dispatch(getPenggunaLogs(id)), []);

  useEffect(() => {
    setChangeStatus(penggunaDetailsData?.status);
  }, [penggunaDetailsData]);

  const backToTable = () => {
    history.push('/cms/pengguna-management');
  };

  const StatusText = ({ statusClass, statusLabel }) => {
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className={`${statusClass} fw-bold justify-content-center align-items-center`}>{statusLabel}</Row>
      </div>
    );
  };
  const StatusBar = () => {
    switch (changeStatus) {
      case 'DRAFT':
        return <StatusText statusClass={'permintaan-data-form-terproses'} statusLabel={'Draft'} />;

      case 'ACTIVE':
        return <StatusText statusClass={'permintaan-data-form-success'} statusLabel={'Active'} />;

      case 'WAITING_APPROVAL':
        return <StatusText statusClass={'permintaan-data-form-success'} statusLabel={'Waiting Approval'} />;

      case 'REJECTED':
        return <StatusText statusClass={'permintaan-data-form-ditolak'} statusLabel={'Rejected'} />;

      case 'SUSPENDED':
        return <StatusText statusClass={'permintaan-data-form-terkirim'} statusLabel={'Suspended'} />;

      case 'INACTIVE':
        return <StatusText statusClass={'permintaan-data-form-terproses'} statusLabel={'Inactive'} />;
      default:
        return null;
    }
  };

  const editPengguna = (e) => {
    if (e.target.textContent === 'Edit') {
      setEditable(false);
    } else {
      history.push('/cms/pengguna-management');
    }
  };

  const batalPengguna = () => {
    setEditable(true);
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
      roles: data.roles,
    };

    try {
      const response = await put(`${apiUrls.penggunaManagement}/${data.id}`, editData);
      Notification.show({
        type: 'secondary',
        message: 'User Updated Successfully',
        icon: 'check',
      });
      setEditable(true);
      setChangeStatus(response.data.content.status);
    } catch (e) {
      Notification.show({
        type: 'warning',
        message: e.data.message,
        icon: 'cross',
      });
    }
  };

  const deletePengguna = async () => {
    try {
      await deleteRequest(`${apiUrls.penggunaManagement}/${id}`);
      Notification.show({
        type: 'secondary',
        message: 'User Deleted Successfully',
        icon: 'check',
      });
      history.push('/cms/pengguna-management');
    } catch (e) {
      Notification.show({
        type: 'warning',
        message: e.data.message,
        icon: 'cross',
      });
    }
  };

  return (
    <div className={bem.b()}>
      {changeStatus && <StatusBar />}
      <Row className={bem.e('section')}>
        <Col sm={9} className="my-5">
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Detail</div>
              <div>
                {editable ? (
                  <Button key="delete" variant="light" className="mr-16 br-4 bg-gray border-0 p-13" onClick={deletePengguna}>
                    <Trash />
                  </Button>
                ) : (
                  <Button
                    key="Batal"
                    variant="light"
                    className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40 py-13"
                    onClick={batalPengguna}>
                    Batal
                  </Button>
                )}
                <Button
                  key="edit"
                  variant="outline-light"
                  className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40 py-13"
                  onClick={editPengguna}>
                  {editable ? 'Edit' : 'Simpan'}
                </Button>
                <Button key="Kirim" variant="info" className="mr-16 br-4 px-40 py-13" onClick={submitpenggunaForm}>
                  Kirim
                </Button>
              </div>
            </div>
            <CMSpenggunaForm disabled={editable} data={id} onSubmit={submitData} />
          </div>
        </Col>
        <Col sm={3} className="my-5">
          {logData && (
            <LogStatus
              data={logData?.map((log) => {
                return {
                  status: log.data?.status,
                  createdAt: log.createdAt,
                  displayMessage: log.remark,
                };
              })}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};
export default CMSPenggunaManagementView;
