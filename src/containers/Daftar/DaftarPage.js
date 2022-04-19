import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import get from 'lodash/get';
import Breadcrumb from 'components/Breadcrumb';
import RequiredFilledLabel from 'components/RequiredFilledLabel';
import HighlightWords from 'components/HighlightWords';
import { Search } from 'components/Icons';
import Modal from 'components/Modal';
import Tabs from 'components/Tabs';
import { userInstansiSelector } from 'containers/App/reducer';
import DaftarForm, { submitDaftarForm } from './DaftarForm';
import DaftarTable from './DaftarTable';
import SdgTable from './SdgTable';
import RkpTable from './RkpTable';
import DaftarDataSayaTable from './DaftarDataSayaTable';
import { useThrottle } from 'utils/hooks';
import {
  daftarDataSubmitSelector,
  daftarDataSummarySelector,
  getDaftarDataSummary,
  refetchDaftarData,
  dataHarvestSummarySelector,
  getDataHarvestSummary,
  dataInstansiHarvestSummarySelector,
  getInstansiHarvestSummary,
} from './reducer';

const Daftar = (props) => {
  const {
    bem,
    dataindukAllOptions,
    dataIndukOptions,
    instansiOptions,
    priorityOptions,
    produenOptions,
    sdgPillerOptions,
    tujuanSDGPillerOptions,
    rkpPNOptions,
    rkpPPOptions,
    onPilarSdgChange,
    onPnRKPChange,
    onDownloadData,
    handleDaftarFromSubmit,
  } = props;
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [isDaftarFormVisible, setIsDaftarFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(t('sandbox.daftar.tabs.daftar.key'));
  const fullDaftarData = useSelector((state) => state.daftar);
  const daftarSummaryData = useSelector(daftarDataSummarySelector);
  const summaryDataHarvest = useSelector(dataHarvestSummarySelector);
  const summaryInstansiHarvest = useSelector(dataInstansiHarvestSummarySelector);
  const userInstansi = useSelector(userInstansiSelector);
  const daftarDataSubmit = useSelector(daftarDataSubmitSelector);

  const sayaKey = t('sandbox.daftar.tabs.daftarSafa.key');
  const activeTitle = t(`sandbox.daftar.tabs.${activeTab}.${activeTab === sayaKey ? 'tableTitle' : 'title'}`, {
    instansi: userInstansi?.nama,
  });
  const invokeDebounced = useThrottle(() => setDebouncedSearchText(searchText));
  useEffect(invokeDebounced, [searchText]);

  useEffect(() => {
    dispatch(getDaftarDataSummary());
  }, []);

  useEffect(() => {
    dispatch(getDataHarvestSummary());
  }, []);

  useEffect(() => {
    dispatch(getInstansiHarvestSummary());
  }, []);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const showDaftarFormModal = (data) => {
    setSelectedRecord(data);
    setIsDaftarFormVisible(true);
  };

  const hideDaftarFormModal = () => {
    setSelectedRecord(null);
    setIsDaftarFormVisible(false);
  };

  const stats = useMemo(
    () => [
      { title: 'Jumlah Data pada Daftar Data', value: get(daftarSummaryData, 'result.data', '-') },
      { title: 'Jumlah Instansi pada Daftar Data', value: get(daftarSummaryData, 'result.instansi', '-') },
      { title: 'Jumlah Dataset Terharvest', value: get(summaryDataHarvest, 'result', '-') },
      { title: 'Jumlah Instansi Terharvest', value: get(summaryInstansiHarvest, 'result', '-') },
    ],
    [daftarSummaryData],
  );

  const tableProps = {
    textSearch: debouncedSearchText,
    bem,
    dataIndukOptions,
    instansiOptions,
    priorityOptions,
    produenOptions,
    sdgPillerOptions,
    tujuanSDGPillerOptions,
    rkpPNOptions,
    rkpPPOptions,
    onPilarSdgChange,
    onPnRKPChange,
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
        title: activeTitle,
        component: (
          <DaftarDataSayaTable
            {...tableProps}
            showDaftarFormModal={showDaftarFormModal}
            hideDaftarFormModal={hideDaftarFormModal}
          />
        ),
      },
    ],
    [tableProps, userInstansi],
  );

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

  const onDaftarFormSubmit = (data) => {
    handleDaftarFromSubmit(data, (_hasError) => {
      hideDaftarFormModal();
      dispatch(refetchDaftarData());
    });
  };

  const handleDownloadData = () => {
    let params = {};
    switch (activeTab) {
      case t('sandbox.daftar.tabs.daftar.key'):
        params = fullDaftarData.daftarData.bodyParams;
        break;
      case t('sandbox.daftar.tabs.sdg.key'):
        params = fullDaftarData.sdgs.bodyParams;
        break;
      case t('sandbox.daftar.tabs.rkp.key'):
        params = fullDaftarData.rkp.bodyParams;
        break;
      case t('sandbox.daftar.tabs.daftarSafa.key'):
        params = fullDaftarData.sayaDaftarData.bodyParams;
        break;
      default:
        break;
    }
    onDownloadData(params);
  };

  const daftarFormSubtilte = () => (
    <>
      <span>Isi form dibawah untuk menambah data</span> <br />
      <RequiredFilledLabel label="Wajib Diisi" />
    </>
  );
  return (
    <div className={cx('daftar-page pb-100', bem.b())}>
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
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
                <div className="icon-container">
                  <Search />
                </div>
              </InputGroup>
              <Button
                className="btn-rounded ml-16 px-32 text-nowrap"
                onClick={isSayaData ? () => showDaftarFormModal() : handleDownloadData}>
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
        visible={isDaftarFormVisible}
        onClose={hideDaftarFormModal}
        icon="splitCircle"
        title={selectedRecord ? 'Edit Data' : 'Tambah Data'}
        subtitle={daftarFormSubtilte()}
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: hideDaftarFormModal },
          { text: selectedRecord ? 'Simpan' : 'Tambah', onClick: submitDaftarForm, loading: daftarDataSubmit.loading },
        ]}>
        <DaftarForm
          daftarId={selectedRecord?.id}
          instansiOptions={instansiOptions}
          rkpPNOptions={rkpPNOptions}
          sdgPillerOptions={sdgPillerOptions}
          dataindukAllOptions={dataindukAllOptions}
          userInstansi={userInstansi}
          onSubmit={onDaftarFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default Daftar;
