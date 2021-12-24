import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import find from 'lodash/find';
import isFunction from 'lodash/isFunction';

import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import Popover from 'components/Popover';
import Table from 'components/Table';
import truncate from 'lodash/truncate';

const DataVariableTable = ({
  cms = false,
  search = true,
  data = [],
  result = {},
  kodeReferensiOptions = [],
  showDataVariableFormModal,
  showDeleteModal,
  handleKodeReferensiChange,
  daftar = {},
  params = {},
  pageSize = null,
  manualPagination = false,
  fetchKatalogVariableData,
}) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: 'Nama Variabel',
        accessor: 'nama',
      },
      {
        Header: 'ID Konsep',
        accessor: 'idKonsep',
      },
      {
        Header: 'Konsep',
        accessor: 'konsep',
      },
      {
        Header: 'Definisi',
        accessor: 'definisi',
        Cell: ({ cell: { value } = {} }) => {
          return cms ? (
            value
          ) : (
            <Popover
              placement="bottom-start"
              triggerOn="hover"
              trigger={<span className="cursor-pointer">{truncate(value, { length: 50 })}</span>}>
              {value}
            </Popover>
          );
        },
      },
      {
        Header: 'Pengaturan Akses',
        accessor: 'pengaturanAkses',
      },
      {
        Header: 'Kode Referensi',
        accessor: 'kodeReferensi',
        Cell: ({ cell: { value } }) => find(kodeReferensiOptions, { value })?.label || '-',
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'edit',
            callback: showDataVariableFormModal,
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

  const tableConfig = {
    variant: 'spaced',
    columns,
    data,
    totalCount: result?.totalRecords || null,
    searchLeftComponent: cms ? null : (
      <div className="w-100 d-flex align-items-center">
        <span className="sdp-text-disable mr-16">{t('sandbox.variable.reference')}</span>
        <SingleSelectDropdown
          className="wpx-300"
          data={kodeReferensiOptions}
          onChange={handleKodeReferensiChange}
          placeHolder="ID UMKM"
          isLoading={false}
          noValue={true}
        />
      </div>
    ),
    title: (
      <>
        <span className="sdp-text-disable">{t('sandbox.variable.title')}</span>
        <span> {daftar?.nama || ''}</span>
      </>
    ),
    showSearch: search,
    pageSize,
    manualPagination: manualPagination,
    currentPage: params?.page || null,
    highlightOnHover: true,
    searchPlaceholder: t('sandbox.variable.searchPlaceholder'),
    searchButtonText: t('sandbox.variable.addVariable'),
    onSearch: (filterText) => {
      isFunction(fetchKatalogVariableData) && fetchKatalogVariableData({ bodyParams: { filterText } });
    },
    onSearchButtonPress: () => showDataVariableFormModal(),
    onPageIndexChange: (page) => {
      if (params.page !== page) {
        const params = { page };
        isFunction(fetchKatalogVariableData) && fetchKatalogVariableData({ params });
      }
    },
  };

  return (
    <>
      <Table {...tableConfig} />
    </>
  );
};

export default DataVariableTable;
