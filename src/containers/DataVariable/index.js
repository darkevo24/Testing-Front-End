import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Table from 'components/Table';
import { Breadcrumb } from 'components';
import { makeData } from 'utils/dataConfig/data-variable';
import DataVariableForm, { submitDataVariableForm } from './DataVariableForm';

const DataVariable = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDataVariableFormVisible, setIsDataVariableFormVisible] = useState(false);
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
          Variabel <span className="fw-bold">{selectedRecord.name}</span> Berhasil Dihapus
        </div>
      ),
      icon: 'check',
    });
  };

  const showDataVariableFormModal = (data) => {
    setSelectedRecord(data);
    setIsDataVariableFormVisible(true);
  };

  const hideDataVariableFormModal = () => {
    setSelectedRecord(null);
    setIsDataVariableFormVisible(false);
  };

  const handleDataVariableFormSubmit = (data) => {
    // TODO: handle the data posted to server
    hideDataVariableFormModal();
    Notification.show({
      type: 'secondary',
      message: (
        <div>
          Variabel <span className="fw-bold">{data.name}</span> Berhasil Ditambahkan
        </div>
      ),
      icon: 'check',
    });
  };

  const columns = useMemo(
    () => [
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
        Header: 'Pengaturan Akses',
        accessor: 'pengaturan',
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'edit',
            callback: showDataVariableFormModal,
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
    variant: 'light',
    columns,
    data,
    title: 'Data UMKM',
    search: true,
    searchPlaceholder: 'Cari Data',
    searchButtonText: 'Tambah Varaibel',
    onSearch: () => showDataVariableFormModal(),
  };
  const breadcrumbsList = [
    {
      path: '/admin/dafter',
      label: 'Daftar Data',
    },
    {
      isActive: true,
      label: 'Data UMKM',
    },
  ];
  return (
    <Container fluid className="dafter-page pb-100">
      <Breadcrumb breadcrumbsList={breadcrumbsList} />
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
        visible={isDataVariableFormVisible}
        onClose={hideDataVariableFormModal}
        icon="splitTriangle"
        title={selectedRecord ? 'Edit Variable' : 'Tambah Variable'}
        subtitle={selectedRecord ? 'Isi form dibawah untuk menambah Variabel' : 'ID UMKM'}
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDataVariableFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitDataVariableForm },
        ]}>
        <DataVariableForm data={selectedRecord} onSubmit={handleDataVariableFormSubmit} />
      </Modal>
    </Container>
  );
};

export default DataVariable;
