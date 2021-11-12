import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Table from 'components/Table';
import { makeData } from 'utils/dataConfig/permintaanData';
import { useHistory } from 'react-router-dom';

const PermintaanData = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const history = useHistory();

  const showPermintaanDataForm = (data) => {
    setSelectedRecord(data);
    console.log('data', selectedRecord);
    history.push('/permintaan-data-form', { data: selectedRecord });
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nama Peminta',
        accessor: 'namaPeminta',
      },
      {
        Header: 'Instansi',
        accessor: 'instansi',
      },
      {
        Header: 'Unit Kerja',
        accessor: 'unitKerja',
      },
      {
        Header: 'Deskripsi Data',
        accessor: 'deskripsi',
      },
      {
        Header: 'Target Waktu',
        accessor: 'targetWaktu',
      },
      {
        Header: 'Produsen Data',
        accessor: 'produsen',
      },
      {
        Header: 'Jenis Data',
        accessor: 'tipe',
      },
      {
        Header: 'Tanggal Permintaan',
        accessor: 'tanggalPermintaan',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        id: 'actions',
        actions: [
          {
            text: 'Detail',
            variant: 'info',
            callback: showPermintaanDataForm,
          },
        ],
        Cell: Table.Button,
      },
    ],
    [],
  );
  const data = useMemo(() => makeData(200), []);
  const tableConfig = {
    columns,
    data,
    title: 'Permintaan Data',
    search: true,
    searchPlaceholder: 'Cari Data',
    onSearch: () => showPermintaanDataForm(),
  };
  return (
    <Container fluid className="dafter-page pb-100">
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <Table {...tableConfig} />
        </Col>
      </Row>
    </Container>
  );
};

export default PermintaanData;
