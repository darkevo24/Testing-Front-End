import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import CMSStrukturForm, { submitStrukturForm } from './Form.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStrukturOrganisasiById,
  getStrukturOrganisasiLogs,
  detailDataSelector,
  logDatasetSelector,
  setStrukturOrganisasi,
  updateStatus,
} from './reducer';

import { Loader } from 'components';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';
import Notification from 'components/Notification';
import { STATUS_DATA } from 'utils/constants';

const bem = bn('content-detail');

const CMSStrukturDetail = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const { loading: logLoading, record: logRecord } = useSelector(logDatasetSelector);
  const [bidang, setBidang] = useState(null);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id) => {
    dispatch(getStrukturOrganisasiById(id));
    dispatch(getStrukturOrganisasiLogs(id));
  };

  const simpanData = () => {
    submitStrukturForm();
  };

  const archiveData = () => {
    updateData('arsipkan');
  };

  const tolakData = () => {
    updateData('tolak');
  };

  const setujuiData = () => {
    updateData('setujui');
  };

  const updateData = (action) => {
    dispatch(updateStatus({ id: id, action: action })).then((res) => {
      res?.payload
        ? Notification.show({
            type: 'secondary',
            message: (
              <div>
                Berita <span className="fw-bold">{res.payload.content.judul}</span> Berhasil Ditambahkan
              </div>
            ),
            icon: 'check',
            onClose: history.goBack(),
          })
        : Notification.show({
            message: (
              <div>
                Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
              </div>
            ),
            icon: 'cross',
          });
    });
  };

  useEffect(() => {
    if (bidang !== null) {
      dispatch(setStrukturOrganisasi({ id: id, payload: bidang })).then((res) => {
        res?.payload
          ? Notification.show({
              type: 'secondary',
              message: (
                <div>
                  Berita <span className="fw-bold">{res.payload.content.judul}</span> Berhasil Ditambahkan
                </div>
              ),
              icon: 'check',
              onClose: history.goBack(),
            })
          : Notification.show({
              message: (
                <div>
                  Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
                </div>
              ),
              icon: 'cross',
            });
      });
    }
  }, [bidang]);

  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-24">
            <div className={bem.e('title')}>Bidang Detail</div>
            {record?.status === STATUS_DATA.draft || record?.status === STATUS_DATA.rejected ? (
              <div>
                <Button onClick={archiveData} variant="secondary">
                  <DeleteIcon />
                </Button>
                <Button
                  onClick={() => history.goBack()}
                  className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke"
                  variant="secondary"
                  style={{ width: '112px' }}>
                  Batal
                </Button>
                <Button onClick={simpanData} className="ml-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            ) : record?.status === STATUS_DATA.waitingApproval ? (
              <div>
                <Button
                  onClick={tolakData}
                  className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke"
                  variant="secondary"
                  style={{ width: '112px' }}>
                  Totak
                </Button>
                <Button onClick={setujuiData} className="ml-10" variant="info" style={{ width: '112px' }}>
                  Setujui
                </Button>
              </div>
            ) : null}
          </div>
          {!loading ? (
            <CMSStrukturForm
              dataValue={record}
              handleData={setBidang}
              idBidang={id}
              disabled={record?.status !== STATUS_DATA.draft && record?.status !== STATUS_DATA.rejected}
            />
          ) : null}
        </div>
      </Col>
      <Col sm={3}>{logLoading ? null : <LogStatus data={logRecord} />}</Col>
      {(loading || logLoading) && <Loader fullscreen={true} />}
    </Row>
  );
};

export default CMSStrukturDetail;
