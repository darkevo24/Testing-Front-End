import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import { getKodeReferensi, kodeReferensiSelector } from 'containers/Daftar/reducer';
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
  manualPagination = true,
  fetchKatalogVariableData,
  handleTableReferensiChange,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const kodeReferensi = useSelector(kodeReferensiSelector);
  const userInstansiId = user?.instansi || user?.instansiId;
  const hasAccess = daftar?.instansiId === userInstansiId;

  const handleReferensiChange = async (item) => {
    if (cmsCreateForm) {
      handleTableReferensiChange(item);
      return;
    }
    try {
      await put(`${apiUrls.variable}/referensi`, { idVariable: item.id, idKatalog: daftar.id });
      fetchKatalogVariableData();
      dispatch(getKodeReferensi(daftar.id));
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
        Cell: ({ cell: { value = '-' } = {} }) => value,
      },
      {
        Header: 'Konsep',
        accessor: 'konsep',
        Cell: ({ cell: { value = '-' } = {} }) => value,
      },
      {
        Header: 'Definisi',
        accessor: 'definisi',
        Cell: ({ cell: { value = '-' } = {} }) => {
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
        isDisabled: !hasAccess,
        label: '',
        Cell: Table.CheckBox,
      },
    ];

    if (hasAccess && !cmsDetail) {
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
  }, [data, daftar, user]);

  const tableConfig = {
    variant: 'spaced',
    columns,
    data,
    totalCount: result?.totalRecords || null,
    title: (
      <>
        <span className="sdp-text-disable mr-8">{cms ? t('sandbox.variable.cmsTitle') : t('sandbox.variable.title')}</span>
        <span>{!cms ? daftar?.nama : ''}</span>
      </>
    ),
    showSearch: search,
    pageSize,
    manualPagination: manualPagination,
    currentPage: params?.page || null,
    highlightOnHover: true,
    searchLeftComponent: (
      <span className="mr-auto">
        Kode Referensi
        <span className={cx('ml-16', { 'sdp-text-blue': !!kodeReferensi?.result?.nama })}>
          {kodeReferensi?.result?.nama || '-'}
        </span>
      </span>
    ),
    searchRightComponent: !!cms || !hasAccess,
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
