import { useMemo, useState, useEffect } from 'react';
import cx from 'classnames';
import truncate from 'lodash/truncate';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ColumnData from 'components/ColumnData';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Notification from 'components/Notification';
import Table from 'components/Table';
import Popover from 'components/Popover';
import { Check } from 'components/Icons';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import cloneDeep from 'lodash/cloneDeep';
import DaftarForm, { submitDaftarForm } from './DaftarForm';
import { getKatalog, katalogSelector } from './reducer';

const DaftarTable = ({ bem, cms = false }) => {
  const history = useHistory();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDaftarFormVisible, setIsDaftarFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { pageSize, loading, params, result } = useSelector(katalogSelector);
  const dispatch = useDispatch();

  const fetchKatalog = (override, reset = false) => {
    const filterParams = {
      ...cloneDeep(params),
      ...cloneDeep(override),
    };
    if (reset) {
      filterParams.start = 0;
      filterParams.currentPage = 0;
    }
    return dispatch(getKatalog(filterParams));
  };
  const katlogData = useMemo(() => result || [], [result]);
  useEffect(() => {
    fetchKatalog();
  }, []);

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

  const showDaftarFormModal = (data) => {
    setSelectedRecord(data);
    setIsDaftarFormVisible(true);
  };

  const hideDaftarFormModal = () => {
    setSelectedRecord(null);
    setIsDaftarFormVisible(false);
  };

  const showDaftarDetailPage = (data) => {
    // TODO: handle the detail page for daftar cms
    setSelectedRecord(data);
    // setIsDaftarFormVisible(true);
  };

  const handleDaftarFromSubmit = (data) => {
    // TODO: handle the data posted to server
    hideDaftarFormModal();
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

  const columns = useMemo(() => {
    const items = [
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
              variant="highlight"
              className={bem.e('popover')}
              triggerOn="hover"
              trigger={<span className="cursor-pointer">{item.instansi.nama}</span>}
              header="Detail Data Cakupan Wilayah Internet">
              <ColumnData items={items} />
            </Popover>
          );
        },
      },
      {
        Header: 'Nama Data',
        accessor: 'nama',
        Cell: (data) => truncate(data.cell.value, { length: 20 }),
      },
      {
        Header: 'Jadwal Pemutakhiran',
        accessor: 'jadwalPemutakhiran',
      },
      {
        Header: 'Dibuat',
        accessor: 'createdDate',
      },
      {
        Header: 'Diperbarui',
        accessor: 'lastModifiedDate',
      },
      {
        Header: 'Produsen Data',
        accessor: 'produsenData',
      },
      {
        Header: 'Label',
        accessor: 'label',
        // TODO: replace with actual data
        Cell: ({ cell: { row, value = [] } }) => (
          <div className={bem.e('tag-wrapper')}>
            {['SDGs', 'RKP'].map((label) => (
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
        Cell: (data) => (data.cell.value ? <Check variant="green" /> : <Check variant="stroke" />),
      },
    ];
    if (cms) {
      items.push({
        id: 'actions',
        actions: [
          {
            title: 'Detail',
            classes: 'btn btn-info',
            callback: showDaftarDetailPage,
          },
        ],
        Cell: Table.Actions,
      });
    }
    return items;
  }, [cms]);

  const data = useMemo(() => katlogData?.content?.records || [], [katlogData]);

  const tableConfig = {
    columns,
    data,
    totalCount: result?.content?.totalRecords || null,
    cms,
    pageSize,
    manualPagination: true,
    currentPage: params.currentPage,
    showSearch: false,
    highlightOnHover: true,
    variant: 'spaced',
    onPageIndexChange: (currentPage) => {
      const start = currentPage * pageSize;
      if (params.start !== start) {
        const params = {
          start,
          currentPage,
        };
        fetchKatalog(params);
      }
    },
  };
  if (!cms) {
    tableConfig.onRowClick = (data) => {
      history.push('/data-variable');
    };
  }
  const dropdownFilters = [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
    { label: 'Option 4', value: 'Option 4' },
  ];

  return (
    <>
      <div className={cx(cms ? 'mb-30' : 'bg-gray-lighter mb-40 p-24 mt-32')}>
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
          {cms ? (
            <>
              <div className="col">
                <label className="sdp-form-label py-8">Pilar SDGs</label>
                <SingleSelectDropdown data={dropdownFilters} placeHolder="Ya" isLoading={false} noValue={true} />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">Tujuan SDGs</label>
                <SingleSelectDropdown data={dropdownFilters} placeHolder="Ya" isLoading={false} noValue={true} />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">PN RKP</label>
                <SingleSelectDropdown data={dropdownFilters} placeHolder="Ya" isLoading={false} noValue={true} />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">PP RKP</label>
                <SingleSelectDropdown data={dropdownFilters} placeHolder="Ya" isLoading={false} noValue={true} />
              </div>
            </>
          ) : (
            <div className="col">
              <label className="sdp-form-label py-8">Prioritas</label>
              <SingleSelectDropdown data={dropdownFilters} placeHolder="Ya" isLoading={false} noValue={true} />
            </div>
          )}
        </div>
      </div>
      {cms && <div className="divider mx-n32 mb-24" />}
      <Table {...tableConfig} />
      {loading && <Loader fullscreen />}
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

export default DaftarTable;
