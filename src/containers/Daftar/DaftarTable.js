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
import { JADWAL_PERMUTAKHIRAN } from 'utils/constants';
import { getDaftarData, daftarDataSelector } from './reducer';

const DaftarTable = ({
  bem,
  textSearch,
  dataindukOptions = [],
  instansiOptions = [],
  priorityOptions = [],
  produenOptions = [],
  sdgPillerOptions = [],
  tujuanSDGPillerOptions = [],
  rkpPNOptions = [],
  rkpPPOptions = [],
  cms = false,
  onPnRKPChange,
  onPilarSdgChange,
}) => {
  const history = useHistory();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sortBy, setSortBy] = useState(null);
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

  useEffect(() => {
    fetchDaftarData();
  }, []);

  useEffect(() => {
    fetchDaftarData({ bodyParams: { textSearch } });
  }, [textSearch]);

  const showDaftarDetailPage = (data) => {
    setSelectedRecord(data);
    history.push(`/cms/daftar/${data.id}`);
  };

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'Instansi',
        id: 'instansi',
        sortId: 0,
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
              trigger={<div className="cursor-pointer h-100 d-flex align-items-center">{item.instansi}</div>}
              header="Detail Data Cakupan Wilayah Internet">
              <ColumnData items={items} />
            </Popover>
          );
        },
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

  const data = useMemo(() => result?.content?.records || [], [result]);

  const onSortChange = ({ id, sortId, isSortedDesc }) => {
    const desc = isSortedDesc === undefined ? false : !isSortedDesc;
    setSortBy({ id, sortId, desc });
    fetchDaftarData({ params: { sortBy: sortId, sortDirection: desc ? 'DESC' : 'ASC' } });
  };

  const tableConfig = {
    columns,
    data,
    totalCount: result?.content?.totalRecords || null,
    cms,
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
        fetchDaftarData({ params });
      }
    },
  };
  if (!cms) {
    tableConfig.onRowClick = (data) => {
      history.push('/data-variable');
    };
  }

  const handleDropdownFilter = (filter) => (selectedValue) => {
    fetchDaftarData({ bodyParams: { [filter]: selectedValue.value } });
    if (filter === 'pnRKP') {
      onPnRKPChange(selectedValue.value);
    }
    if (filter === 'pilarSDGS') {
      onPilarSdgChange(selectedValue.value);
    }
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
                <SingleSelectDropdown
                  onChange={handleDropdownFilter('pilarSDGS')}
                  data={sdgPillerOptions}
                  placeHolder="-"
                  isLoading={false}
                  noValue={true}
                />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">Tujuan SDGs</label>
                <SingleSelectDropdown
                  onChange={handleDropdownFilter('tujuanSDGS')}
                  data={tujuanSDGPillerOptions}
                  placeHolder="-"
                  isLoading={false}
                  noValue={true}
                />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">PN RKP</label>
                <SingleSelectDropdown
                  onChange={handleDropdownFilter('pnRKP')}
                  data={rkpPNOptions}
                  placeHolder="-"
                  isLoading={false}
                  noValue={true}
                />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">PP RKP</label>
                <SingleSelectDropdown
                  onChange={handleDropdownFilter('ppRKP')}
                  data={rkpPPOptions}
                  placeHolder="-"
                  isLoading={false}
                  noValue={true}
                />
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
