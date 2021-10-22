import { useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'components/Table';
import makeData from 'utils/makeData';

const Dafter = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Instansi',
        accessor: 'instansi',
      },
      {
        Header: 'Nama Data',
        accessor: 'name',
      },
      {
        Header: 'Konsep',
        accessor: 'konsep',
      },
      {
        Header: 'Definisi',
        accessor: 'definisi',
      },
      {
        Header: 'Sumber Definisi',
        accessor: 'sumber',
      },
      {
        Header: 'Jadwal Pemutakhiran',
        accessor: 'jadwal',
      },
      {
        Header: 'Dibuat',
        accessor: 'dibuat',
      },
      {
        Header: 'Diperbarui',
        accessor: 'diper',
      },
      {
        Header: 'Produsen Data',
        accessor: 'produsen',
      },
      {
        Header: 'Data Induk',
        accessor: 'induk',
      },
      {
        Header: 'Format',
        accessor: 'format',
      },
      {
        Header: 'Link Akses',
        accessor: 'link',
        Cell: Table.Link,
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'edit',
            callback: () => {
              // TODO: handle edit callback
            },
          },
          {
            type: 'trash',
            callback: () => {
              // TODO: handle delete callback
            },
          },
        ],
        Cell: Table.Actions,
      },
    ],
    [],
  );
  const data = useMemo(() => makeData(200), []);
  const tableConfig = {
    columns,
    data,
    title: 'Daftar Data',
    search: true,
    searchPlaceholder: 'Cari Data',
    searchButtonText: 'Tambah Data',
    onSearch: (searchText) => {
      // Todo: handle Search
    },
  };
  return (
    <Container fluid className="dafter-page">
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <Table {...tableConfig} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dafter;
