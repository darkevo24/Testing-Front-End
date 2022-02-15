import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import { FilterSearchInput } from 'components/Table';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import Pagination from 'components/Pagination';
import { getManagementApiList, cmsManagementApiSelector } from './reducer';
import { Loader } from 'components';

const list = [
  { value: 'api_count_desc', label: 'API Count DESC', sort: 'api_count', sort_direction: 'DESC' },
  { value: 'nama_desc', label: 'Nama DESC', sort: 'nama', sort_direction: 'DESC' },
  { value: 'api_count_asc', label: 'API Count ASC', sort: 'api_count', sort_direction: 'ASC' },
  { value: 'nama_asc', label: 'Nama ASC', sort: 'nama', sort_direction: 'ASC' },
];

const ManagementApi = () => {
  const [selectedSorter, setSelectedSorter] = useState(list[0]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { totalPages, records, q, page, loading, sort, sort_direction } = useSelector(cmsManagementApiSelector);

  useEffect(() => {
    const recordIndex = list.findIndex((item) => item.sort === sort && item.sort_direction === sort_direction);
    if (recordIndex === -1) setSelectedSorter(list[0]);
    else setSelectedSorter(list[recordIndex]);
  }, [sort_direction, sort]);

  const gotoPage = (data) => {
    dispatch(getManagementApiList({ page: data.page - 1, q, sort, sort_direction }));
  };

  useEffect(() => {
    dispatch(getManagementApiList({ page: 0, q: '', sort, sort_direction }));
  }, []);

  const handleSearch = (value) => {
    if (!value.trim()) return;
    dispatch(getManagementApiList({ page: 0, q: value, sort, sort_direction }));
  };

  const handleSorting = (data) => {
    dispatch(getManagementApiList({ page: 0, q, sort: data.sort, sort_direction: data.sort_direction }));
  };

  return (
    <div className="sdp-cms-management-api-container bg-gray-lighter">
      {loading ? (
        <Loader fullscreen />
      ) : (
        <>
          <div className="bg-white d-flex justify-content-between align-items-end p-32 border-bottom-gray-stroke">
            <div>
              <label className="fw-bold fs-32 mb-24">API Management</label>
              <SingleDropDown
                defaultData={selectedSorter}
                data={list}
                placeHolder=""
                onChange={(data) => handleSorting(data)}
              />
            </div>
            <div>
              <FilterSearchInput searchPlaceholder="Cari..." globalFilter={q} setGlobalFilter={handleSearch} />
            </div>
          </div>
          <div className="mx-32">
            <div className="mt-32">
              <Row xs={1} md={3} className="g-3">
                {records.map((elem) => (
                  <Col key={elem.id}>
                    <Card.Body
                      onClick={() => history.push(`/cms/api-baru/${elem.id}`)}
                      className="sdp-card-wrapper cursor-pointer d-flex p-0">
                      <div className="d-flex">
                        <div className="px-15 py-23 bg-gray d-flex align-items-center">
                          <Card.Img variant="left" src={LogoBappenas} width="56px" height="56px" />
                        </div>
                        <div className="d-flex flex-column">
                          <div className="d-flex">
                            <div className="pt-16 pl-16 pr-16 pb-0">
                              <Card.Title className="sdp-card-title">{elem.nama}</Card.Title>
                            </div>
                            <div className="px-15 py-4 bg-gray sdp-count">{elem.apiCount} Files</div>
                          </div>
                          <Card.Text className="pt-0 pl-16 pb-16 sdp-text-disable">{elem.groupOutputUrl}</Card.Text>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="d-flex justify-content-between mt-40">
              <span className="sdp-text-disable">Display 1 - {records.length < 24 ? records.length : 24}</span>
              <Pagination totalPages={totalPages} currentPage={page} onChangePage={gotoPage} />
            </div>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default ManagementApi;
