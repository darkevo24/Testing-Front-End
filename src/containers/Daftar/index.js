import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'components/Breadcrumb';
import HighlightWords from 'components/HighlightWords';
import { Search } from 'components/Icons';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import Tabs from 'components/Tabs';
import DaftarForm, { submitDaftarForm } from './DaftarForm';
import DaftarTable from './DaftarTable';
import SdgTable from './SdgTable';
import RkpTable from './RkpTable';
import DaftarDataSayaTable from './DaftarDataSayaTable';
import bn from 'utils/bemNames';
import {
  addDaftarData,
  getProduen,
  getSDGTujuan,
  getRKPpp,
  produenDataSelector,
  addDaftarDataSelector,
  tujuanSDGPillersSelector,
  rkpPPSelector,
} from './reducer';
import {
  dataindukSelector,
  instansiDataSelector,
  rkpPNSelector,
  sdgPillersSelector,
  getDatainduk,
  getInstansiData,
  getSDGPillers,
  getRKPpn,
} from 'containers/App/reducer';

const bem = bn('daftar');

const Daftar = () => {
  const { t } = useTranslation();
  const [isTambahModalVisible, setIsTambahModalVisble] = useState(false);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(t('sandbox.daftar.tabs.daftar.key'));
  const activeTitle = t(`sandbox.daftar.tabs.${activeTab}.title`);
  const { result } = useSelector(addDaftarDataSelector);
  const dataindukData = useSelector(dataindukSelector);
  const instansiData = useSelector(instansiDataSelector);
  const produenData = useSelector(produenDataSelector);
  const sdgPillersData = useSelector(sdgPillersSelector);
  const tujuanSDGPillersData = useSelector(tujuanSDGPillersSelector);
  const rkpPNData = useSelector(rkpPNSelector);
  const rkpPPData = useSelector(rkpPPSelector);

  useEffect(() => {
    dispatch(getInstansiData());
    dispatch(getProduen());
    dispatch(getDatainduk());
    dispatch(getSDGPillers());
    dispatch(getRKPpn());
  }, []);

  const instansiOptions =
    instansiData?.result?.map((instansi) => ({
      value: instansi.id,
      label: instansi.nama,
    })) || [];
  const produenOptions =
    produenData?.result?.map((produen) => ({
      value: produen,
      label: produen,
    })) || [];
  const dataindukOptions =
    dataindukData?.result?.map((datainduk) => ({
      value: datainduk,
      label: datainduk,
    })) || [];
  const sdgPillerOptions =
    sdgPillersData?.result?.map((sdgPiller) => ({
      value: sdgPiller.id,
      label: sdgPiller.keterangan,
    })) || [];
  const tujuanSDGPillerOptions =
    tujuanSDGPillersData?.result?.map((tujuanSDGPiller) => ({
      value: tujuanSDGPiller.id,
      label: tujuanSDGPiller.keterangan,
    })) || [];
  const rkpPNOptions =
    rkpPNData?.result?.map((rkpPN) => ({
      value: rkpPN.id,
      label: rkpPN.keterangan,
    })) || [];
  const rkpPPOptions =
    rkpPPData?.result?.map((rkpPP) => ({
      value: rkpPP.id,
      label: rkpPP.keterangan,
    })) || [];
  const priorityOptions = [
    { value: 1, label: 'Semua' },
    { value: 2, label: 'Ya' },
    { value: 3, label: 'Tidak' },
  ];
  const stats = useMemo(
    () => [
      { title: 'Jumlah Data pada Daftar Data', value: 35798 },
      { title: 'Jumlah Instansi pada Daftar Data', value: 70 },
      { title: 'Jumlah Dataset Terharvest', value: 35798 },
      { title: 'Jumlah Instansi Terharvest', value: 50 },
    ],
    [],
  );
  const tableProps = {
    bem,
    dataindukOptions,
    instansiOptions,
    priorityOptions,
    produenOptions,
    sdgPillerOptions,
    tujuanSDGPillerOptions,
    rkpPNOptions,
    rkpPPOptions,
  };
  const tabs = useMemo(
    () => [
      {
        key: t('sandbox.daftar.tabs.daftar.key'),
        title: t('sandbox.daftar.tabs.daftar.title'),
        component: <DaftarTable {...tableProps} />,
      },
      {
        key: t('sandbox.daftar.tabs.sdg.key'),
        title: t('sandbox.daftar.tabs.sdg.title'),
        component: <SdgTable {...tableProps} />,
      },
      {
        key: t('sandbox.daftar.tabs.rkp.key'),
        title: t('sandbox.daftar.tabs.rkp.title'),
        component: <RkpTable {...tableProps} />,
      },
      {
        key: t('sandbox.daftar.tabs.daftarSafa.key'),
        title: t('sandbox.daftar.tabs.daftarSafa.title'),
        component: <DaftarDataSayaTable {...tableProps} />,
      },
    ],
    [tableProps],
  );

  const showTambahFormModal = () => {
    setIsTambahModalVisble(true);
  };

  const hideTambahModal = () => {
    setIsTambahModalVisble(false);
  };

  const handleTambahFromSubmit = (payload) => {
    // TODO: handle the data posted to server
    payload.instansi = payload.instansi.value;
    payload.jadwalPemutakhiran = payload.jadwalPemutakhiran.value;
    payload.indukData = [payload.indukData.value];
    payload.format = 'png';

    dispatch(addDaftarData(payload)).then((res) => {
      hideTambahModal();
      res?.payload
        ? Notification.show({
            type: 'secondary',
            message: (
              <div>
                Daftar <span className="fw-bold">{res.meta.arg.name}</span> Berhasil Ditambahkan
              </div>
            ),
            icon: 'check',
          })
        : Notification.show({
            message: (
              <div>
                Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
              </div>
            ),
            icon: 'cross',
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
        isActive: true,
        label: activeTitle,
      },
    ],
    [activeTab, t],
  );
  const isSayaData = activeTab === t('sandbox.daftar.tabs.daftarSafa.key');
  return (
    <div className="daftar-page pb-100">
      <Breadcrumb breadcrumbsList={breadcrumbsList} />
      <Row>
        <Col sm={{ span: 10, offset: 1 }}>
          <div className={cx(bem.e('header-wrapper'), 'd-flex justify-content-between align-items-center mt-42 mb-40')}>
            <div className="sdp-heading-big">{activeTitle}</div>
            <div className="d-flex">
              <InputGroup>
                <Form.Control
                  variant="normal"
                  type="text"
                  placeholder={t('sandbox.daftar.searchPlaceholder')}
                  value={''}
                  onChange={() => {}}
                />
                <div className="icon-container">
                  <Search />
                </div>
              </InputGroup>
              <Button className="btn-rounded ml-16 px-32 text-nowrap" onClick={showTambahFormModal}>
                {isSayaData ? t('common.addData') : t('common.download')}
              </Button>
            </div>
          </div>
          <div className="d-flex mb-50">
            {stats.map((stat) => (
              <div key={stat.title} className={cx(bem.e('stat-card'), 'card mr-24')}>
                <HighlightWords text={stat.title} />
                <div className="sdp-sub-heading fs-24 lh-29 mt-8">{stat.value}</div>
              </div>
            ))}
          </div>

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.key} eventKey={tab.key} title={tab.title}>
                {tab.component}
              </Tabs.Tab>
            ))}
          </Tabs>
        </Col>
      </Row>
      <Modal
        size="lg"
        visible={isTambahModalVisible}
        onClose={hideTambahModal}
        icon="splitCircle"
        title="Tambah Data"
        subtitle="Isi form dibawah untuk menambah data"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideTambahModal },
          { text: 'Tambah', onClick: submitDaftarForm },
        ]}>
        <DaftarForm instansiOptions={instansiOptions} onSubmit={handleTambahFromSubmit} />
      </Modal>
    </div>
  );
};

export default Daftar;
