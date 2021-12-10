import { useMemo, useState, useEffect } from 'react';
import cx from 'classnames';
import truncate from 'lodash/truncate';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ColumnData from 'components/ColumnData';
import Loader from 'components/Loader';
import Table from 'components/Table';
import Popover from 'components/Popover';
import { Check } from 'components/Icons';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import cloneDeep from 'lodash/cloneDeep';
import { getDaftarData, daftarDataSelector } from './reducer';

const DaftarTable = ({
  bem,
  dataindukOptions = [],
  instansiOptions = [],
  priorityOptions = [],
  produenOptions = [],
  cms = false,
}) => {
  const history = useHistory();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { pageSize, loading, params, bodyParams, result } = useSelector(daftarDataSelector);
  const dispatch = useDispatch();

  const fetchDaftarData = (filterOverride = {}, reset = false) => {
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
    return dispatch(getDaftarData(filters));
  };

  const katlogData = useMemo(() => result || [], [result]);

  useEffect(() => {
    fetchDaftarData();
  }, []);

  const showDaftarDetailPage = (data) => {
    // TODO: handle the detail page for daftar cms
    setSelectedRecord(data);
    // setIsDaftarFormVisible(true);
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
              trigger={<div className="cursor-pointer h-100 d-flex align-items-center">{item.nama}</div>}
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
        accessor: 'tanggalDibuat',
      },
      {
        Header: 'Diperbarui',
        accessor: 'tanggalDiperbaharui',
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
        fetchDaftarData({ params });
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

  const handleDropdownFilter = (filter) => (selectedValue) => {
    fetchDaftarData({ bodyParams: { [filter]: selectedValue.value } });
  };

  return (
    <>
      <div className={cx(cms ? 'mb-30' : 'bg-gray-lighter mb-40 p-24 mt-32')}>
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
              data={dataindukOptions}
              placeHolder="Semua"
              isLoading={false}
              noValue={true}
            />
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
              <SingleSelectDropdown
                onChange={handleDropdownFilter('prioritas')}
                data={priorityOptions}
                placeHolder="Ya"
                isLoading={false}
                noValue={true}
              />
            </div>
          )}
        </div>
      </div>
      {cms && <div className="divider mx-n32 mb-24" />}
      <Table {...tableConfig} />
      {loading && <Loader fullscreen />}
    </>
  );
};

export default DaftarTable;
