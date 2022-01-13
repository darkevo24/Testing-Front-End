import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import { Breadcrumb } from 'components';
import { prepareFormPayload } from 'utils/helper';
import {
  daftarDetailsDataSelector,
  dataVariableSubmit,
  deleteVariableData,
  getDaftarDetail,
  getKatalogVariables,
  getKodeReferensi,
  katalogVariableDataSelector,
} from 'containers/Daftar/reducer';
import DataVariableForm, { submitDataVariableForm } from './DataVariableForm';
import DataVariableTable from './DataVariableTable';

const DataVariable = ({ cms = false, cmsDetail = false, id }) => {
  const { daftarId } = useParams();
  const recordId = +daftarId || +id;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const daftarDetails = useSelector(daftarDetailsDataSelector);
  const daftar = daftarDetails?.result[recordId];
  const { pageSize, params, bodyParams, result } = useSelector(katalogVariableDataSelector);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDataVariableFormVisible, setIsDataVariableFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [kodeReferensi, setKodeReferensi] = useState(null);

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
    dispatch(getKatalogVariables({ daftarId: recordId, filters }));
  };

  useEffect(() => {
    if (recordId) {
      fetchKatalogVariableData();
      dispatch(getKodeReferensi(recordId));
      if (isEmpty(daftar)) {
        dispatch(getDaftarDetail(recordId));
      }
    }
  }, [recordId]);

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
    const payload = prepareFormPayload(data, {
      dropdowns: ['pengaturanAkses'],
    });
    if (kodeReferensi) {
      payload.kodeReferensi = kodeReferensi;
    }
    payload.idKatalog = parseInt(recordId);

    dispatch(dataVariableSubmit(payload)).then((res) => {
      const hasError = res?.type?.includes('rejected');
      const isEdit = !!data.id;
      hideDataVariableFormModal();
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
      {!cms ? <Breadcrumb breadcrumbsList={breadcrumbsList} /> : null}
      <Row>
        <Col sm={{ span: 10, offset: 1 }} md={!cms && { span: 8, offset: 2 }}>
          <DataVariableTable
            manualPagination={true}
            cms={cms}
            cmsDetail={cmsDetail}
            search={!cms || cmsDetail}
            showDeleteModal={showDeleteModal}
            showDataVariableFormModal={showDataVariableFormModal}
            data={data}
            result={result}
            daftar={daftar}
            fetchKatalogVariableData={fetchKatalogVariableData}
            handleKodeReferensiChange={handleKodeReferensiChange}
            pageSize={pageSize}
            params={params}
          />
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
        Apakah anda yakin untuk menghapus <span className="fw-bold">{selectedRecord?.nama ?? 'Data UMKM?'}</span>
      </Modal>
      <Modal
        size="lg"
        visible={isDataVariableFormVisible}
        onClose={hideDataVariableFormModal}
        icon="splitCircle"
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
