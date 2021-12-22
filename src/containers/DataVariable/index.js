import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

import SingleSelectDropdown from 'components/DropDown/SingleDropDown';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Popover from 'components/Popover';
import Table from 'components/Table';
import { Breadcrumb } from 'components';
import truncate from 'lodash/truncate';
import { prepareFormPayload } from 'utils/helper';
import {
  daftarDetailsDataSelector,
  dataVariableSubmit,
  deleteVariableData,
  getDaftarDetail,
  getKatalogVariables,
  getKodeReferensi,
  kodeReferensiOptionsSelector,
  katalogVariableDataSelector,
} from 'containers/Daftar/reducer';
import DataVariableForm, { submitDataVariableForm } from './DataVariableForm';

const DataVariable = () => {
  const { daftarId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const daftarDetails = useSelector(daftarDetailsDataSelector);
  const daftar = daftarDetails?.result[daftarId];
  const { pageSize, params, bodyParams, result } = useSelector(katalogVariableDataSelector);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDataVariableFormVisible, setIsDataVariableFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [kodeReferensi, setKodeReferensi] = useState(null);
  const kodeReferensiOptions = useSelector(kodeReferensiOptionsSelector);

  const data = useMemo(() => result?.records || [], [result]);

  const fetchKatalogVariableData = (filterOverride = {}, reset = false) => {
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
    dispatch(getKatalogVariables({ daftarId, filters }));
  };

  useEffect(() => {
    if (daftarId) {
      fetchKatalogVariableData();
      dispatch(getKodeReferensi(daftarId));
      if (!daftar) {
        dispatch(getDaftarDetail(daftarId));
      }
    }
  }, [daftarId]);

  const handleKodeReferensiChange = (kodeReferensiOption) => {
    const kodeReferensi = kodeReferensiOption?.value;
    setKodeReferensi(kodeReferensi);
    fetchKatalogVariableData({ bodyParams: { kodeReferensi } });
  };

  const showDeleteModal = (data) => {
    setSelectedRecord(data);
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setSelectedRecord(null);
    setIsDeleteModalVisible(false);
  };

  const handleDelete = () => {
    dispatch(deleteVariableData(selectedRecord)).then((res) => {
      const hasError = res?.type?.includes('rejected');
      if (hasError) {
        Notification.show({
          type: 'secondary',
          message: (
            <div>
              Kesalahan dalam menghapus Variabel <span className="fw-bold">{selectedRecord.name}</span>
            </div>
          ),
          icon: 'cross',
        });
      } else {
        fetchKatalogVariableData();
        Notification.show({
          message: (
            <div>
              Variabel <span className="fw-bold">{selectedRecord.name}</span> Berhasil Dihapus
            </div>
          ),
          icon: 'check',
        });
      }
      setIsDeleteModalVisible(false);
    });
  };

  const showDataVariableFormModal = (data) => {
    setSelectedRecord(data);
    setIsDataVariableFormVisible(true);
  };

  const hideDataVariableFormModal = () => {
    setSelectedRecord(null);
    setIsDataVariableFormVisible(false);
  };

  const handleDataVariableFormSubmit = (data) => {
    hideDataVariableFormModal();
    Notification.show({
      type: 'secondary',
      message: (
        <div>
          Variabel <span className="fw-bold">{data.name}</span> Berhasil Ditambahkan
        </div>
      ),
      icon: 'check',
    });
    const payload = prepareFormPayload(data, {
      dropdowns: ['pengaturanAkses'],
    });
    if (kodeReferensi) {
      payload.kodeReferensi = kodeReferensi;
    }
    payload.idKatalog = parseInt(daftarId);

    dispatch(dataVariableSubmit(payload)).then((res) => {
      const hasError = res?.type?.includes('rejected');
      const isEdit = !!data.id;
      if (hasError) {
        return Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error.message}</span> Data Tidak {isEdit ? 'Diperbarui' : 'Ditambahkan'}
            </div>
          ),
          icon: 'cross',
        });
      }
      fetchKatalogVariableData();
      Notification.show({
        type: 'secondary',
        message: (
          <div>
            Variabel <span className="fw-bold">{payload.nama}</span> Berhasil {isEdit ? 'Diperbarui' : 'Ditambahkan'}
          </div>
        ),
        icon: 'check',
      });
    });
  };

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
          return (
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
    searchLeftComponent: (
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
        <span> {daftar?.nama}</span>
      </>
    ),
    search: true,
    pageSize,
    manualPagination: true,
    currentPage: params.page,
    highlightOnHover: true,
    searchPlaceholder: t('sandbox.variable.searchPlaceholder'),
    searchButtonText: t('sandbox.variable.addVariable'),
    onSearch: (filterText) => {
      fetchKatalogVariableData({ bodyParams: { filterText } });
    },
    onSearchButtonPress: () => showDataVariableFormModal(),
    onPageIndexChange: (page) => {
      if (params.page !== page) {
        const params = { page };
        fetchKatalogVariableData({ params });
      }
    },
  };

  const breadcrumbsList = useMemo(
    () => [
      {
        path: '/home',
        label: t('sandbox.title'),
      },
      {
        path: '/daftar',
        label: t('sandbox.daftar.title'),
      },
      {
        path: `/daftar/${daftar?.id}/variable`,
        label: daftar?.nama,
      },
      {
        isActive: true,
        label: t('sandbox.variable.title'),
      },
    ],
    [t, daftar],
  );

  return (
    <div className="daftar-page pb-100">
      <Breadcrumb breadcrumbsList={breadcrumbsList} />
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <Table {...tableConfig} />
        </Col>
      </Row>
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
      <Modal
        size="lg"
        visible={isDataVariableFormVisible}
        onClose={hideDataVariableFormModal}
        icon="splitTriangle"
        title={selectedRecord ? 'Edit Variable' : 'Tambah Variable'}
        subtitle={selectedRecord ? 'Isi form dibawah untuk menambah Variabel' : 'ID UMKM'}
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDataVariableFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitDataVariableForm },
        ]}>
        <DataVariableForm data={selectedRecord} onSubmit={handleDataVariableFormSubmit} />
      </Modal>
    </div>
  );
};

export default DataVariable;
