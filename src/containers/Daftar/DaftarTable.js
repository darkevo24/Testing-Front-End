import { useMemo, useState, useEffect } from 'react';
import cx from 'classnames';
import truncate from 'lodash/truncate';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader';
import Table from 'components/Table';
import Popover from 'components/Popover';
import { Check } from 'components/Icons';
import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import cloneDeep from 'lodash/cloneDeep';
import { JADWAL_PERMUTAKHIRAN } from 'utils/constants';
import DaftarPopoverContent from './DaftarPopoverContent';
import {
  getDaftarData,
  sekreteriatDaftarDataSelector,
  daftarDataSelector,
  getSekreteriatDaftarData,
  setRKPppData,
  setSDGsData,
} from './reducer';

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
  const [sortBy, setSortBy] = useState(null);
  const selector = cms ? sekreteriatDaftarDataSelector : daftarDataSelector;
  const { pageSize, loading, params, bodyParams, result } = useSelector(selector);
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
      filterParams.page = 0;
      filterParams.size = 10;
    }
    const filterBodyParams = {
      ...cloneDeep(bodyParams),
      ...cloneDeep(bodyParamsOverride),
    };
    const filters = { params: filterParams, bodyParams: filterBodyParams };
    if (cms) {
      return dispatch(getSekreteriatDaftarData(filters));
    } else {
      return dispatch(getDaftarData(filters));
    }
  };

  useEffect(() => {
    fetchDaftarData({ bodyParams: { textSearch } }, true);
  }, [textSearch]);

  const showDaftarDetailPage = (data) => {
    // setSelectedRecord(data);
    history.push(`/cms/daftar/${data.id}`);
  };

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'Instansi',
        id: 'instansi',
        sortId: 0,
        Cell: ({ cell: { row: { original: item } = {} } = {} }) => {
          return (
            <Popover
              placement="bottom-start"
              variant="highlight"
              className={bem.e('popover')}
              triggerOn="hover"
              trigger={<div className="cursor-pointer h-100 d-flex align-items-center">{item.instansi}</div>}
              header="Detail Data Cakupan Wilayah Internet">
              <DaftarPopoverContent daftarId={item.id} />
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
    tableConfig.onRowClick = (daftar) => {
      history.push(`/daftar/${daftar.id}/variable`, { state: { daftar } });
    };
  }

  const handleDropdownFilter =
    (filter) =>
    (selectedValue = {}) => {
      fetchDaftarData({ bodyParams: { [filter]: selectedValue?.value || null } });
      if (filter === 'pnRKP') {
        if (!selectedValue?.value) {
          dispatch(setRKPppData());
          return;
        }
        onPnRKPChange(selectedValue?.value);
      }
      if (filter === 'pilarSDGS') {
        if (!selectedValue?.value) {
          dispatch(setSDGsData());
          return;
        }
        onPilarSdgChange(selectedValue?.value || null);
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
              isClearable
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
              isClearable
              isLoading={false}
              noValue={true}
            />
          </div>
          <div className="col">
            <label className="sdp-form-label py-8">Data Induk</label>
            <SingleSelectDropdown
              onChange={handleDropdownFilter('dataInduk')}
              data={dataindukOptions}
              isClearable
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
                  isClearable
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
                  isClearable
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
                  isClearable
                  isLoading={false}
                  noValue={true}
                />
              </div>
              <div className="col">
                <label className="sdp-form-label py-8">PP RKP</label>
                <SingleSelectDropdown
                  onChange={handleDropdownFilter('ppRKP')}
                  data={rkpPPOptions}
                  isClearable
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
                isClearable
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
