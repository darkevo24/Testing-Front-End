import { useMemo } from 'react';
import truncate from 'lodash/truncate';
import Table from 'components/Table';
import { makeData } from 'utils/dataConfig/daftar';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import { Check } from 'components/Icons';

const RkpTable = ({ bem, dataindukOptions = [], instansiOptions = [], priorityOptions = [], produenOptions = [] }) => {
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
            <SingleSelectDropdown data={instansiOptions} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Produsen Data</label>
            <SingleSelectDropdown data={produenOptions} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Data Induk</label>
            <SingleSelectDropdown data={dataindukOptions} placeHolder="Semua" isLoading={false} noValue={true} />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Prioritas</label>
            <SingleSelectDropdown data={priorityOptions} placeHolder="Ya" isLoading={false} noValue={true} />
          </div>
        </div>
        <div className="row pt-24">
          <div className="col-3">
            <label className="sdp-form-label py-8">PN RKP</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="-" isLoading={false} noValue={true} />
          </div>
          <div className="col-3">
            <label className="sdp-form-label py-8">PP RKP</label>
            <SingleSelectDropdown data={dropdownFilters} placeHolder="-" isLoading={false} noValue={true} />
          </div>
        </div>
      </div>
      <Table {...tableConfig} />
    </>
  );
};

export default RkpTable;
