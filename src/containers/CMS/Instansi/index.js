import cx from 'classnames';
import bn from 'utils/bemNames';
import { Button, InputGroup, Form, Table } from 'react-bootstrap';
import { Search, ModalAlertDanger } from 'components/Icons';

const bem = bn('instansi');

const Instansi = () => {
  const statusList = [
    {
      id: 1,
      status: 'DRAFT',
    },
    {
      id: 2,
      status: 'APPROVED',
    },
    {
      id: 3,
      status: 'REJECTED',
    },
    {
      id: 4,
      status: 'Waiting Approval',
    },
  ];
  const columns = [
    {
      Headers: 'Kode Instansi',
      accessor: 'id',
    },
    {
      Headers: 'Nama Instansi',
      accessor: 'nama',
    },
    {
      Headers: 'Level Instansi',
      accessor: 'level',
    },
    {
      Headers: 'Status',
      accessor: 'status',
    },
    {
      Headers: '',
      accessor: 'actions',
    },
  ];

  const tableConfig = {
    columns,
    size: 'sm',
    variant: 'link',
    title: '',
    showSearch: false,
    onSearch: () => {},
    totalCount: null,
    pageCount: null,
    pageSize: null,
    onRowClick: () => {},
    rowClass: () => {},
  };

  return (
    <div className="sdp-instansi">
      <div className="container">
        <div className={bem.e('header-log')}>
          <div className="wrapper-left">
            <h1>Instansi</h1>
            <Button className="" variant="info" style={{ width: '112px' }}>
              Buat Baru
            </Button>
          </div>
          <div className="wrapper-right">
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Cari Pencarian" />
              <Search />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="px-30 pt-0">
        <Table {...tableConfig} />
      </div>
    </div>
  );
};

export default Instansi;
