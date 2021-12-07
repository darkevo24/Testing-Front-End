import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Popover from 'components/Popover';
import Table from 'components/Table';
import { Breadcrumb } from 'components';
import truncate from 'lodash/truncate';
import { makeData } from 'utils/dataConfig/data-variable';
import DataVariableForm, { submitDataVariableForm } from './DataVariableForm';

const DataVariable = () => {
  const { t } = useTranslation();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDataVariableFormVisible, setIsDataVariableFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const selectedDaftar = 'Data cakupan wilayah Internet';

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

  const dropdownFilters = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
    { label: 'Option 4', value: 'Option 4' },
  ];

  const columns = useMemo(
    () => [
      {
        Header: 'Nama Variabel',
        accessor: 'name',
      },
      {
        Header: 'ID Konsep',
        accessor: 'id-konsep',
      },
      {
        Header: 'Konsep',
        accessor: 'konsep',
      },
      {
        Header: 'Definisi',
        accessor: 'definisi',
        Cell: ({ cell: { value } = {} }) => {
          return (
            <Popover
              placement="bottom-start"
              triggerOn="hover"
              trigger={<span className="cursor-pointer">{truncate(value, { length: 50 })}</span>}>
              {value}
            </Popover>
          );
        },
      },
      {
        Header: 'Pengaturan Akses',
        accessor: 'pengaturan',
      },
      {
        Header: 'Kode Referensi',
        accessor: 'code',
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
    variant: 'spaced',
    columns,
    data,
    searchLeftComponent: (
      <div className="w-100 d-flex align-items-center">
        <span className="sdp-text-disable mr-16">{t('sandbox.variable.reference')}</span>
        <SingleSelectDropdown
          className="wpx-300"
          data={dropdownFilters}
          placeHolder="ID UMKM"
          isLoading={false}
          noValue={true}
        />
      </div>
    ),
    title: (
      <>
        <span className="sdp-text-disable">{t('sandbox.variable.title')}</span>
        <span> {selectedDaftar}</span>
      </>
    ),
    search: true,
    searchPlaceholder: t('sandbox.variable.searchPlaceholder'),
    searchButtonText: t('sandbox.variable.addVariable'),
    onSearch: () => showDataVariableFormModal(),
  };

  const breadcrumbsList = useMemo(
    () => [
      {
        path: '/home',
        label: t('sandbox.title'),
      },
      {
        path: '/daftar',
        label: t('sandbox.daftar.title'),
      },
      {
        path: '/daftar',
        label: selectedDaftar,
      },
      {
        isActive: true,
        label: t('sandbox.variable.title'),
      },
    ],
    [t],
  );

  return (
    <div className="daftar-page pb-100">
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
    </div>
  );
};

export default DataVariable;
