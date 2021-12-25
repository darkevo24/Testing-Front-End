import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { ReadOnlyInputs } from 'components';
import { FilledSquareSvg, LeftChevron, Trash } from 'components/Icons';
import { CMSModal } from 'components/CMSStatusModals';
import { getStatusClass, prefixID } from 'utils/helper';
import { apiUrls, deleteRequest, put } from 'utils/request';
import RowLoader from 'components/Loader/RowLoader';
import { jadwalPermutakhiranOptions } from '../../../../utils/constants';
// import DataVariableTable from 'containers/DataVariable/DataVariableTable';

export const DaftarDetailPage = ({ ...props }) => {
  const [showModal, setModal] = useState('');
  const [loader, setLoader] = useState(false);
  const [apiError, setAPIError] = useState('');

  const { loading, result, error } = props.dafterDataWithId;
  const { loading: logLoading, record: logRecord } = props.dafterLogDataWithId;

  const history = useHistory();
  const { id } = useParams();

  const goBack = () => {
    history.push('/cms/daftar');
  };

  useEffect(() => {
    if (!id) goBack();
    initialCall();
  }, []);

  const initialCall = () => {
    props.getDafterDataById(id);
  };

  const onDelete = async () => {
    setLoader(true);
    try {
      await deleteRequest(`${apiUrls.katalogData}/${id}`);
      history.push('/cms/daftar');
    } catch (e) {
      setAPIError(e.message);
      handleCloseModal();
    }
  };

  const onVerifikansi = async () => {
    setLoader(true);
    try {
      await put(`${apiUrls.katalogData}/${id}/verifikasi`, { status: 1, note: '' });
      initialCall();
      handleCloseModal();
    } catch (e) {
      setAPIError(e.message);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setLoader(false);
    setModal('');
  };

  const list = [
    {
      label: 'Instansi',
      value: result?.instansi || '',
    },
    {
      label: 'Nama Data',
      value: result?.nama || '',
    },
    {
      label: 'ID Konsep',
      value: result?.idKonsep || '',
    },
    {
      label: 'Jadwal Pemutakhiran',
      value: jadwalPermutakhiranOptions?.[result?.jadwalPemutakhiran]?.label || '',
    },
    {
      label: 'Definisi',
      value: result?.definisi || '',
      rows: 3,
      as: 'textarea',
    },
    {
      label: 'Sumber Definisi',
      value: result?.sumberDefinisi || '',
      rows: 3,
      as: 'textarea',
    },
    {
      label: 'Dibuat',
      value: moment(result?.tanggalDibuat).format('DD-MM-YYYY'),
      leftIcon: 'calender',
    },
    {
      label: 'Diperbarui',
      value: moment(result?.tanggalDiperbaharui).format('DD-MM-YYYY'),
      leftIcon: 'calender',
    },
    {
      label: 'Produsen Data',
      value: result?.produsenData || '',
    },
    {
      label: 'Data Induk',
      value: result?.indukData?.nama || '',
    },
    {
      label: 'Format',
      value: result?.format || '',
    },
    {
      label: 'Link Akses',
      value: result?.linkAkses || '',
      rightIcon: 'copy',
    },
    {
      label: 'Pilar SDGs',
      value: result?.kodePilarDeskripsi || '',
    },
    {
      label: 'Tujuan SDGs',
      value: result?.kodeTujuanDeskripsi || '',
    },
    {
      label: 'PN RKP',
      value: result?.kodePNRKPDeskripsi || '',
    },
    {
      label: 'PP RKP',
      value: result?.kodePPRKPDeskripsi || '',
    },
  ];

  const isEnable = result?.kodePNRKP || result?.kodePPRKP || result?.kodeTujuan || result?.kodePilar;
  return (
    <div className="sdp-dafter-data-container">
      <div className="d-flex">
        <Button variant="light" className="bg-white border-gray-stroke" onClick={goBack}>
          <LeftChevron variant="gray" />
        </Button>
        <div className={'br-2 p-12 flex-grow-1 flex-center bg-orange-light'}>
          <span className="fs-14 lh-17 sdp-text-orange">Unverified</span>
        </div>
      </div>
      <Row className="mt-40">
        <Col xs={12} md={7} className="ml-184">
          <div className="d-flex align-items-center justify-content-between">
            <label className="fw-bold fs-24 lh-29 p-32">Detail</label>
            {!loading && (
              <div className="d-flex">
                <Button
                  key="delete"
                  variant="light"
                  className="mr-16 br-4 bg-gray border-0 p-13"
                  onClick={() => setModal('delete')}>
                  <Trash />
                </Button>
                <Button
                  key="edit"
                  variant="outline-light"
                  className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40 py-13"
                  onClick={() => history.push(`/cms/daftar/manage-dafter-data/${result.id}`)}>
                  Ubah
                </Button>
                <Button
                  variant=""
                  key="prioritis"
                  disabled={true}
                  className={cx('mr-16 br-4 pr-40 py-13 border-gray-stroke flex-item-center', {
                    'sdp-text-blue': isEnable,
                    'sdp-text-disable': !isEnable,
                  })}>
                  <FilledSquareSvg variant={isEnable ? 'blue' : 'stroke'} />
                  <label className="ml-10">Prioritis</label>
                </Button>
                <Button
                  key="verifikansi"
                  variant={''}
                  className={cx('mr-16 br-4 pr-40 py-13 border-gray-stroke flex-item-center', {
                    'sdp-text-blue': false,
                    'sdp-text-disable': true,
                  })}
                  disabled={!isEnable}
                  onClick={() => setModal('verifikansi')}>
                  <FilledSquareSvg variant={false ? 'blue' : 'stroke'} />
                  <label className="ml-10">Verifikansi</label>
                </Button>
              </div>
            )}
          </div>
          <div className="mb-3 px-24 pb-100">
            {apiError || error ? <label className="sdp-error mb-20">{apiError || error}</label> : null}
            {list.map((item) =>
              loading ? <RowLoader /> : <ReadOnlyInputs group labelClass="sdp-form-label fw-normal" type="text" {...item} />,
            )}
          </div>
        </Col>
        <Col xs={4} md={2} className="">
          <label className="fs-20 lh-25 pt-32 fw-bold">Log Status</label>
          <div className="d-flex flex-column mt-24">
            {logLoading ? (
              <RowLoader />
            ) : (
              (logRecord || []).map((item) => {
                const status = (item?.data?.status || '').toLowerCase();
                const classDetail = getStatusClass(status);
                return (
                  <div className="mb-24">
                    <div className="d-flex align-items-center">
                      <span className="fs-14 lh-17 sdp-text-black-dark w-100">
                        {moment(item.createdAt).format('DD MMMM YYYY')}
                      </span>
                      <div className="border-gray-stroke h-0 w-100" />
                    </div>
                    <div className="d-flex mt-12 ">
                      <div className={`br-2 py-4 px-6 mr-8 h-fit-content ${classDetail?.divBG || ''}`}>
                        <span className={`fs-14 lh-17 ${classDetail?.textColor || ''}`}>
                          {classDetail?.text || item.data.status}
                        </span>
                      </div>
                      <span className="sdp-text-disable">{item.remark}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Col>
      </Row>
      <div className="border-bottom" />
      {/*<DataVariableTable cms cmsDetail />*/}
      {showModal === 'verifikansi' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">membatalkan</span> verifikasi Daftar Data <b>UMKM</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onVerifikansi}
        />
      )}
      {showModal === 'delete' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-error">menghapus</span> Daftar Data{' '}
              <b>{prefixID(result.id, 'DD')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onDelete}
        />
      )}
    </div>
  );
};
