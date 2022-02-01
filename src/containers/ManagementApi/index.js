import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'components/Table';
import TableLoader from 'components/Loader/TableLoader';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { ReactComponent as Search } from 'assets/search-api.svg';
import bn from 'utils/bemNames';
import { useDebounce } from 'utils/hooks';
import { getMangementApiList, portalManagmentApiListSelector } from './reducer';
const DEBOUNCE_DELAY = 500;
const bem = bn('management-api');

const ManagementApi = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { page, size, loading, records, totalRecords, totalPages } = useSelector(portalManagmentApiListSelector);
  const handleAPICall = (params) => {
    return dispatch(getMangementApiList(params));
  };

  useEffect(() => {
    handleAPICall({ page, q: query });
  }, [query]);

  const handleUserInputChange = (event) => {
    const { value } = event.target;
    delayedQuery(value);
  };
  const delayedQuery = useDebounce((query) => setQuery(query), DEBOUNCE_DELAY);

  useEffect(() => {
    return delayedQuery.cancel;
  }, [query, delayedQuery]);

  const columns = [
    {
      Header: 'Judul API',
      accessor: 'title',
    },
    {
      Header: 'Deskripsi',
      accessor: 'description',
    },
    {
      Header: 'Output JSON',
      accessor: 'outputUrl',
    },
  ];

  const rowClick = (data) => {
    history.push(`api-detail/${data.id}`);
  };

  const tableConfig = {
    className: 'cms-table-log',
    columns,
    data: records,
    variant: 'link',
    title: '',
    showSearch: false,
    onSearch: () => {},
    totalCount: totalRecords,
    pageCount: totalPages,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onRowClick: rowClick,
    onPageIndexChange: (nextPage) => {
      if (nextPage !== page) {
        handleAPICall({ page: nextPage, q: query });
      }
    },
  };
  return (
    <div className="sdp-management-api">
      <div className="container">
        <div className={bem.e('card-api')}>
          <Row>
            <Col md={6}>
              <div className="wrapper-left">
                <div className="card-logo">
                  <img src={LogoBappenas} alt="logo" height="60px" width="60px" />
                </div>
                <div className="card-description">
                  <h3>Bappenas</h3>
                  <div className="input-group">
                    <input type="text" placeholder="https://bappenas.go.id/data.json/123456789/01112131415" />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <Edit />
                      </span>
                    </div>
                  </div>
                  <p>3 Files</p>
                </div>
              </div>
            </Col>
            <Col Md={6}>
              <div className="wrapper-right">
                <Button variant="info" onClick={() => history.push('/api/form')}>
                  Tambah API
                </Button>
                <div className="input-group">
                  <InputGroup>
                    <Form.Control
                      variant="normal"
                      type="text"
                      placeholder="Cari Pencarian"
                      onChange={handleUserInputChange}
                    />
                    <span className="input-group-text">
                      <Search />
                    </span>
                  </InputGroup>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={bem.e('management-table bappenas')}>
          {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
        </div>
      </div>
    </div>
  );
};

export default ManagementApi;
