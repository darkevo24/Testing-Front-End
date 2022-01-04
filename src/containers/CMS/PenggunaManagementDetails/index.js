import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { LeftChevron, Trash } from 'components/Icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import bn from 'utils/bemNames';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { useDispatch, useSelector } from 'react-redux';
import { getPenggunaLogs, penggunanLogsSelector } from './reducer';
import CMSpenggunaForm from '../PenggunaManagement/CMSPenggunaForm';

const bem = bn('content-detail');

const CMSPenggunaManagementView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(true);
  const history = useHistory();
  const backToTable = () => {
    history.push('/cms/pengguna-management');
  };

  useEffect(() => dispatch(getPenggunaLogs(id)), []);

  const { records: logData } = useSelector(penggunanLogsSelector);

  const DraftText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">Draft</Row>
      </div>
    );
  };

  const StatusBar = () => {
    return <DraftText />;
  };

  const editPengguna = () => {
    setEditable(false);
  };

  const batalPengguna = () => {
    setEditable(true);
  };
  return (
    <div className={bem.e('cms-permintaan-data')}>
      <StatusBar />
      <Row className={bem.e('section')}>
        <Col sm={9} className="my-5">
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Detail</div>
              <div>
                {editable ? (
                  <Button key="delete" variant="light" className="mr-16 br-4 bg-gray border-0 p-13">
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
                  Edit
                </Button>
                <Button key="Kirim" variant="info" className="mr-16 br-4 px-40 py-13">
                  Kirim
                </Button>
              </div>
            </div>
            <CMSpenggunaForm disabled={editable} data={id} />
          </div>
        </Col>
        <Col sm={3} className="my-5">
          {logData && (
            <LogStatus
              data={logData?.map((log) => {
                return {
                  status: log.data.status,
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
