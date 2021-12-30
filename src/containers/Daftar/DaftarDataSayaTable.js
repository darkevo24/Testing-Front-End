import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import truncate from 'lodash/truncate';
import cloneDeep from 'lodash/cloneDeep';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Table from 'components/Table';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { Check } from 'components/Icons';
import { JADWAL_PERMUTAKHIRAN } from 'utils/constants';
import { getSayaDaftarData, sayaDataSelector, deleteDaftarData } from './reducer';

const DaftarDataSayaTable = ({
  bem,
  textSearch,
  dataIndukOptions = [],
  instansiOptions = [],
  priorityOptions = [],
  produenOptions = [],
  showDaftarFormModal,
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pageSize, params, bodyParams, result } = useSelector(sayaDataSelector);

  const fetchSayaData = (filterOverride = {}, reset = false) => {
    const { params: paramsOverride = {}, bodyParams: bodyParamsOverride = {} } = filterOverride;
    const filterParams = {
      ...cloneDeep(params),
      ...cloneDeep(paramsOverride),
    };
    if (reset) {
      filterParams.start = 0;
      filterParams.currentPage = 0;
    }
    const filterBodyParams = {
      ...cloneDeep(bodyParams),
      ...cloneDeep(bodyParamsOverride),
    };
    const filters = { params: filterParams, bodyParams: filterBodyParams };
    return dispatch(getSayaDaftarData(filters));
  };

  useEffect(() => {
    fetchSayaData({ bodyParams: { textSearch } });
  }, [textSearch]);

  const onSortChange = ({ id, sortId, isSortedDesc }) => {
    const desc = isSortedDesc === undefined ? false : !isSortedDesc;
    setSortBy({ id, sortId, desc });
    fetchSayaData({ params: { sortBy: sortId, sortDirection: desc ? 'DESC' : 'ASC' } });
  };

  const handleDropdownFilter = (filter) => (selectedValue) => {
    fetchSayaData({ bodyParams: { [filter]: selectedValue.value } });
  };

  const data = useMemo(() => result?.content?.records || [], [result]);
  const showDeleteModal = (data) => {
    setSelectedRecord(data);
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setSelectedRecord(null);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = () => {
    dispatch(deleteDaftarData(selectedRecord)).then((res) => {
      const hasError = res?.type?.includes('rejected');
      if (hasError) {
        Notification.show({
          type: 'secondary',
          message: (
            <div>
              Kesalahan dalam menghapus daftar <span className="fw-bold">{selectedRecord.name}</span>
            </div>
          ),
          icon: 'cross',
        });
      } else {
        Notification.show({
          message: (
            <div>
              Daftar <span className="fw-bold">{selectedRecord.name}</span> Berhasil Dihapus
            </div>
          ),
          icon: 'check',
        });
      }
      setIsDeleteModalVisible(false);
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Instansi',
        accessor: 'instansi',
        sortId: 0,
      },
      {
        Header: 'Nama Data',
        accessor: 'nama',
        sortId: 1,
        Cell: (data) => truncate(data.cell.value, { length: 20 }),
      },
      {
        Header: 'Jadwal Pemutakhiran',
        accessor: 'jadwalPemutakhiran',
        sortId: 2,
        Cell: (data) => JADWAL_PERMUTAKHIRAN[data.cell.value],
      },
      {
        Header: 'Dibuat',
        accessor: 'tanggalDibuat',
        sortId: 3,
      },
      {
        Header: 'Diperbarui',
        accessor: 'tanggalDiperbaharui',
        sortId: 4,
      },
      {
        Header: 'Produsen Data',
        accessor: 'produsenData',
        sortId: 5,
      },
      {
        Header: 'Label',
        accessor: 'label',
        Cell: ({ cell: { row: { id: rowId, original: item } = {} } = {} }) => (
          <div className={bem.e('tag-wrapper')}>
            {[item.labelKodePilar, item.labelKodePnrkp].filter(Boolean).map((label) => (
              <div key={`${rowId}-${label}`} className={bem.e('tag')}>
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
  const tableConfig = {
    columns,
    data,
    totalCount: result?.content?.totalRecords || null,
    pageSize,
    sortBy,
    onSortChange,
    manualPagination: true,
    currentPage: params.page,
    showSearch: false,
    highlightOnHover: true,
    variant: 'spaced',
    onPageIndexChange: (page) => {
      if (params.page !== page) {
        const params = { page };
        fetchSayaData({ params });
      }
    },
    onRowClick: (daftar) => {
      history.push(`/daftar/${daftar.id}/variable`, { state: { daftar } });
    },
  };

  return (
    <>
      <div className="container-fluid bg-gray-lighter p-24 mb-40 mt-32">
        <div className="row">
          <div className="col">
            <label className="sdp-form-label py-8">Instansi</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('instansi')}
              data={instansiOptions}
              placeHolder="Semua"
              isLoading={false}
              noValue={true}
            />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Produsen Data</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('produsenData')}
              data={produenOptions}
              placeHolder="Semua"
              isLoading={false}
              noValue={true}
            />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Data Induk</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('dataInduk')}
              data={dataIndukOptions}
              placeHolder="Semua"
              isLoading={false}
              noValue={true}
            />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Prioritas</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('prioritas')}
              data={priorityOptions}
              placeHolder="Ya"
              isLoading={false}
              noValue={true}
            />
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
    </>
  );
};

export default DaftarDataSayaTable;
