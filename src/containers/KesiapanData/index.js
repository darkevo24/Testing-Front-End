import { useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Notification from 'components/Notification';
import Modal from 'components/Modal';
import Table from 'components/Table';
import { makeData } from 'utils/dataConfig/kesiapanData';
import KesiapanDataForm, { submitKesiapanDataForm } from './KesiapanDataForm';

const KesiapanData = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isKesiapanDataFormVisible, setIsKesiapanDataFormVisible] = useState(false);
  // const [isViewKesiapanDataFormVisible, setIsViewKesiapanDataFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);

  const showDeleteModal = (data) => {
    setSelectedRecord(data);
    setIsDeleteModalVisible(true);
  };
  const hideDeleteModal = () => {
    setSelectedRecord(null);
    setIsDeleteModalVisible(false);
  };
  const handleDelete = (data) => {
    hideDeleteModal();
    Notification.show({
      type: 'secondary',
      message: (
        <div>
          Kesiapan Data <span className="fw-bold">{selectedRecord.name}</span> Berhasil Dihapus
        </div>
      ),
      icon: 'check',
    });
  };

  const showKesiapanDataFormModal = (data) => {
    setSelectedRecord(data);
    setIsKesiapanDataFormVisible(true);
  };
  const hideKesiapanDataFormModal = () => {
    setSelectedRecord(null);
    setIsKesiapanDataFormVisible(false);
  };
  const handleKesiapanDataFormSubmit = (data) => {
    hideKesiapanDataFormModal();
    Notification.show({
      type: 'secondary',
      message: (
        <div>
          Kesiapan Data <span className="fw-bold">{data.name}</span> Berhasil Ditambahkan
        </div>
      ),
      icon: 'check',
    });
  };

  // const showViewKesiapanDataFormModal = (data) => {
  //   setSelectedRecord(data);
  //   setIsViewKesiapanDataFormVisible(false);
  // };
  // const hideViewKesiapanDataFormModal = () => {
  //   setSelectedRecord(null);
  //   setIsViewKesiapanDataFormVisible(false);
  // };

  const columns = useMemo(
    () => [
      {
        Header: 'Judul',
        accessor: 'title',
      },
      {
        Header: 'Diperbarui Oleh',
        accessor: 'modifiedBy',
      },
      {
        Header: 'Jadwal Perbaruan',
        accessor: 'modified',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Dibuat Oleh',
        accessor: 'createdBy',
      },
      {
        Header: 'Pemilik',
        accessor: 'owner',
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'search',
            callback: showKesiapanDataFormModal,
          },
          {
            type: 'edit',
            callback: showKesiapanDataFormModal,
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
    title: 'Kesiapan SDI',
    search: true,
    searchPlaceholder: 'Cari Data',
    searchButtonText: 'Tambah Data',
    onSearch: () => showKesiapanDataFormModal(),
  };
  return (
    <Container fluid className="dafter-page pb-100">
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <Table {...tableConfig} />
        </Col>
      </Row>
      <Modal
        Visible={isDeleteModalVisible}
        onClose={hideDeleteModal}
        title="Konfirmasi Hapus Data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDeleteModal },
          { text: 'Hapus', onClick: handleDelete },
        ]}>
        Apakah anda yakin untuk menghapus <span className="fw-bold">Kesiapan Data?</span>
      </Modal>
      <Modal
        size="lg"
        visible={isKesiapanDataFormVisible}
        onClose={hideKesiapanDataFormModal}
        icon="splitCircle"
        title={selectedRecord ? 'Edit Data' : 'Tambah Data'}
        subtitle="Isi form dibawah untuk menambah data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideKesiapanDataFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitKesiapanDataForm },
        ]}>
        <KesiapanDataForm data={selectedRecord} onSubmit={handleKesiapanDataFormSubmit} />
      </Modal>
    </Container>
  );
};

export default KesiapanData;
