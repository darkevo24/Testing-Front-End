import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { ReadOnlyInputs } from 'components';
import { FilledSquareSvg, LeftChevron, Trash } from 'components/Icons';
import { CMSModal } from 'components/CMSStatusModals';
// import Notification from 'components/Notification';
import RowLoader from 'components/Loader/RowLoader';
import DataVariable from 'containers/DataVariable';
import { getStatusClass, prefixID } from 'utils/helper';
import { apiUrls, deleteRequest, put } from 'utils/request';
import { jadwalPermutakhiranOptions } from 'utils/constants';
import { resetDaftarData } from 'containers/Daftar/reducer';

export const DaftarDetailPage = ({ ...props }) => {
  const [showModal, setModal] = useState('');
  const [loader, setLoader] = useState(false);
  const [apiError, setAPIError] = useState('');
  const { dataindukAllOptions } = props;
  const { loading, result, error } = props.dafterDataWithId;
  const { result: attributDinamis } = props.attributDinamis;
  const { loading: logLoading, result: logRecord } = props.dafterLogDataWithId;
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const goBack = () => {
    history.push('/cms/daftar');
  };

  useEffect(() => {
    if (id) initialCall();
    return () => {
      dispatch(resetDaftarData());
    };
  }, []);

  useEffect(() => {
    if (id && error) {
      goBack();
      // TODO: DISCUSS HOW TO HANDLE THIS
      // Notification.show({
      //   type: 'secondary',
      //   message: (
      //     <div>
      //       <span className="fw-bold">Data Not Found</span>
      //     </div>
      //   ),
      //   icon: 'cross',
      // });
    }
  }, [error]);

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
      await put(`${apiUrls.katalogData}/${id}/verifikasi`, { status: result?.status === 1 ? 0 : 1, note: '' });
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
  const rujukanDataStr = result?.rujukan ? result.rujukan : '[21,22]';
  const rujukanDataArr = JSON.parse(rujukanDataStr);
  const rujukan = dataindukAllOptions
    .map((val) => {
      for (let i = 0; i < rujukanDataArr.length; i++) {
        if (val.value == rujukanDataArr[i]) return { ...val, toString: () => val.label };
      }
    })
    .filter(Boolean);

  const [list, setList] = useState([]);

  useEffect(() => {
    const additionalData = result && JSON.parse(result?.additionalData);
    const attributList =
      attributDinamis?.map((element) => {
        return {
          label: element.name,
          value: additionalData?.filter((elm) => elm.key === element.name)[0].value || '',
          as: element.type === 'textarea' ? 'textarea' : 'input',
          rows: element.type === 'textarea' ? 3 : 200,
        };
      }) || [];
    setList([
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
        value: Object.values(result?.indukData || {})?.[0] || '',
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
      {
        label: 'Rujukan',
        value: rujukan.join(', ') || '',
      },
      ...attributList,
    ]);
  }, [attributDinamis, result, loading]);

  const isEnable = result?.kodePNRKP || result?.kodePPRKP || result?.kodeTujuan || result?.kodePilar;
  const isVerified = result?.status === 1;
  return (
    <div className="sdp-dafter-data-container">
      <div className="d-flex">
        <Button variant="light" className="bg-white border-gray-stroke" onClick={goBack}>
          <LeftChevron variant="gray" />
        </Button>
        <div
          className={cx('br-2 p-12 flex-grow-1 flex-center', {
            'bg-orange-light': !isVerified,
            'bg-green-light': isVerified,
          })}>
          <span
            className={cx('fs-14 lh-17', {
              'sdp-text-orange': !isVerified,
              'sdp-text-green': isVerified,
            })}>
            {!isVerified ? 'Unverified' : 'Verified'}
          </span>
        </div>
      </div>
      <Row className="mt-40 justify-content-md-center">
        <Col xs={12} md={7}>
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
                  className={cx('mr-16 br-4 pr-40 py-13 border-gray-stroke flex-item-center', {
                    'sdp-text-blue': isEnable,
                    'sdp-text-disable': !isEnable,
                  })}>
                  <FilledSquareSvg variant={isEnable ? 'blue' : 'stroke'} />
                  <label className="ml-10">Prioritis</label>
                </Button>
                <Button
                  key="verifikansi"
                  variant=""
                  className={cx('mr-16 br-4 pr-40 py-13 border-gray-stroke flex-item-center', {
                    'sdp-text-blue': result?.status,
                    'sdp-text-disable': !result?.status || !isEnable,
                  })}
                  disabled={!isEnable}
                  onClick={() => setModal('verifikansi')}>
                  <FilledSquareSvg variant={result?.status ? 'blue' : 'stroke'} />
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
                const status = (item?.status || '').toLowerCase();
                const classDetail = getStatusClass(status);
                return (
                  <div className="mb-24">
                    <div className="d-flex align-items-center">
                      <span className="fs-14 lh-17 sdp-text-black-dark w-100">
                        {!item?.createdAt ? null : moment(item.createdAt).format('DD MMMM YYYY')}
                      </span>
                      <div className="border-gray-stroke h-0 w-100" />
                    </div>
                    <div className="d-flex mt-12 ">
                      <div className={`br-2 py-4 px-6 mr-8 h-fit-content ${classDetail?.divBG || ''}`}>
                        <span className={`fs-14 lh-17 ${classDetail?.textColor || ''}`}>
                          {classDetail?.text || item?.status || ''}
                        </span>
                      </div>
                      <span className="sdp-text-disable">{item?.displayMessage || ''}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Col>
      </Row>
      <div className="border-bottom" />
      <DataVariable cms cmsDetail id={id} />
      {showModal === 'verifikansi' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin{' '}
              <span
                className={cx({
                  'sdp-text-blue': !result?.status,
                  'sdp-error': result?.status,
                })}>
                {result?.status ? 'membatalkan' : 'memverifikasi'}
              </span>{' '}
              verifikasi Daftar Data <b>UMKM</b>?
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
