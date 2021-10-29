import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Table from 'components/Table';
import { makeData } from 'utils/dataConfig/dafter';
import DafterForm, { submitDafterForm } from './DafterForm';

const Dafter = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDafterFormVisible, setIsDafterFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showDeleteModal = (data) => {
    setSelectedRecord(data);
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setSelectedRecord(null);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = () => {
    // TODO: handle actual delete of the data.
    setIsDeleteModalVisible(false);
    Notification.show({
      message: (
        <div>
          Daftar <span className="fw-bold">{selectedRecord.name}</span> Berhasil Ditambahkan
        </div>
      ),
      icon: 'check',
    });
  };

  const showDafterFormModal = (data) => {
    setSelectedRecord(data);
    setIsDafterFormVisible(true);
  };

  const hideDafterFormModal = () => {
    setSelectedRecord(null);
    setIsDafterFormVisible(false);
  };

  const handleDafterFromSubmit = (data) => {
    debugger;
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
            callback: showDafterFormModal,
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
    onSearch: showDafterFormModal,
  };
  return (
    <Container fluid className="dafter-page pb-100">
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
      <Modal
        size="lg"
        visible={isDafterFormVisible}
        onClose={hideDafterFormModal}
        icon="info"
        title={selectedRecord ? 'Edit Data' : 'Tambah Data'}
        subtitle="Isi form dibawah untuk menambah data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDafterFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitDafterForm },
        ]}>
        <DafterForm data={selectedRecord} onSubmit={handleDafterFromSubmit} />
      </Modal>
    </Container>
  );
};

export default Dafter;
