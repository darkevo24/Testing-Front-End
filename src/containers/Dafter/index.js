import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Modal from 'components/Modal';
import Table from 'components/Table';
import makeData from 'utils/makeData';

const Dafter = (props) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const showDeleteModal = (data) => {
    setRecordToDelete(data);
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setRecordToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = () => {
    // TODO: handle actual delete of the data.
  };

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
            callback: showDeleteModal,
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
      <Modal
        visible={isDeleteModalVisible}
        onClose={hideDeleteModal}
        icon="info"
        title="Konfirmasi Hapus Data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDeleteModal },
          { text: 'Hapus', onClick: handleDelete },
        ]}>
        Apakah anda yakin untuk menghapus <span className="fw-bold">Data UMKM?</span>
      </Modal>
    </Container>
  );
};

export default Dafter;
