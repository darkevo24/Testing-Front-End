import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ReactJson from 'react-json-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import get from 'lodash/get';
import { /*Modal, */ ReadOnlyInputs } from 'components';
import { PencilSvg /*, Trash*/ } from 'components/Icons';
import { /*prefixID,*/ getStatusClass } from 'utils/helper';
import ImportData from './ImportData';
import { getById, getByIDSelector, getByIdLog, getByIdLogsSelector } from './reducer';
import Loader from 'components/Loader';

const DetailApi = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  // const [modalProfile, setModalProfile] = useState(false);
  // const [notes, setNotes] = useState('');
  // const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { loading, records } = useSelector(getByIDSelector);
  const { logRecords } = useSelector(getByIdLogsSelector);

  const {
    userName = '',
    email = '',
    sourceApi = '',
    outputUrl = '',
    dataSource = [],
    dcatproperties = [],
    instansi = {},
    title = '',
    description = '',
  } = records || {};

  const currentRecord = get(records, `dataSource.${currentPage}`, {});
  const mappedRecords = Object.keys(currentRecord).map((key) => ({
    field: key,
    value: typeof currentRecord[key] === 'object' ? <ReactJson src={currentRecord[key]} /> : currentRecord[key],
  }));

  const importData = {
    userName: userName || '',
    email: email || '',
    sourceApi: sourceApi || '',
    outputUrl: outputUrl || '',
  };

  const sourceApiColumns = [
    {
      Header: 'Field',
      accessor: 'field',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
  ];
  const sourceAPITableConfig = {
    // variant: 'spaced',
    columns: sourceApiColumns,
    data: mappedRecords || [],
    showSearch: false,
    totalCount: dataSource?.length || null,
    pageSize: mappedRecords.length,
    manualPagination: true,
    pageCount: dataSource?.length || null,
    currentPage,
    onPageIndexChange: (page) => {
      setCurrentPage(page);
    },
  };

  const dcatTableData = dcatproperties.map((elem, index) => ({
    ...elem,
    index: index + 1,
  }));

  const dcatColumns = [
    {
      Header: 'No',
      accessor: 'index',
    },
    {
      Header: 'DCAT Property',
      accessor: 'jsonKey',
    },
    {
      Header: 'Equivalent',
      accessor: 'equivalent',
    },
    {
      Header: 'Source API',
      accessor: 'sourceApiKey',
    },
  ];
  const dcatTableConfig = {
    // variant: 'spaced',
    totalCount: null,
    manualPagination: true,
    columns: dcatColumns,
    data: dcatTableData || [],
    showSearch: false,
  };

  // const handleCloseModal = () => {
  //   setLoader(false);
  //   setModalProfile(false);
  // };

  // const onDelete = () => {
  //   console.log('dele');
  //   // deleteRequest()
  // };

  useEffect(() => {
    dispatch(getById(id));
    dispatch(getByIdLog(id));
  }, []);

  if (loading) {
    return <Loader fullscreen />;
  }

  return (
    <div className="sdp-cms-api container my-40">
      <Row className="mt-40">
        <Col xs={12} md={8}>
          <div className="d-flex justify-content-between  mb-40">
            <label className="sdp-heading-big">Detail API</label>
            <div>
              {/*<Button*/}
              {/*  key="delete"*/}
              {/*  variant="light"*/}
              {/*  className="mr-16 br-4 bg-gray border-0"*/}
              {/*  onClick={() => setModalProfile(true)}>*/}
              {/*  <Trash />*/}
              {/*</Button>*/}
              <Button
                key="edit"
                variant="outline-light"
                className="mr-16 br-4 bg-white border"
                onClick={() => history.push(`/cms/api-edit/${instansi.id}/${id}`)}>
                <PencilSvg />
              </Button>
            </div>
          </div>

          <ReadOnlyInputs group label="Judul" labelClass="sdp-form-label fw-normal" type="text" value={title || ''} />
          <ReadOnlyInputs
            group
            label="Deskripsi"
            labelClass="sdp-form-label fw-normal"
            type="text"
            value={description || ''}
          />
          <ReadOnlyInputs
            group
            label="Source API"
            labelClass="sdp-form-label fw-normal"
            type="text"
            value={sourceApi || ''}
          />

          <ImportData
            importData={importData}
            sourceAPITableConfig={sourceAPITableConfig}
            dcatTableConfig={dcatTableConfig}
          />
        </Col>
        <Col xs={4} md={2}>
          <div className="ml-30">
            <label className="fs-20 fw-bold">Log Status</label>
            <div className="mt-50">
              {logRecords.map((elem, index) => {
                const status = (elem?.status || '').toLowerCase();
                const classDetail = getStatusClass(status);
                return (
                  <div key={index} className="mb-15">
                    <div className="d-flex align-items-center">
                      <span className="fs-14 lh-17 mr-5 sdp-text-black-dark mw-fit-content">
                        {moment(elem.createdAt).format('DD MMMM YYYY')}
                      </span>
                      <div className="border-gray-stroke h-0 w-100 ml-10" />
                    </div>
                    <div className="d-flex">
                      <div className={`h-fit-content m-5 ${classDetail?.divBG || ''}`}>
                        <label className={`p-2 ${classDetail.textColor || ''}`}>{classDetail.text || elem.status}</label>
                      </div>
                      <div className="ml-10 mw-fit-content mt-6">
                        <span className="sdp-text-disable">{elem.remark}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
      {/*{modalProfile && (*/}
      {/*  <Modal visible={true} onClose={handleCloseModal} title="" showHeader={false} centered={true}>*/}
      {/*    Apakah anda yakin ingin <span className="sdp-text-red">menghapus</span> Source API <b>{prefixID(id, 'PD')}</b>?*/}
      {/*    <textarea*/}
      {/*      placeholder="Tulis Catatan"*/}
      {/*      name="catatan"*/}
      {/*      value={notes}*/}
      {/*      onChange={({ target: { value = '' } = {} }) => setNotes(value)}*/}
      {/*      className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"*/}
      {/*      required*/}
      {/*    />*/}
      {/*    <div className="d-flex justify-content-end">*/}
      {/*      <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>*/}
      {/*        Batal*/}
      {/*      </Button>*/}
      {/*      <Button className="br-4 px-39 py-13" variant="info" onClick={onDelete} disabled={!notes.trim()}>*/}
      {/*        {loader && (*/}
      {/*          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />*/}
      {/*        )}*/}
      {/*        Konfirmasi*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </Modal>*/}
      {/*)}*/}
    </div>
  );
};

export default DetailApi;
