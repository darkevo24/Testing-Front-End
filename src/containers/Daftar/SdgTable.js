import { useEffect, useMemo } from 'react';
import truncate from 'lodash/truncate';
import cloneDeep from 'lodash/cloneDeep';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'components/Table';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { Check } from 'components/Icons';
import { JADWAL_PERMUTAKHIRAN } from 'utils/constants';
import { getSdgDaftarData, sdgsDataSelector } from './reducer';

const SdgTable = ({
  bem,
  textSearch,
  onPilarSdgChange,
  dataindukOptions = [],
  instansiOptions = [],
  priorityOptions = [],
  produenOptions = [],
  sdgPillerOptions = [],
  tujuanSDGPillerOptions = [],
}) => {
  const dispatch = useDispatch();
  const { pageSize, loading, params, bodyParams, result } = useSelector(sdgsDataSelector);

  const fetchSdgsData = (filterOverride = {}, reset = false) => {
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
    return dispatch(getSdgDaftarData(filters));
  };

  useEffect(() => {
    fetchSdgsData();
  }, []);

  useEffect(() => {
    fetchSdgsData({ bodyParams: { textSearch } });
  }, [textSearch]);

  const handleDropdownFilter = (filter) => (selectedValue) => {
    fetchSdgsData({ bodyParams: { [filter]: selectedValue.value } });
    if (filter === 'pilarSDGS') {
      onPilarSdgChange(selectedValue.value);
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
        fetchSdgsData({ params });
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
            <label className="sdp-form-label py-8">Pilar SDGs</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('pilarSDGS')}
              data={sdgPillerOptions}
              placeHolder="-"
              isLoading={false}
              noValue={true}
            />
          </div>
          <div className="col-3">
            <label className="sdp-form-label py-8">Tujuan SDGs</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('tujuanSDGS')}
              data={tujuanSDGPillerOptions}
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

export default SdgTable;
