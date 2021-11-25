import { useMemo, useState } from 'react';
import ColumnData from 'components/ColumnData';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Table from 'components/Table';
import Popover from 'components/Popover';
import { makeData } from 'utils/dataConfig/dafter';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import DafterForm, { submitDafterForm } from './DafterForm';

const DafterTable = ({ bem }) => {
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
          Daftar <span className="fw-bold">{selectedRecord.name}</span> Berhasil Dihapus
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
    // TODO: handle the data posted to server
    hideDafterFormModal();
    Notification.show({
      type: 'secondary',
      message: (
        <div>
          Daftar <span className="fw-bold">{data.name}</span> Berhasil Ditambahkan
        </div>
      ),
      icon: 'check',
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Instansi',
        id: 'instansi',
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          const items = [
            { label: 'ID Konsep', value: 'CPCL' },
            { label: 'KONSEP', value: 'CPCL' },
            {
              label: 'DEFINISI',
              value:
                'CPCL adalah calon petani penerima bantuan dan calon lokasi lahan yang akan menerima bantuan pemerintah	',
            },
            {
              label: 'sumber definisi',
              value:
                'Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Hasil Tanaman Pangan Tahun Anggaran 2020',
            },
            { label: 'dATA INDUK', value: 'PKKU; RDKK;CPCL' },
            { label: 'fORMAT', value: 'CSV' },
            { label: 'LINK AKSES', value: 'https://umkm.depkop.go.id', variant: 'link' },
            { label: 'PILAR SDGS', value: 'Sosial' },
            { label: 'Tujuan sdgs', value: '1. Mengakhiri kemiskinan dalam segala bentuk dimanapun' },
            { label: 'PN RKP', value: '-' },
            { label: 'PP RKP', value: '-' },
            { label: 'PRIORITAS', value: 'Ya' },
          ];
          return (
            <Popover
              placement="bottom-start"
              className={bem.e('popover')}
              trigger={<span>{item.instansi}</span>}
              header="Detail Data Cakupan Wilayah Internet">
              <ColumnData items={items} />
            </Popover>
          );
        },
      },
      {
        Header: 'Nama Data',
        accessor: 'name',
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
      },
      {
        Header: 'Status',
        accessor: 'status',
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
      <div class="container-fluid bg-gray-lighter p-24 mb-40 mt-32">
        <div class="row">
          <div class="col">
            <label className="sdp-form-label py-8">Instansi</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div class="col">
            <label className="sdp-form-label py-8">Produsen Data</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div class="col">
            <label className="sdp-form-label py-8">Data Induk</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div class="col">
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
        visible={isDafterFormVisible}
        onClose={hideDafterFormModal}
        icon="splitCircle"
        title={selectedRecord ? 'Edit Data' : 'Tambah Data'}
        subtitle="Isi form dibawah untuk menambah data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDafterFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitDafterForm },
        ]}>
        <DafterForm data={selectedRecord} onSubmit={handleDafterFromSubmit} />
      </Modal>
    </>
  );
};

export default DafterTable;
