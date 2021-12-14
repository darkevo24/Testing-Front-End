import { useEffect, useMemo } from 'react';
import truncate from 'lodash/truncate';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'components/Table';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { Check } from 'components/Icons';
import { JADWAL_PERMUTAKHIRAN } from 'utils/constants';
import { getRkpDaftarData, rkpDataSelector } from './reducer';

const RkpTable = ({
  bem,
  textSearch,
  onPnRKPChange,
  dataindukOptions = [],
  instansiOptions = [],
  priorityOptions = [],
  produenOptions = [],
  rkpPNOptions = [],
  rkpPPOptions = [],
}) => {
  const dispatch = useDispatch();
  const { pageSize, loading, params, bodyParams, result } = useSelector(rkpDataSelector);

  const fetchRkpData = (filterOverride = {}, reset = false) => {
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
    return dispatch(getRkpDaftarData(filters));
  };

  useEffect(() => {
    fetchRkpData();
  }, []);

  useEffect(() => {
    fetchRkpData({ bodyParams: { textSearch } });
  }, [textSearch]);

  const handleDropdownFilter = (filter) => (selectedValue) => {
    fetchRkpData({ bodyParams: { [filter]: selectedValue.value } });

    if (filter === 'pnRKP') {
      onPnRKPChange(selectedValue.value);
    }
  };

  const data = useMemo(() => result?.content?.records || [], [result]);
  const columns = useMemo(
    () => [
      {
        Header: 'Instansi',
        accessor: 'instansi',
      },
      {
        Header: 'Nama Data',
        accessor: 'nama',
        Cell: (data) => truncate(data.cell.value, { length: 20 }),
      },
      {
        Header: 'Jadwal Pemutakhiran',
        accessor: 'jadwalPemutakhiran',
        Cell: (data) => JADWAL_PERMUTAKHIRAN[data.cell.value],
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
    ],
    [],
  );
  const tableConfig = {
    columns,
    data,
    totalCount: result?.content?.totalRecords || null,
    pageSize,
    manualPagination: true,
    currentPage: params.page,
    showSearch: false,
    highlightOnHover: true,
    variant: 'spaced',
    onPageIndexChange: (page) => {
      if (params.page !== page) {
        const params = { page };
        fetchRkpData({ params });
      }
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
              data={dataindukOptions}
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
        <div className="row pt-24">
          <div className="col-3">
            <label className="sdp-form-label py-8">PN RKP</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('pnRKP')}
              data={rkpPNOptions}
              placeHolder="-"
              isLoading={false}
              noValue={true}
            />
          </div>
          <div className="col-3">
            <label className="sdp-form-label py-8">PP RKP</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('ppRKP')}
              data={rkpPPOptions}
              placeHolder="-"
              isLoading={false}
              noValue={true}
            />
          </div>
        </div>
      </div>
      <Table {...tableConfig} />
    </>
  );
};

export default RkpTable;
