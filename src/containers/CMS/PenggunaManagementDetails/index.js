import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, FormControl } from 'react-bootstrap';
import cx from 'classnames';
import { LeftChevron, Trash } from 'components/Icons';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { userSelector } from 'containers/Login/reducer';
import bn from 'utils/bemNames';
import { apiUrls } from 'utils/constants';
import { penggunaStatuses } from 'utils/helper';
import { post, put, deleteRequest } from 'utils/request';
import CMSpenggunaForm, { submitpenggunaForm } from '../PenggunaManagement/CMSPenggunaForm';
import { getPenggunaDetails, getPenggunaLogs, penggunanDataDetailSelector, penggunanLogsSelector } from './reducer';

const bem = bn('content-detail');
const maxNotesLength = 140;

const CMSPenggunaManagementView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [editable, setEditable] = useState(true);
  const [notes, setNotes] = useState('');
  const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);
  const { records: penggunaDetailsData } = useSelector(penggunanDataDetailSelector);
  const [changeStatus, setChangeStatus] = useState('');
  const { records: logData } = useSelector(penggunanLogsSelector);
  const user = useSelector(userSelector);
  const isRecordCreator = penggunaDetailsData?.createdBy?.id === user.id;

  const fetchPenggunanData = (id) => {
    dispatch(getPenggunaLogs(id));
    dispatch(getPenggunaDetails(id));
  };

  useEffect(() => dispatch(getPenggunaLogs(id)), []);

  useEffect(() => {
    setChangeStatus(penggunaDetailsData?.status);
  }, [penggunaDetailsData]);

  const backToTable = () => {
    history.push('/cms/pengguna-management');
  };

  const showNotesModal = () => {
    setIsNotesModalVisible(true);
  };

  const hideNotesModal = () => {
    setIsNotesModalVisible(false);
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
      case penggunaStatuses.draft:
        return <StatusText statusClass={'permintaan-data-form-terproses'} statusLabel={'Draft'} />;

      case penggunaStatuses.active:
        return <StatusText statusClass={'permintaan-data-form-success'} statusLabel={'Active'} />;

      case penggunaStatuses.waitingApproval:
        return <StatusText statusClass={'permintaan-data-form-success'} statusLabel={'Waiting Approval'} />;

      case penggunaStatuses.rejected:
        return <StatusText statusClass={'permintaan-data-form-ditolak'} statusLabel={'Rejected'} />;

      case penggunaStatuses.suspended:
        return <StatusText statusClass={'permintaan-data-form-terkirim'} statusLabel={'Suspended'} />;

      case penggunaStatuses.inactive:
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

  const updateRecordRequest = async ({ request, url, data, successMessage, errorMessage }) => {
    try {
      const response = await request(url, data);
      Notification.show({
        type: 'secondary',
        message: successMessage,
        icon: 'check',
      });
      fetchPenggunanData(id);
      return response;
    } catch (e) {
      Notification.show({
        type: 'warning',
        message: errorMessage || e.data.message,
        icon: 'cross',
      });
    }
  };

  const sendApprovalRequest = async () => {
    updateRecordRequest({
      request: post,
      url: `${apiUrls.penggunaManagement}/${id}/kirim`,
      data: { notes: '' },
      successMessage: 'User Approval Sent Successfully',
    });
  };

  const sendSetujuiRequest = async () => {
    updateRecordRequest({
      request: post,
      url: `${apiUrls.penggunaManagement}/${id}/setujui`,
      data: { notes: '' },
      successMessage: 'Setujui request Sent Successfully',
    });
  };

  const sendTolakRequest = async (data) => {
    return updateRecordRequest({
      request: post,
      url: `${apiUrls.penggunaManagement}/${id}/tolak`,
      data,
      successMessage: 'Tolak request Sent Successfully',
    });
  };

  const onTolakRequest = async () => {
    const response = await sendTolakRequest({ note: notes });
    if (response?.data?.status === 'SUCCESS') {
      setNotes('');
      hideNotesModal();
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
                  onClick={editable ? editPengguna : submitpenggunaForm}>
                  {editable ? 'Edit' : 'Simpan'}
                </Button>
                {changeStatus === penggunaStatuses.draft && (
                  <Button key="Kirim" variant="info" className="mr-16 br-4 px-40 py-13" onClick={sendApprovalRequest}>
                    Kirim
                  </Button>
                )}
                {isRecordCreator && changeStatus === penggunaStatuses.waitingApproval && (
                  <>
                    {/* Approve */}
                    <Button key="Setujui" variant="info" className="mr-16 br-4 px-40 py-13" onClick={sendSetujuiRequest}>
                      Setujui
                    </Button>
                    {/* Reject */}
                    <Button key="Kirim" variant="info" className="mr-16 br-4 px-40 py-13" onClick={showNotesModal}>
                      Tolak
                    </Button>
                  </>
                )}
              </div>
            </div>
            <CMSpenggunaForm
              disabled={editable}
              data={id}
              onSubmit={submitData}
              onStatusChange={() => fetchPenggunanData(id)}
            />
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
      <Modal centered showHeader={false} visible={isNotesModalVisible}>
        <div className="fs-16 mt-16">
          <span className="fw-bold sdp-text-blue">Tokal</span> data Pengguna?
        </div>
        <div className="position-relative">
          <FormControl
            className="my-24 pb-24"
            as="textarea"
            placeholder="Tulis Catatan"
            maxLength={maxNotesLength}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span className="ta-length-counter">
            {notes.length}/{maxNotesLength}
          </span>
        </div>
        <div className={cx(bem.e('notes-footer'), 'mt-50', 'text-end', 'mb-8')}>
          <Button variant="secondary" className="px-32" onClick={hideNotesModal}>
            Batal
          </Button>
          <Button variant="info" className="ml-8 px-24" onClick={onTolakRequest}>
            Konfirmasi
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default CMSPenggunaManagementView;
