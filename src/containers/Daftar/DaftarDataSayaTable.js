import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import truncate from 'lodash/truncate';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Table from 'components/Table';
import { makeData } from 'utils/dataConfig/daftar';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import DaftarForm, { submitDaftarForm } from './DaftarForm';
import { Check } from 'components/Icons';
import { deleteKatalog, putKatalog } from './reducer';

const DaftarDataSayaTable = ({ bem }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDaftarFormVisible, setIsDaftarFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const dispatch = useDispatch();

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

    dispatch(deleteKatalog(selectedRecord)).then((res) => {
      setIsDeleteModalVisible(false);
    });
    Notification.show({
      message: (
        <div>
          Daftar <span className="fw-bold">{selectedRecord.name}</span> Berhasil Dihapus
        </div>
      ),
      icon: 'check',
    });
  };

  const showDaftarFormModal = (data) => {
    setSelectedRecord(data);
    setIsDaftarFormVisible(true);
  };

  const hideDaftarFormModal = () => {
    setSelectedRecord(null);
    setIsDaftarFormVisible(false);
  };

  const handleDaftarFromSubmit = (data) => {
    // TODO: handle the data posted to server

    data.instansi = data.instansi.value;
    data.jadwalPemutakhiran = data.jadwalPemutakhiran.value;
    data.indukData = [data.indukData.value];
    data.format = 'png';

    dispatch(putKatalog(data)).then((res) => {
      hideDaftarFormModal();
      res.payload
        ? Notification.show({
            type: 'secondary',
            message: (
              <div>
                Daftar <span className="fw-bold">{data.name}</span> Berhasil Ditambahkan
              </div>
            ),
            icon: 'check',
          })
        : Notification.show({
            message: (
              <div>
                Daftar <span className="fw-bold">{data.name}</span> Berhasil Ditambahkan
              </div>
            ),
            icon: 'cross',
          });
    });
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
        Cell: (data) => truncate(data.cell.value, { length: 20 }),
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
        Header: 'Label',
        accessor: 'label',
        Cell: ({ cell: { row, value = [] } }) => (
          <div className={bem.e('tag-wrapper')}>
            {value.map((label) => (
              <div key={`${row.id}-${label}`} className={bem.e('tag')}>
                {label}
              </div>
            ))}
          </div>
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (data) => (data.cell.value === 'active' ? <Check variant="green" /> : <Check variant="stroke" />),
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'edit',
            callback: showDaftarFormModal,
          },
          {
            type: 'cross',
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
    showSearch: false,
    highlightOnHover: true,
    variant: 'spaced',
  };
  const dropdownFilters = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
    { label: 'Option 4', value: 'Option 4' },
  ];

  return (
    <>
      <div className="container-fluid bg-gray-lighter p-24 mb-40 mt-32">
        <div className="row">
          <div className="col">
            <label className="sdp-form-label py-8">Instansi</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Produsen Data</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Data Induk</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Prioritas</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Ya" isLoading={false} noValue={true} />
          </div>
        </div>
      </div>
      <Table {...tableConfig} />
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
        visible={isDaftarFormVisible}
        onClose={hideDaftarFormModal}
        icon="splitCircle"
        title={selectedRecord ? 'Edit Data' : 'Tambah Data'}
        subtitle="Isi form dibawah untuk menambah data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDaftarFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitDaftarForm },
        ]}>
        <DaftarForm data={selectedRecord} onSubmit={handleDaftarFromSubmit} />
      </Modal>
    </>
  );
};

export default DaftarDataSayaTable;
