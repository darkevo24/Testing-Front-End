import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import isFunction from 'lodash/isFunction';

import Popover from 'components/Popover';
import Table from 'components/Table';
import truncate from 'lodash/truncate';
import { put } from 'utils/request';
import { apiUrls } from 'utils/constants';

const DataVariableTable = ({
  cms = false,
  cmsDetail = false,
  search = true,
  cmsCreateForm = false,
  data = [],
  result = {},
  showDataVariableFormModal,
  showDeleteModal,
  daftar = {},
  params = {},
  pageSize = null,
  manualPagination = false,
  fetchKatalogVariableData,
}) => {
  const { t } = useTranslation();

  const handleReferensiChange = async (item) => {
    try {
      await put(`${apiUrls.variable}/referensi`, { idVariable: item.id, idKatalog: daftar.id });
      fetchKatalogVariableData();
    } catch (e) {
      //
    }
  };

  const columns = useMemo(() => {
    let cols = [
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
        action: handleReferensiChange,
        isChecked: (row) => row.kodeReferensi === 1,
        label: '',
        Cell: Table.CheckBox,
      },
    ];

    if (cmsCreateForm) {
      const index = cols.findIndex((item) => item.Header === 'Kode Referensi');
      cols.splice(index, 1);
    }

    if (!cmsDetail) {
      cols.push({
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
      });
    }
    return cols;
  }, [data, daftar]);

  const tableConfig = {
    variant: 'spaced',
    columns,
    data,
    totalCount: result?.totalRecords || null,
    title: (
      <>
        <span className="sdp-text-disable">{cms ? t('sandbox.variable.cmsTitle') : t('sandbox.variable.title')}</span>
        <span>{!cms ? daftar?.nama : ''}</span>
      </>
    ),
    showSearch: search,
    pageSize,
    manualPagination: manualPagination,
    currentPage: params?.page || null,
    highlightOnHover: true,
    searchRightComponent: !!cms,
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
    <div className="sdp-daftar-table">
      <Table {...tableConfig} />
    </div>
  );
};

export default DataVariableTable;
